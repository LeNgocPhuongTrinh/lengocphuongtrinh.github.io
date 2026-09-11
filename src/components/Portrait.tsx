import { images } from '../data/images';
import s from '../styles/Portfolio.module.css';

interface PortraitProps {
  variant: 'about' | 'portfolio' | 'contact';
  architecture?: boolean;
  className?: string;
}

export function Portrait({ variant, architecture = false, className = '' }: PortraitProps) {
  const photo = images[`portrait-${variant}`];
  return (
    <figure className={`${s.portrait} ${className}`} data-image-reveal>
      <div className={s.portraitRed} aria-hidden="true" />
      {architecture && <img className={s.architecture} {...images['stirling-architecture']} alt="Stirling Castle in Scotland" loading="lazy" />}
      <img className={s.portraitPhoto} {...photo}
        srcSet={`${photo.src.replace('.webp', '-640.webp')} 640w, ${photo.src} ${photo.width}w`}
        sizes="(max-width: 700px) 85vw, 45vw" alt="Trinh Le" loading="lazy" />
    </figure>
  );
}
