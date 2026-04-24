export function initNav() {
  const nav = document.querySelector<HTMLElement>('.nav');
  const burger = document.getElementById('burger');
  const links = document.getElementById('navLinks');

  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  if (burger && links) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        burger.classList.remove('open');
        links.classList.remove('open');
      }),
    );
  }
}
