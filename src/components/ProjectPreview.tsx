import { DestinationLink } from './DestinationLink';
import { useState } from 'react';
import s from '../styles/Portfolio.module.css';
const videoUrl = 'https://mlcugswrccdrvqer.public.blob.vercel-storage.com/think-with-ai-preview.mp4';
export function ProjectPreview() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  return <figure className={s.projectPreview}>
    <div className={s.browserBar} aria-hidden="true"><span>● ● ●</span><span>think-with-ai.vercel.app</span><span>↗</span></div>
    {isPlaying ? <video src={videoUrl} poster="/images/think-with-ai-preview.jpg" controls autoPlay playsInline preload="none" aria-label="Think With AI product walkthrough" onError={() => setHasError(true)} /> : <DestinationLink href="https://think-with-ai.vercel.app/" aria-label="Explore Think With AI"><img src="/images/think-with-ai.webp" width="1600" height="873" alt="The real Think With AI product: adaptive practice, confidence levels, and learning progress" loading="lazy" /></DestinationLink>}
    <figcaption><span className={s.meta}>Think With AI / The actual product</span>{!isPlaying && <button onClick={() => setIsPlaying(true)}>Watch walkthrough <span aria-hidden="true">▷</span></button>}</figcaption>
    {hasError && <p role="alert">The video could not load. <DestinationLink href={videoUrl} className={s.textLink}>Open the walkthrough ↗</DestinationLink></p>}
  </figure>;
}
