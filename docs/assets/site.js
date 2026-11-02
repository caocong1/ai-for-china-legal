/* AI for China Legal · Skill 说明站 — 全站脚本。只做三件事：复制引用、索引过滤、目录高亮。没有它页面依然完整。 */
(function () {
  'use strict';
  document.documentElement.classList.remove('no-js');

  /* 1. 复制：按钮带 data-copy-text，或 data-copy-from（选择器，取其文本）。
     先用剪贴板接口；被拒（微信等内置浏览器常见）再用 execCommand；都不行就在按钮下展开已全选的文本框，供长按复制。 */
  var live = document.getElementById('live');
  function announce(msg) { if (live) { live.textContent = ''; setTimeout(function () { live.textContent = msg; }, 30); } }
  function execCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.top = '-1000px';
    document.body.appendChild(ta); ta.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    return ok;
  }
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).catch(function () {
        if (!execCopy(text)) throw new Error('copy failed');
      });
    }
    return execCopy(text) ? Promise.resolve() : Promise.reject(new Error('copy failed'));
  }
  function showFallback(btn, text) {
    var box = btn.nextElementSibling;
    if (!box || !box.classList || !box.classList.contains('copy-fallback')) {
      box = document.createElement('textarea');
      box.className = 'copy-fallback'; box.readOnly = true; box.rows = 4;
      box.setAttribute('aria-label', '引用全文，长按或选中后复制');
      btn.parentNode.insertBefore(box, btn.nextSibling);
    }
    box.value = text; box.focus(); box.select();
  }
  function textFor(btn) {
    if (btn.dataset.copyText) return btn.dataset.copyText;
    if (btn.dataset.copyFrom) {
      var el = document.querySelector(btn.dataset.copyFrom);
      return el ? (el.innerText || el.textContent).trim() : '';
    }
    return '';
  }
  document.addEventListener('click', function (ev) {
    var btn = ev.target.closest('.btn-copy');
    if (!btn) return;
    var text = textFor(btn);
    if (!text) return;
    var label = btn.dataset.label || btn.textContent;
    btn.dataset.label = label;
    copyText(text).then(function () {
      btn.dataset.done = '1'; btn.textContent = '已复制';
      var tags = text.match(/·\s*([^·】]+)】/g);
      announce('已复制：' + (tags ? tags[tags.length - 1].replace(/^·\s*|】$/g, '') : label));
      setTimeout(function () { btn.dataset.done = ''; btn.textContent = label; }, 1600);
    }, function () {
      btn.textContent = '请在下方文本框里复制';
      announce('自动复制失败，引用全文已放在按钮下方的文本框里');
      showFallback(btn, text);
      setTimeout(function () { btn.textContent = label; }, 2600);
    });
  });

  /* 2. 索引过滤：#q 过滤 [data-search] 行，空分组隐藏，计数写进 output */
  var q = document.getElementById('q');
  if (q) {
    var rows = Array.prototype.slice.call(document.querySelectorAll('[data-search]'));
    var groups = Array.prototype.slice.call(document.querySelectorAll('.group'));
    var out = document.getElementById('q-count');
    var total = rows.length;
    function apply() {
      var term = q.value.trim().toLowerCase();
      var shown = 0;
      rows.forEach(function (r) {
        var hit = !term || r.dataset.search.indexOf(term) !== -1;
        r.hidden = !hit; if (hit) shown++;
      });
      groups.forEach(function (g) {
        g.hidden = !g.querySelector('[data-search]:not([hidden])');
      });
      if (out) out.textContent = term ? ('匹配 ' + shown + ' / ' + total) : ('共 ' + total + ' 个');
      var empty = document.getElementById('q-empty');
      if (empty) empty.hidden = !(term && shown === 0);
    }
    q.addEventListener('input', apply);
    var initial = new URLSearchParams(location.search).get('q');
    if (initial) { q.value = initial; }
    apply();
  }

  /* 3a. 目录：窄屏默认收起，宽屏常开 */
  var box = document.querySelector('.toc-box');
  if (box && window.matchMedia) {
    var wide = window.matchMedia('(min-width: 1200px)');
    var sync = function () { box.open = wide.matches; };
    sync();
    if (wide.addEventListener) wide.addEventListener('change', sync); else if (wide.addListener) wide.addListener(sync);
  }

  /* 3. 目录高亮：最后一个顶部已越过阅读线的 section */
  var toc = document.querySelector('.rail .toc');
  if (toc) {
    var links = Array.prototype.slice.call(toc.querySelectorAll('a[href^="#"]'));
    var targets = links.map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); });
    var current = null, ticking = false;
    function update() {
      ticking = false;
      var line = window.scrollY + Math.min(160, window.innerHeight * 0.25);
      var idx = 0;
      for (var i = 0; i < targets.length; i++) { if (targets[i] && targets[i].getBoundingClientRect().top + window.scrollY <= line) idx = i; }
      if (links[idx] !== current) {
        if (current) current.removeAttribute('aria-current');
        current = links[idx]; current.setAttribute('aria-current', 'true');
      }
    }
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }
})();
