import { SectionLabel } from '../components/SectionLabel';
import { Portrait } from '../components/Portrait';
import { profile } from '../data/profile';
import { career } from '../data/career';
import { stats } from '../data/stats';
import s from '../styles/Portfolio.module.css';
export function About() {
  return <section id="about" className={`${s.section} ${s.about}`} aria-labelledby="about-title">
    <SectionLabel aside="Lê Ngọc Phương Trinh / Trinh Le">About / 01</SectionLabel>
    <div className={s.aboutIntro}>
      <div className={s.aboutCopy}><h2 id="about-title" className={s.display} data-reveal>From<br /><em>business</em><br />to data<br />to <em>AI.</em></h2><p className={s.aboutDescription}>{profile.about}</p><p className={s.serifNote}>Same curiosity.<br />A bigger canvas.</p></div>
      <Portrait variant="about" architecture /><aside className={s.annotation}><p className={s.handwriting}>A more intelligent<br />and human future</p><span className={s.redDash} /><p className={s.meta}>People<br />Ideas<br />Data<br />Technology<br />Impact</p></aside>
    </div>
    <div className={s.career}>
      <SectionLabel aside="Different chapters. A more complete picture.">My journey / Career evolution</SectionLabel>
      <div className={s.careerGrid}>{career.map((stage, index) => <article className={s.careerStage} key={stage.phase} data-reveal>
        <div className={s.careerHeader}><span className={s.largeNumber}>{String(index + 1).padStart(2, '0')}</span><div><p className={s.redMeta}>{stage.phase}</p><h3>{stage.title}</h3></div></div>
        <div className={s.careerDetail}><strong>{stage.institution}</strong><p>{stage.detail}</p>{stage.teaching && <p className={s.careerTeaching}>{stage.teaching}</p>}</div>
        <div className={s.careerFoot}><img className={s.careerImage} {...stage.image} alt={stage.imageAlt} loading="lazy" /><p>{stage.perspective}</p></div>
      </article>)}</div>
    </div>
    <div className={s.stats}>
      <SectionLabel aside="A glimpse, not the full story.">Trinh in numbers</SectionLabel>
      <div className={s.statsGrid}>{stats.map(stat => <div className={s.stat} key={stat.label}><p><strong className={stat.value === '∞' ? s.infinity : undefined}>{stat.value}<sup>{stat.suffix}</sup></strong><span>{stat.label}</span></p><p className={s.meta}>{stat.detail}</p></div>)}<p className={s.handwriting}>More<br />to come…</p></div>
    </div>
  </section>;
}
