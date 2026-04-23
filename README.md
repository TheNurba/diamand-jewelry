# Diamand — Jewelry Boutique Website

Статикалык onepager сайт: "Diamand" аттуу зергерлик дүкөн үчүн.

## Ачуу

Эч кандай build керек эмес — жөн гана `index.html` файлын браузерден ачыңыз:

- Windows: `index.html`ди эки жолу басуу → Chrome/Edge'те ачылат
- VS Code: Live Server extension → Right-click → "Open with Live Server"

## Структура

- `index.html` — бардык бөлүмдөр бир бетте
- `styles.css` — дизайн (кара + алтын премиум тема)
- `script.js` — тил которуу, mobile menu, galley lightbox, scroll reveal
- `i18n.js` — 4 тилдин сөздүгү (KY · KK · RU · EN)

## Редакциялоо

- **Байланыш маалыматтары** (телефон, дарек, иш убактысы): `i18n.js` файлында — ар бир тил үчүн өзүнчө.
- **Баалар**: `index.html` → `#prices` таблицасы.
- **Карта**: `index.html` → `#contacts` бөлүмүндөгү `<iframe>` ичиндеги `bbox` жана `marker` координаталары.
- **Галерея сүрөттөрү**: `index.html` → `<figure class="gal-item">` элементтери (`data-full` жана `<img src>`).
- **WhatsApp / Instagram шилтемелери**: `index.html` → `.socials` блогу.

## Колдонулган технологиялар

- Vanilla HTML / CSS / JS (framework жок)
- Google Fonts: Cormorant Garamond + Montserrat
- Unsplash CDN (placeholder сүрөттөр)
- OpenStreetMap embed (акысыз карта, API key керек эмес)
