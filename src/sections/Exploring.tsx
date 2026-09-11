import { useState } from 'react';
import { SectionLabel } from '../components/SectionLabel';
import { Portrait } from '../components/Portrait';
import { exploration } from '../data/exploration';
import s from '../styles/Portfolio.module.css';
export function Exploring() {
  const [selected, setSelected] = useState(1);
  return <section className={`${s.section} ${s.exploring}`} aria-labelledby="exploring-title">
    <SectionLabel aside="Same curiosity. A bigger tomorrow.">What I’m exploring now</SectionLabel>
    <div className={s.exploringIntro}><h2 id="exploring-title" className={s.heading} data-reveal>Now, I’m exploring<br />what happens when<br /><span className={s.exploringBig}><em>AI</em> meets<br /><em>people.</em></span></h2><Portrait /><p className={`${s.handwriting} ${s.exploringNote}`}>Curiosity<br />creates<br />what’s next</p></div>
    <div className={s.themes}>{exploration.map((theme, index) => <article className={`${s.theme} ${selected === index ? s.themeSelected : ''}`} key={theme.title}>
      <button aria-pressed={selected === index} onClick={() => setSelected(index)} onPointerEnter={event => { if (event.pointerType === 'mouse') setSelected(index); }}>
        <span className={s.largeNumber}>{String(index + 1).padStart(2, '0')}</span><h3>{theme.title}</h3><span className="sr-only"> — highlight this direction</span>
      </button><ul>{theme.items.map(item => <li key={item}>{item}</li>)}</ul><p className={s.meta}>{theme.note}</p>
    </article>)}</div>
    <a className={s.nextChapter} href="#portfolio"><span className={s.meta}>Ideas<br />Experience<br />People<br />Real impact</span><span><span className={s.meta}>Next chapter / 03</span><strong>My<br /><em>portfolio.</em></strong></span><span className={s.nextArrow} aria-hidden="true">→</span><span className={s.largeNumber} aria-hidden="true">03</span></a>
  </section>;
}
