import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initReveal() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const targets: Array<{ sel: string; y?: number; scale?: number; stagger?: number }> = [
    { sel: '.section-head', y: 30, stagger: 0.08 },
    { sel: '.about-copy > *', y: 40, stagger: 0.08 },
    { sel: '.about-frame', y: 40, scale: 0.96 },
    { sel: '.feat-card', y: 50, stagger: 0.12 },
    { sel: '.srv', y: 50, stagger: 0.12 },
    { sel: '.price-card', y: 40, scale: 0.98 },
    { sel: '.tile', y: 30, stagger: 0.05 },
    { sel: '.contact-card', y: 40 },
    { sel: '.map-card', y: 40 },
    { sel: '.chapter', y: 20, stagger: 0 },
    { sel: '.footer-inner > *', y: 20, stagger: 0.08 },
  ];

  for (const t of targets) {
    const els = gsap.utils.toArray<HTMLElement>(t.sel);
    if (!els.length) continue;
    els.forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: t.y ?? 30, scale: t.scale ?? 1 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          delay: (t.stagger ?? 0) * i,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        },
      );
    });
  }
}
