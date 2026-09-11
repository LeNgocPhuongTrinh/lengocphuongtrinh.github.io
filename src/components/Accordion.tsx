import { useState, type ReactNode } from 'react';
import s from '../styles/Portfolio.module.css';
export interface AccordionItem { id: string; title: ReactNode; content: ReactNode }
interface AccordionProps { items: AccordionItem[]; label: string }
export function Accordion({ items, label }: AccordionProps) {
  const [active, setActive] = useState<string | undefined>(items[0]?.id);
  return <div className={s.accordion} aria-label={label}>{items.map((item, index) => {
    const isOpen = active === item.id;
    return <article className={`${s.accordionItem} ${isOpen ? s.accordionOpen : ''}`} key={item.id}>
      <h3><button id={`${item.id}-trigger`} aria-expanded={isOpen} aria-controls={`${item.id}-panel`} onClick={() => setActive(isOpen ? undefined : item.id)}>
        <span className={s.accordionNumber}>{String(index + 1).padStart(2, '0')}</span>
        <span className={s.accordionTitle}>{item.title}</span><span className={s.accordionSign} aria-hidden="true">{isOpen ? '−' : '+'}</span>
      </button></h3>
      <div className={s.accordionPanel} id={`${item.id}-panel`} role="region" aria-labelledby={`${item.id}-trigger`} aria-hidden={!isOpen} inert={!isOpen}>
        <div><div className={s.accordionContent}>{item.content}</div></div>
      </div>
    </article>;
  })}</div>;
}
