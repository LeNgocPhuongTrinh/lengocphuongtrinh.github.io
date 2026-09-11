import s from '../styles/Portfolio.module.css';
export function NotFound() {
  return <main id="main" tabIndex={-1} className={s.caseStudy}><p className={s.redMeta}>404 / A page yet to be written</p><h1 className={s.heading}>Let’s find<br />the <em>way back.</em></h1><a className={s.button} href="/">Return to Trinh Le <span aria-hidden="true">→</span></a></main>;
}
