import { Accordion } from '../components/Accordion';
import { SectionLabel } from '../components/SectionLabel';
import { experience } from '../data/experience';
import s from '../styles/Portfolio.module.css';
const items = experience.map(item => ({ id: item.id, title: <span className={s.experienceTitle}><span>{item.company}</span><span>{item.role || item.context}</span></span>, content: <><p className={s.meta}>{item.context}</p><ul className={s.experienceDetails}>{item.details.map(detail => <li key={detail}>{detail}</li>)}</ul></> }));
export function Experience() {
  return <section id="experience" className={s.section} aria-labelledby="experience-title"><SectionLabel aside="Experience creates perspective.">Experience / 04</SectionLabel><div className={s.experienceGrid}><div><h2 id="experience-title" className={s.heading} data-reveal>Where I’ve<br />learned<br />to solve<br /><em>real problems.</em></h2><p className={s.body}>Across business, data, and different industries, each experience adds another perspective to the way I understand a problem.</p><span className={s.redDash} /><p className={s.meta}>Different industries.<br />A common purpose.</p><p className={s.handwriting}>Problems<br />People<br />Progress</p></div><Accordion items={items} label="Professional experience" /></div></section>;
}
