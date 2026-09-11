import { useState } from 'react';
import { marquee } from '../data/profile';
import s from '../styles/Portfolio.module.css';
export function Marquee() {
  const [isPaused, setIsPaused] = useState(false);
  return <div className={`${s.marquee} ${isPaused ? s.paused : ''}`}>
    <div className={s.marqueeTrack}>{[0, 1].map(copy => <div key={copy} aria-hidden={copy === 1 ? true : undefined}>{marquee.map(word => <span key={word}>{word} <b aria-hidden="true">✦</b></span>)}</div>)}</div>
    <button onClick={() => setIsPaused(!isPaused)} aria-label={isPaused ? 'Resume identity marquee' : 'Pause identity marquee'}>{isPaused ? '▶' : 'Ⅱ'}</button>
  </div>;
}
