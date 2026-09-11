import { profile } from '../data/profile';
import s from '../styles/Portfolio.module.css';
export function Footer() {
  return <footer className={s.footer}><a href="/" className={s.brand}>TRINH LE</a><span className={s.meta}>{profile.fullName}</span><p className={s.meta}>{profile.identity}</p><span className={s.meta}>© 2026</span><a href="#main" className={s.backTop} aria-label="Back to top">↑</a></footer>;
}
