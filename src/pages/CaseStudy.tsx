import { ProjectGallery } from '../components/ProjectGallery';
import { DestinationLink } from '../components/DestinationLink';
import type { Project } from '../data/projects';
import { SectionLabel } from '../components/SectionLabel';
import { ProjectPreview } from '../components/ProjectPreview';
import s from '../styles/Portfolio.module.css';
interface CaseStudyProps { project: Project }
export function CaseStudy({ project }: CaseStudyProps) {
  const content = project.caseStudy!;
  return <main id="main" tabIndex={-1} className={s.caseStudy}>
    <DestinationLink className={s.textLink} href="/#portfolio">← Back to my portfolio</DestinationLink>
    <SectionLabel aside={project.category}>Project / Case study</SectionLabel>
    <h1 className={s.heading}>{project.title}<em>.</em></h1><p className={s.body}>{project.description}</p>
    <section className={s.caseSection}><h2><span className={s.redMeta}>01 / </span>Why</h2><p className={s.body}>{content.why}</p></section>
    <section className={s.caseSection}><h2><span className={s.redMeta}>02 / </span>Approach</h2><p className={s.body}>{content.approach}</p></section>
    <section className={s.caseSection}><h2><span className={s.redMeta}>03 / </span>The build</h2><div><p className={s.body}>{content.build}</p><p className={s.meta}>{project.stack?.join(' · ')}</p>{project.id === 'think-with-ai' && <ProjectPreview />}<ProjectGallery projectId={project.id} /><div className={s.caseActions}><DestinationLink className={s.button} href={project.href}>{project.id === 'think-with-ai' ? 'View live product' : 'View original project'} <span aria-hidden="true">↗</span></DestinationLink>{project.githubHref && <DestinationLink className={`${s.button} ${s.outlineButton}`} href={project.githubHref}>View GitHub repository <span aria-hidden="true">↗</span></DestinationLink>}</div></div></section>
    <section className={s.caseSection}><h2><span className={s.redMeta}>04 / </span>Outcome & reflection</h2><p className={s.body}>{content.reflection}</p></section>
    <DestinationLink className={s.textLink} href="/#portfolio">← Back to all projects</DestinationLink>
  </main>;
}
