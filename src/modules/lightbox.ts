export function initLightbox() {
  const lb = document.getElementById('lightbox') as HTMLDivElement | null;
  const img = document.getElementById('lbImage') as HTMLImageElement | null;
  const btnClose = document.getElementById('lbClose');
  const btnPrev = document.getElementById('lbPrev');
  const btnNext = document.getElementById('lbNext');
  if (!lb || !img) return;

  const tiles = Array.from(document.querySelectorAll<HTMLElement>('.tile'));
  let i = 0;

  function open(idx: number) {
    if (!tiles.length) return;
    i = (idx + tiles.length) % tiles.length;
    const full = tiles[i].dataset.full;
    if (full && img) img.src = full;
    lb!.classList.add('open');
    lb!.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    lb!.classList.remove('open');
    lb!.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (img) img.src = '';
  }

  tiles.forEach((el, idx) => el.addEventListener('click', () => open(idx)));
  btnClose?.addEventListener('click', close);
  btnPrev?.addEventListener('click', (e) => { e.stopPropagation(); open(i - 1); });
  btnNext?.addEventListener('click', (e) => { e.stopPropagation(); open(i + 1); });
  lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') open(i - 1);
    else if (e.key === 'ArrowRight') open(i + 1);
  });
}
