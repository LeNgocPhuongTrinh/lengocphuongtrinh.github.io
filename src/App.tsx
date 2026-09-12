import { Navigation } from './components/Navigation';
import { Hero } from './sections/Hero';
import { Marquee } from './sections/Marquee';
import { About } from './sections/About';
import { Countries } from './sections/Countries';
import { Capabilities } from './sections/Capabilities';
import { Exploring } from './sections/Exploring';
import { Portfolio } from './sections/Portfolio';
import { Experience } from './sections/Experience';
import { Education } from './sections/Education';
import { Growth } from './sections/Growth';
import { Contact } from './sections/Contact';
import { Footer } from './components/Footer';
import { CaseStudy } from './pages/CaseStudy';
import { NotFound } from './pages/NotFound';
import { caseStudies } from './data/projects';
import { useRef } from 'react';
import { useEditorialMotion } from './hooks/useEditorialMotion';

interface AppProps { path?: string }
export default function App({ path = '/' }: AppProps) {
  const root = useRef<HTMLDivElement>(null);
  useEditorialMotion(root);
  const project = caseStudies.find(item => path.replace(/\/$/, '') === `/projects/${item.id}`);
  const isHome = path === '/' || path === '/index.html';
  return <div ref={root}><Navigation />{isHome ? <main id="main" tabIndex={-1}>
    <Hero /><Marquee /><About /><Countries /><Capabilities /><Exploring /><Portfolio />
    <Experience /><Education /><Growth /><Contact />
  </main> : project ? <CaseStudy project={project} /> : <NotFound />}<Footer /></div>;
}
