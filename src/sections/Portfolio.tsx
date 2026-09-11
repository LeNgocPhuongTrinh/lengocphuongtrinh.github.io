import { SectionLabel } from '../components/SectionLabel';
import { Portrait } from '../components/Portrait';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectPreview } from '../components/ProjectPreview';
import { featuredProject, projects } from '../data/projects';
import s from '../styles/Portfolio.module.css';
export function Portfolio() {
  return <section id="portfolio" className={`${s.section} ${s.portfolio}`} aria-labelledby="portfolio-title">
    <SectionLabel aside="Real problems. Meaningful solutions.">Portfolio / 03</SectionLabel>
    <div className={s.portfolioIntro}><div><h2 id="portfolio-title" className={s.display} data-reveal>My<br /><em>portfolio.</em></h2><p className={s.serifNote}>Building at the intersection of<br /><strong>AI × Data × Business</strong></p></div><Portrait /><p className={`${s.meta} ${s.portfolioAside}`}>Ideas<br />Data<br />People<br />Impact</p></div>
    <div className={s.featured}>
      <div className={s.featuredCopy}><p className={s.redMeta}>01 / Featured project <span>AI × Learning</span></p><h3 className={s.display} data-reveal>Think<br />with <em>AI</em></h3><p className={s.partner}>Learning Partner</p><p className={s.featuredTagline}>Understand Deeper,<br />Not Just Faster.</p><p className={s.body}>{featuredProject.description}</p><div className={s.projectActions}><a className={s.button} href={featuredProject.href}>Explore project <span aria-hidden="true">↗</span></a><a className={s.textLink} href="/projects/think-with-ai/">View case study <span aria-hidden="true">→</span></a></div></div>
      <ProjectPreview />
    </div>
    <div className={s.moreProjects}><SectionLabel aside="Different problems. A common purpose.">More projects / 02—{String(projects.length + 1).padStart(2, '0')}</SectionLabel><div className={s.projectGrid}>{projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}</div></div>
  </section>;
}
