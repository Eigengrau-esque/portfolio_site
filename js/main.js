/* =============================================
   Portfolio: main.js
   Theme toggle, mobile nav, lightbox, copy email.
   (The initial theme is applied by a small inline
   script in each page's <head> to avoid a flash.)
   ============================================= */

(function () {
  'use strict';

  var root = document.documentElement;

  /* ---- THEME ---- */
  var themeToggle = document.getElementById('themeToggle');
  var themeMeta = document.querySelector('meta[name="theme-color"]');
  var THEME_COLORS = { light: '#1a1e26', dark: '#0b0d12' };

  function applyThemeUi(theme) {
    if (themeMeta) themeMeta.setAttribute('content', THEME_COLORS[theme]);
    if (themeToggle) {
      themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }
  applyThemeUi(root.getAttribute('data-theme') || 'light');

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) { /* storage unavailable */ }
      applyThemeUi(next);
    });
  }

  /* ---- MOBILE NAV ---- */
  var navToggle = document.getElementById('navToggle');
  var navWrap = document.getElementById('navLinksWrap');

  function setNav(open) {
    if (!navToggle || !navWrap) return;
    navWrap.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  if (navToggle && navWrap) {
    navToggle.addEventListener('click', function () {
      setNav(!navWrap.classList.contains('open'));
    });
    navWrap.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setNav(false); });
    });
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navWrap.contains(e.target)) setNav(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navWrap.classList.contains('open')) {
        setNav(false);
        navToggle.focus();
      }
    });
  }

  /* ---- LIGHTBOX ---- */
  var box = document.getElementById('lightbox');
  if (box && typeof box.showModal === 'function') {
    var lbImg = box.querySelector('img');
    var lbCap = box.querySelector('.lb-caption');
    var prevBtn = box.querySelector('.lb-prev');
    var nextBtn = box.querySelector('.lb-next');
    var group = [];
    var index = 0;
    var opener = null;

    var show = function (i) {
      index = (i + group.length) % group.length;
      var b = group[index];
      var img = b.querySelector('img');
      lbImg.src = img.currentSrc || img.src;
      lbImg.alt = img.alt;
      lbCap.textContent = b.getAttribute('data-caption') || img.alt;
      var multi = group.length > 1;
      prevBtn.hidden = !multi;
      nextBtn.hidden = !multi;
    };

    document.querySelectorAll('[data-lightbox]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var name = btn.getAttribute('data-lightbox');
        group = Array.prototype.slice.call(document.querySelectorAll('[data-lightbox="' + name + '"]'));
        opener = btn;
        show(group.indexOf(btn));
        box.showModal();
      });
    });

    prevBtn.addEventListener('click', function () { show(index - 1); });
    nextBtn.addEventListener('click', function () { show(index + 1); });
    box.querySelector('.lb-close').addEventListener('click', function () { box.close(); });
    box.addEventListener('click', function (e) { if (e.target === box) box.close(); });
    box.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); show(index - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); show(index + 1); }
    });
    box.addEventListener('close', function () {
      lbImg.removeAttribute('src');
      if (opener) opener.focus();
    });
  }

  /* ---- COPY EMAIL ---- */
  document.querySelectorAll('.copy-btn').forEach(function (btn) {
    var label = btn.querySelector('.copy-label');
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy');
      var status = document.getElementById('copyStatus');

      function done(ok) {
        label.textContent = ok ? 'Copied' : 'Copy failed';
        if (status) status.textContent = ok ? 'Email address copied' : 'Could not copy the email address';
        setTimeout(function () { label.textContent = 'Copy email'; }, 2000);
      }
      function fallback() {
        var ta = document.createElement('textarea');
        ta.value = text; ta.setAttribute('readonly', '');
        ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        var ok = false;
        try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
        document.body.removeChild(ta);
        done(ok);
      }
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(function () { done(true); }, fallback);
      } else {
        fallback();
      }
    });
  });
})();
