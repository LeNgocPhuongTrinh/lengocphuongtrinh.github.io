import type { Project } from '../data/projects';
import s from '../styles/Portfolio.module.css';
interface ProjectCardProps { project: Project; index: number }
export function ProjectCard({ project, index }: ProjectCardProps) {
  return <article className={`${s.projectCard} ${project.id === 'mrp' ? s.projectWide : ''}`} data-reveal>
    {project.image ? <a className={`${s.projectArt} ${s.projectImage}`} href={project.caseStudy ? `/projects/${project.id}/` : project.href}><img src={project.image} width="1200" height="675" alt={`${project.title} — original project evidence`} loading="lazy" /><small aria-hidden="true">{String(index + 2).padStart(2, '0')}</small></a> : <div className={`${s.projectArt} ${s.projectOverview}`} aria-hidden="true"><span>{project.mark}</span><small>{String(index + 2).padStart(2, '0')}</small><i /></div>}
    <div className={s.projectCopy}><p className={s.meta}>{project.category}</p><h3>{project.title}</h3><p className={s.body}>{project.description}</p>
      {project.caseStudy ? <a className={s.textLink} href={`/projects/${project.id}/`}>View case study <span aria-hidden="true">→</span></a> : project.href ? <a className={s.textLink} href={project.href}>View work <span aria-hidden="true">↗</span></a> : <p className={s.projectPrivate}>Professional work · overview</p>}
    </div>
  </article>;
}
