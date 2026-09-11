import s from '../styles/Portfolio.module.css';
interface PortraitProps { variant?: 'profile' | 'contact'; className?: string }
export function Portrait({ variant = 'profile', className = '' }: PortraitProps) {
  return <figure className={`${s.portrait} ${className}`} data-image-reveal>
    <div className={s.portraitRed} aria-hidden="true" />
    <img src={`/images/${variant}-1200.webp`} srcSet={`/images/${variant}-640.webp 640w, /images/${variant}-1200.webp 1200w`} sizes="(max-width: 700px) 85vw, 45vw" width="1200" height="1800" alt="" loading="lazy" />
  </figure>;
}
