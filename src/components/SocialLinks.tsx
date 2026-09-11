import { links } from '../data/links';
import s from '../styles/Portfolio.module.css';
export function SocialLinks() {
  return <div className={s.socials}>{links.map(link => <a key={link.label} href={link.href}>{link.label}<span aria-hidden="true"> ↗</span></a>)}</div>;
}
