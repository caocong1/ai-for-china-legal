// rpc.js — line-delimited JSON-RPC 2.0 server over stdio for MCP connectors.
// CommonJS (NEVER ESM — the host repo's root package.json declares "type":
// "module" for the Vite frontend, but this connectors subtree opts out via
// connectors/package.json "type": "commonjs").
//
// Protocol contract (matches src-tauri/src/mcp/client.rs, which is strict):
//   - one JSON object per line on stdin, exactly one JSON object per line on stdout
//   - NO banners / pretty-print on stdout; ALL logging goes to stderr
//   - initialize -> {protocolVersion:"2024-11-05", capabilities:{tools:{}}, serverInfo}
//   - notifications/initialized -> no response
//   - tools/list -> {tools:[{name, description, inputSchema}]}
//   - tools/call -> {content:[{type:"text",text}], isError:false}
//     (isError true only for internal crashes; "no results" is a normal text result)
//   - unknown method WITH id -> error {code:-32601, message:"method not found"}
//   - parse errors on a line: log to stderr, ignore the line

'use strict';

const readline = require('node:readline');

const PROTOCOL_VERSION = '2024-11-05';

function writeMessage(obj) {
  // Single line, compact JSON. Never pretty-print.
  process.stdout.write(JSON.stringify(obj) + '\n');
}

/**
 * Start serving JSON-RPC over stdio.
 * @param {object} opts
 * @param {{name:string,version:string}} opts.serverInfo
 * @param {Array<{name:string,description:string,inputSchema:object}>} opts.tools
 * @param {(name:string, args:object) => Promise<string>} opts.callTool
 *        Resolves to the text result. A thrown error => isError:true result.
 */
function serve({ serverInfo, tools, callTool }) {
  const rl = readline.createInterface({ input: process.stdin, terminal: false });

  rl.on('line', (line) => {
    handleLine(line).catch((err) => {
      console.error('[rpc] unhandled handler error:', (err && err.stack) || err);
    });
  });

  rl.on('close', () => {
    // Client closed stdin: shut down cleanly.
    process.exit(0);
  });

  async function handleLine(line) {
    const trimmed = line.trim();
    if (!trimmed) return;

    let msg;
    try {
      msg = JSON.parse(trimmed);
    } catch (e) {
      console.error('[rpc] parse error, ignoring line:', trimmed.slice(0, 200));
      return;
    }

    const id = msg && msg.id;
    const method = msg && msg.method;
    const params = (msg && msg.params) || {};
    const hasId = id !== undefined && id !== null;

    try {
      if (method === 'initialize') {
        writeMessage({
          jsonrpc: '2.0',
          id,
          result: {
            protocolVersion: PROTOCOL_VERSION,
            capabilities: { tools: {} },
            serverInfo,
          },
        });
      } else if (method === 'notifications/initialized') {
        // Notification: never respond.
      } else if (method === 'tools/list') {
        writeMessage({ jsonrpc: '2.0', id, result: { tools } });
      } else if (method === 'tools/call') {
        const name = params.name;
        const args = params.arguments || {};
        let result;
        try {
          const text = await callTool(name, args);
          result = { content: [{ type: 'text', text: String(text) }], isError: false };
        } catch (err) {
          // Internal crash path only — degraded/empty results should be
          // returned by callTool as normal text, not thrown.
          console.error(`[rpc] tools/call ${name} crashed:`, (err && err.stack) || err);
          result = {
            content: [{ type: 'text', text: `内部错误: ${(err && err.message) || String(err)}` }],
            isError: true,
          };
        }
        writeMessage({ jsonrpc: '2.0', id, result });
      } else if (hasId) {
        writeMessage({
          jsonrpc: '2.0',
          id,
          error: { code: -32601, message: 'method not found' },
        });
      } else {
        console.error('[rpc] ignoring unknown notification:', method);
      }
    } catch (err) {
      console.error('[rpc] dispatch error:', (err && err.stack) || err);
      if (hasId) {
        writeMessage({ jsonrpc: '2.0', id, error: { code: -32603, message: 'internal error' } });
      }
    }
  }
}

module.exports = { serve, PROTOCOL_VERSION };
