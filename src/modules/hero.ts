import { gsap } from 'gsap';

export function initHero() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.from('.hero-fan-l', { x: -80, opacity: 0, duration: 1.3 })
    .from('.hero-fan-r', { x: 80, opacity: 0, duration: 1.3 }, '<')
    .from('.hero-monogram', { scale: 0.6, opacity: 0, duration: 1 }, '-=0.9')
    .from('.hero .eyebrow', { y: 20, opacity: 0, duration: .8 }, '-=0.5')
    .from('.hero-title-flank', { opacity: 0, x: (i: number) => (i === 0 ? -30 : 30), duration: .9, stagger: .05 }, '-=0.3')
    .from('.hero-title-word', { y: 40, opacity: 0, duration: 1 }, '-=0.7')
    .from('.hero-chev', { scaleX: 0, opacity: 0, duration: .9, transformOrigin: 'center' }, '-=0.5')
    .from('.hero-sub', { y: 20, opacity: 0, duration: .8 }, '-=0.5')
    .from('.hero-ctas > *', { y: 20, opacity: 0, duration: .7, stagger: .1 }, '-=0.4');
}
