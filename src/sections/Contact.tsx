import { DestinationLink } from '../components/DestinationLink';
import { SectionLabel } from '../components/SectionLabel';
import { SocialLinks } from '../components/SocialLinks';
import { Portrait } from '../components/Portrait';
import { profile } from '../data/profile';
import s from '../styles/Portfolio.module.css';
export function Contact() {
  return <section id="contact" className={`${s.section} ${s.contact}`} aria-labelledby="contact-title"><SectionLabel aside="Good ideas lead to more good ideas.">Let’s connect / 07</SectionLabel><div className={s.contactGrid}><h2 id="contact-title" className={s.heading} data-reveal>Let’s make<br />something<br /><em>meaningful.</em></h2><div className={s.contactCopy}><p className={s.body}>{profile.contact}</p><DestinationLink className={s.button} href={`mailto:${profile.email}`}>Say hello <span aria-hidden="true">→</span></DestinationLink><SocialLinks /></div><Portrait variant="contact" /><p className={`${s.handwriting} ${s.contactNote}`}>More<br />to create…</p></div></section>;
}
