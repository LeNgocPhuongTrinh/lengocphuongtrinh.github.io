import { Accordion } from '../components/Accordion';
import { SectionLabel } from '../components/SectionLabel';
import { capabilities } from '../data/capabilities';
import s from '../styles/Portfolio.module.css';
const items = capabilities.map(item => ({ id: item.id, title: item.title, content: <><p className={s.meta}>{item.subtitle}</p><div className={s.capabilityDetail}><ul>{item.items.map(skill => <li key={skill}>{skill}</li>)}</ul><p>{item.note}</p></div></> }));
export function Capabilities() {
  return <section className={s.section} aria-labelledby="capabilities-title">
    <SectionLabel aside="More than tools. A way of thinking.">Capabilities / 02</SectionLabel>
    <div className={s.capabilitiesGrid}><div className={s.capabilitiesIntro}>
      <h2 id="capabilities-title" className={s.display} data-reveal>Capabilities<em>.</em></h2>
      <div className={s.capabilityArt}><div><p className={s.meta}>Technical<br />know-how<br />meets<br />business<br />perspective.</p><span className={s.redDash} /><p className={s.meta}>Different tools.<br />Same purpose.</p></div><div className={s.typographicArt}><span className={s.meta}>A working philosophy</span><p>Understand<br />the problem.<br /><em>Build what<br />matters.</em></p><span className={s.handwriting}>Ideas → Data<br />People → Impact</span></div></div>
    </div><Accordion items={items} label="Capabilities" /></div>
  </section>;
}
