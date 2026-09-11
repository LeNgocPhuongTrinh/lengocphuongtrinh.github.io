import type { Project } from '../data/projects';
import { SectionLabel } from '../components/SectionLabel';
import { ProjectPreview } from '../components/ProjectPreview';
import s from '../styles/Portfolio.module.css';
interface CaseStudyProps { project: Project }
export function CaseStudy({ project }: CaseStudyProps) {
  const content = project.caseStudy!;
  return <main id="main" tabIndex={-1} className={s.caseStudy}>
    <a className={s.textLink} href="/#portfolio">← Back to my portfolio</a>
    <SectionLabel aside={project.category}>Project / Case study</SectionLabel>
    <h1 className={s.heading}>{project.title}<em>.</em></h1><p className={s.body}>{project.description}</p>
    <section className={s.caseSection}><h2><span className={s.redMeta}>01 / </span>Why</h2><p className={s.body}>{content.why}</p></section>
    <section className={s.caseSection}><h2><span className={s.redMeta}>02 / </span>Approach</h2><p className={s.body}>{content.approach}</p></section>
    <section className={s.caseSection}><h2><span className={s.redMeta}>03 / </span>The build</h2><div><p className={s.body}>{content.build}</p><p className={s.meta}>{project.stack?.join(' · ')}</p>{project.id === 'think-with-ai' ? <ProjectPreview /> : project.image && <a href={project.href}><img className={s.caseImage} src={project.image} width="1200" height="675" alt={`${project.title} original report`} loading="lazy" /></a>}<a className={s.button} href={project.href}>{project.id === 'think-with-ai' ? 'View live product' : 'View original project'} <span aria-hidden="true">↗</span></a></div></section>
    <section className={s.caseSection}><h2><span className={s.redMeta}>04 / </span>Outcome & reflection</h2><p className={s.body}>{content.reflection}</p></section>
    <a className={s.textLink} href="/#portfolio">← Back to all projects</a>
  </main>;
}
