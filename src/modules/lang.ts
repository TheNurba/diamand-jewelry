import { translations, SUPPORTED, type Lang } from '../i18n';

const KEY = 'diamand_lang';

function apply(lang: Lang) {
  const dict = translations[lang];
  if (!dict) return;
  document.documentElement.lang = dict.html_lang || lang;

  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (!key) return;
    const val = dict[key];
    if (val === undefined) return;
    const attr = el.getAttribute('data-i18n-attr');
    if (attr) el.setAttribute(attr, val);
    else el.textContent = val;
  });

  document.querySelectorAll<HTMLButtonElement>('.lang-btn').forEach((b) => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });

  localStorage.setItem(KEY, lang);
}

function pickInitial(): Lang {
  const saved = localStorage.getItem(KEY) as Lang | null;
  if (saved && SUPPORTED.includes(saved)) return saved;
  const nav = (navigator.language || 'ky').slice(0, 2) as Lang;
  return SUPPORTED.includes(nav) ? nav : 'ky';
}

export function initLang() {
  document.querySelectorAll<HTMLButtonElement>('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang as Lang;
      if (lang) apply(lang);
    });
  });
  apply(pickInitial());
}
