import { useEffect, type RefObject } from 'react';

export function useEditorialMotion(root: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    let isDisposed = false;
    let cleanup: (() => void) | undefined;
    async function setup() {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
      if (isDisposed || !root.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const tokens = getComputedStyle(document.documentElement);
      const duration = parseFloat(tokens.getPropertyValue('--duration-reveal'));
      const media = gsap.matchMedia();
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const context = gsap.context(() => {
          const hero = gsap.timeline({ defaults: { duration, ease: 'power3.out' } });
          hero.from('[data-hero-word]', { yPercent: 16, opacity: 0, stagger: .12 })
            .from('[data-hero-portrait]', { opacity: 0, y: 18 }, .1)
            .from('[data-hero-copy]', { opacity: 0, y: 12, stagger: .1 }, .2);
          gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(element => {
            gsap.from(element, { y: 25, opacity: 0, duration, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 94%', once: true } });
          });
          gsap.utils.toArray<HTMLElement>('[data-image-reveal]').forEach(element => {
            gsap.from(element, { clipPath: 'inset(9% 0 0 0)', duration, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 94%', once: true } });
          });
          const words = gsap.utils.toArray<HTMLElement>('[data-growth-word]');
          if (words.length) gsap.from(words, { opacity: .35, y: 10, stagger: .15, scrollTrigger: { trigger: words[0].parentElement, start: 'top 88%', end: 'top 55%', scrub: true } });
          const parallax = parseFloat(tokens.getPropertyValue('--portrait-parallax'));
          if (parallax > 0) gsap.to('[data-hero-word]', { yPercent: -parallax, stagger: .05, ease: 'none', scrollTrigger: { trigger: '[data-hero-portrait]', start: 'top top', end: 'bottom top', scrub: true } });
        }, root);
        return () => context.revert();
      });
      cleanup = () => media.revert();
    }
    void setup().catch(error => console.error('Optional editorial motion could not initialize.', error));
    return () => { isDisposed = true; cleanup?.(); };
  }, [root]);
}
