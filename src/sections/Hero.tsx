import { images } from '../data/images';
import { profile } from '../data/profile';
import { SocialLinks } from '../components/SocialLinks';
import s from '../styles/Portfolio.module.css';
export function Hero() {
  return <section className={s.hero} aria-labelledby="hero-title">
    <h1 id="hero-title" className={s.heroTitle}><span data-hero-word>TRINH</span><span data-hero-word>LE.</span></h1>
    <div className={s.heroHalo} aria-hidden="true" />
    <picture className={s.heroPortrait} data-hero-portrait>
      <source srcSet="/images/portrait-hero-640.webp 640w, /images/portrait-hero.webp 1024w" sizes="(max-width: 700px) 100vw, 64vw" />
      <img {...images['portrait-hero']} alt="Trinh Le" fetchPriority="high" />
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
