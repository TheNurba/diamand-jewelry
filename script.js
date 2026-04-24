(function () {
  'use strict';

  // ===== i18n =====
  const STORAGE_KEY = 'diamand_lang';
  const supported = ['ky', 'kk', 'ru', 'en'];
  const initial = (() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && supported.includes(saved)) return saved;
    const nav = (navigator.language || 'ky').slice(0, 2);
    return supported.includes(nav) ? nav : 'ky';
  })();

  function applyLang(lang) {
    const dict = translations[lang];
    if (!dict) return;
    document.documentElement.lang = dict.html_lang || lang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = dict[key];
      if (val === undefined) return;
      const attr = el.getAttribute('data-i18n-attr');
      if (attr) {
        el.setAttribute(attr, val);
      } else {
        el.textContent = val;
      }
    });

    document.querySelectorAll('.lang-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.lang === lang);
    });

    localStorage.setItem(STORAGE_KEY, lang);
  }

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => applyLang(btn.dataset.lang));
  });

  applyLang(initial);

  // ===== Mobile menu =====
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      burger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  // ===== Scroll reveal =====
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // ===== Lightbox =====
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImage');
  const lbClose = document.getElementById('lbClose');
  const lbPrev = document.getElementById('lbPrev');
  const lbNext = document.getElementById('lbNext');
  const items = Array.from(document.querySelectorAll('.gal-item'));
  let idx = 0;

  function open(i) {
    idx = (i + items.length) % items.length;
    lbImg.src = items[idx].dataset.full;
    lb.classList.add('open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lbImg.src = '';
  }

  items.forEach((el, i) => el.addEventListener('click', () => open(i)));
  lbClose.addEventListener('click', close);
  lbPrev.addEventListener('click', e => { e.stopPropagation(); open(idx - 1); });
  lbNext.addEventListener('click', e => { e.stopPropagation(); open(idx + 1); });
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') open(idx - 1);
    else if (e.key === 'ArrowRight') open(idx + 1);
  });

  // ===== Cinematic extras =====
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(pointer:fine)').matches;

  // Nav scrolled state
  const navEl = document.querySelector('.nav');
  const onScroll = () => navEl.classList.toggle('scrolled', window.scrollY > 12);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Hero parallax
  if (!reduced) {
    const heroInner = document.querySelector('.hero-inner');
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, 800);
        heroInner.style.transform = `translateY(${y * 0.18}px)`;
        heroInner.style.opacity = String(Math.max(1 - y / 600, 0));
        ticking = false;
      });
    }, { passive: true });
  }

  // Spotlight
  if (!reduced && finePointer) {
    const hero = document.querySelector('.hero');
    const spot = hero.querySelector('.spotlight');
    let rafId = 0, px = 50, py = 50;
    hero.addEventListener('mousemove', e => {
      const r = hero.getBoundingClientRect();
      px = ((e.clientX - r.left) / r.width) * 100;
      py = ((e.clientY - r.top) / r.height) * 100;
      if (!rafId) rafId = requestAnimationFrame(() => {
        spot.style.setProperty('--mx', px + '%');
        spot.style.setProperty('--my', py + '%');
        rafId = 0;
      });
    });
  }
})();
