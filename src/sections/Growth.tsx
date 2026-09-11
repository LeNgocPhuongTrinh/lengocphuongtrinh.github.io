import { images } from '../data/images';
import { SectionLabel } from '../components/SectionLabel';
import { growth, growthLoop } from '../data/growth';
import s from '../styles/Portfolio.module.css';
export function Growth() {
  return <section className={`${s.section} ${s.growth}`} aria-labelledby="growth-title"><SectionLabel aside="Technology for people. Ideas for a brighter tomorrow.">Learn. Build. Contribute. / 06</SectionLabel>
    <div className={s.growthGrid}><div><h2 id="growth-title" className={s.heading} data-reveal>Learn.<br />Build.<br /><em>Contribute.</em></h2><p className={s.serifNote}>Curiosity shouldn’t<br />end with knowledge.</p><span className={s.redDash} /><p className={s.meta}>Keep learning.<br />Keep building.<br />Keep contributing.</p></div><div>{growth.map((item, index) => <article className={s.growthItem} key={item.title} data-reveal><span className={s.largeNumber}>0{index + 1}</span><div><h3>{item.title}</h3><p className={s.body}>{item.description}</p></div></article>)}</div><img className={s.editorialImage} {...images['learning-editorial']} alt="Sharing knowledge and helping learners grow" loading="lazy" /></div>
    <p className={s.growthLoop}>{growthLoop.map((word, index) => <span key={word} data-growth-word>{word}{index < growthLoop.length - 1 && <i aria-hidden="true">→</i>}</span>)}</p>
  </section>;
}
