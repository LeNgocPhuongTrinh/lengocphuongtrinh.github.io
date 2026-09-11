import { profile } from '../data/profile';
import { SocialLinks } from '../components/SocialLinks';
import s from '../styles/Portfolio.module.css';
export function Hero() {
  return <section className={s.hero} aria-labelledby="hero-title">
    <svg width="0" height="0" aria-hidden="true"><defs><clipPath id="portrait-silhouette" clipPathUnits="objectBoundingBox"><path d="M 0,1 L 0,.68 Q .015,.6 .09,.58 Q .13,.56 .11,.51 Q .065,.43 .12,.35 Q .13,.24 .22,.17 Q .3,.095 .45,.10 Q .6,.095 .67,.17 Q .72,.22 .7,.29 Q .76,.35 .775,.41 Q .8,.46 .745,.49 Q .86,.5 .885,.6 Q .97,.61 1,.68 L 1,1 Z" /></clipPath></defs></svg>
    <h1 id="hero-title" className={s.heroTitle}><span data-hero-word>TRINH</span><span data-hero-word>LE.</span></h1>
    <div className={s.heroHalo} aria-hidden="true" />
    <picture className={s.heroPortrait} data-hero-portrait>
      <source srcSet="/images/hero-640.webp 640w, /images/hero-1200.webp 1200w" sizes="(max-width: 700px) 100vw, 64vw" />
      <img src="/images/hero-1200.webp" width="1200" height="1800" alt="Trinh Le" fetchPriority="high" />
    </picture>
    <div className={s.heroCopy} data-hero-copy>
      <p className={s.identity}>{profile.identity}</p>
      <div className={s.heroBio}><p>{profile.education}<br /><span>@ {profile.university}</span></p><p>{profile.previous}<br /><span>@ {profile.companies}</span></p></div>
      <div className={s.heroActions}><a className={s.button} href="#portfolio">Explore my work <span aria-hidden="true">→</span></a><a className={`${s.button} ${s.outlineButton}`} href="#about">About me <span aria-hidden="true">→</span></a></div>
      <SocialLinks />
    </div>
    <div className={s.fullName} data-hero-copy><span className={s.redDash} /><p className={s.meta}>Full name / Vietnam</p><p>{profile.fullName}</p></div>
  </section>;
}
