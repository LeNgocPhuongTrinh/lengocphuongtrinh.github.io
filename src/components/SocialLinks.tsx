import { DestinationLink } from './DestinationLink';
import { links } from '../data/links';
import s from '../styles/Portfolio.module.css';
export function SocialLinks() {
  return <div className={s.socials}>{links.map(link => <DestinationLink key={link.label} href={link.href}>{link.label}<span aria-hidden="true"> ↗</span></DestinationLink>)}</div>;
}
