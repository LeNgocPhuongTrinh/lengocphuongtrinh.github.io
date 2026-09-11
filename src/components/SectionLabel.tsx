import s from '../styles/Portfolio.module.css';
interface SectionLabelProps { children: React.ReactNode; aside?: string }
export function SectionLabel({ children, aside }: SectionLabelProps) {
  return <div className={s.sectionLabel}><span>{children}</span><i aria-hidden="true" />{aside && <span className={s.labelAside}>{aside}</span>}</div>;
}
