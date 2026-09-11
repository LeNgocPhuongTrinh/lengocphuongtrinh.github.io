import { SectionLabel } from '../components/SectionLabel';
import { education, scholarship } from '../data/education';
import s from '../styles/Portfolio.module.css';
export function Education() {
  return <section id="learning" className={s.section} aria-labelledby="learning-title"><SectionLabel aside="People. Places. Opportunities.">Education & recognition / 05</SectionLabel>
    <div className={s.educationGrid}><div className={s.educationIntro}><h2 id="learning-title" className={s.heading} data-reveal><span>Learning has<br />taken me</span><br />from<br /><em>Vietnam</em><br />to the UK.</h2><p className={s.meta}>A bigger world.<br />A broader perspective.</p></div>
      {education.map((item, index) => <article className={s.educationCard} key={item.mark} data-reveal><p className={s.meta}>0{index + 1} / {item.label}</p><div className={s.educationMark} aria-hidden="true">{item.mark}<span>↗</span></div><h3>{item.title}</h3><p>{item.institution}<br />{item.location}</p><p className={s.body}>{item.detail}</p></article>)}
      <article className={s.scholarship} data-reveal><p className={s.meta}>03 / Recognition</p><span className={s.scholarshipStar} aria-hidden="true">✳</span><p className={s.meta}>{scholarship.name}</p><h3>{scholarship.title}</h3><p className={s.scholarshipYear}>{scholarship.period}</p><p>Learning, growing, and exploring what comes next in STEM.</p></article>
    </div>
  </section>;
}
