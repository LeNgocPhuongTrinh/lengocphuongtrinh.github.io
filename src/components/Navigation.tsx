import { useEffect, useRef, useState } from 'react';
import { navigation, profile } from '../data/profile';
import s from '../styles/Portfolio.module.css';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState('');
  const progress = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
    }, { rootMargin: '-15% 0px -65% 0px' });
    navigation.forEach(({ id }) => { const section = document.getElementById(id); if (section) observer.observe(section); });
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const range = document.documentElement.scrollHeight - innerHeight;
        if (progress.current) progress.current.style.transform = `scaleX(${range > 0 ? scrollY / range : 0})`;
        if (scrollY < 100) setActive('');
      });
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => { observer.disconnect(); window.removeEventListener('scroll', update); cancelAnimationFrame(frame); };
  }, []);
  return <header className={s.nav} onKeyDown={event => { if (event.key === 'Escape') { setIsOpen(false); toggle.current?.focus(); } }}>
    <a className={s.skip} href="#main">Skip to content</a>
    <a className={s.brand} href="/" aria-label="Trinh Le home">TRINH LE</a>
    <span className={s.navRule} aria-hidden="true" />
    <button ref={toggle} className={s.menuToggle} aria-expanded={isOpen} aria-controls="main-navigation" onClick={() => setIsOpen(!isOpen)}>{isOpen ? 'Close −' : 'Menu +'}</button>
    <nav id="main-navigation" aria-label="Main navigation" className={`${s.navLinks} ${isOpen ? s.navOpen : ''}`}>
      {navigation.map(item => <a key={item.id} href={`/#${item.id}`} aria-current={active === item.id ? 'location' : undefined} onClick={() => setIsOpen(false)}>{item.label}</a>)}
    </nav>
    <span className={s.navIdentity}>{profile.fullName}</span>
    <div ref={progress} className={s.scrollProgress} aria-hidden="true" />
  </header>;
}
