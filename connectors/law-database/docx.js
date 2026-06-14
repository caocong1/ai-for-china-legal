'use strict';
// docx.js — extract plain text from a .docx buffer using Node built-ins only.
// A .docx is a ZIP; we locate word/document.xml via the central directory,
// inflate it (zlib.inflateRawSync) and strip the WordprocessingML tags.
// ZIP64 archives are not supported (flk law documents are far below 4GB).

const zlib = require('zlib');

const EOCD_SIG = 0x06054b50;
const CDFH_SIG = 0x02014b50;

function findEocd(buf) {
  const min = Math.max(0, buf.length - 22 - 65535);
  for (let i = buf.length - 22; i >= min; i--) {
    if (buf.readUInt32LE(i) === EOCD_SIG) return i;
  }
  return -1;
}

function decodeEntities(s) {
  return s
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&');
}

function xmlToText(xml) {
  return decodeEntities(
    xml
      // paragraph ends + explicit breaks become newlines
      .replace(/<\/w:p>/g, '\n')
      .replace(/<w:br[^>]*\/>/g, '\n')
      .replace(/<w:tab[^>]*\/>/g, '　')
      // drop everything else
      .replace(/<[^>]+>/g, '')
  )
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * @param {Buffer} buf raw .docx bytes
 * @returns {string} plain text of word/document.xml
 */
function extractDocxText(buf) {
  const eocd = findEocd(buf);
  if (eocd < 0) throw new Error('不是有效的 ZIP/docx 文件（未找到 EOCD）');
  const count = buf.readUInt16LE(eocd + 10);
  let off = buf.readUInt32LE(eocd + 16);

  for (let n = 0; n < count; n++) {
    if (off + 46 > buf.length || buf.readUInt32LE(off) !== CDFH_SIG) {
      throw new Error('ZIP 中央目录损坏');
    }
    const method = buf.readUInt16LE(off + 10);
    const compressedSize = buf.readUInt32LE(off + 20);
    const nameLen = buf.readUInt16LE(off + 28);
    const extraLen = buf.readUInt16LE(off + 30);
    const commentLen = buf.readUInt16LE(off + 32);
    const localHeaderOffset = buf.readUInt32LE(off + 42);
    const name = buf.toString('utf8', off + 46, off + 46 + nameLen);

    if (name === 'word/document.xml') {
      const localNameLen = buf.readUInt16LE(localHeaderOffset + 26);
      const localExtraLen = buf.readUInt16LE(localHeaderOffset + 28);
      const dataStart = localHeaderOffset + 30 + localNameLen + localExtraLen;
      const data = buf.subarray(dataStart, dataStart + compressedSize);
      const xml =
        method === 8
          ? zlib.inflateRawSync(data).toString('utf8')
          : method === 0
            ? data.toString('utf8')
            : (() => {
                throw new Error(`不支持的 ZIP 压缩方式: ${method}`);
              })();
      return xmlToText(xml);
    }
    off += 46 + nameLen + extraLen + commentLen;
  }
  throw new Error('docx 中未找到 word/document.xml');
}

module.exports = { extractDocxText };
