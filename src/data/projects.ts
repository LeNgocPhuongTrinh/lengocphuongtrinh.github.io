export interface CaseStudyContent { why: string; approach: string; build: string; reflection: string }
export interface Project {
  id: string; title: string; category: string; description: string;
  mark: string; href?: string; githubHref?: string; image?: string; stack?: string[]; caseStudy?: CaseStudyContent;
}
export const featuredProject: Project = {
  id: 'think-with-ai', title: 'Think With AI', category: 'AI × Learning', mark: 'AI',
  description: 'A personal adaptive learning system that helps you learn with AI, practise your reasoning, and keep track of what you understand.',
  href: 'https://think-with-ai.vercel.app/', image: '/images/think-with-ai.webp',
  stack: ['React', 'TypeScript', 'AI-assisted practice'],
  caseStudy: {
    why: 'Getting an answer is not the same as understanding it. Think With AI explores how a learning partner can help people practise their thinking instead of simply consume AI-generated answers.',
    approach: 'Organize learning around topics and confidence levels. Adapt practice to the learner, make the grading criteria visible, and keep misconceptions available for future review. The learner can review and override a confidence assessment.',
    build: 'A React and TypeScript application with material upload, a built-in curriculum, confidence-based practice, structured feedback, and progress views. Learning state stays on the device. The learner supplies their own AI provider key.',
    reflection: 'The current build connects practice, feedback, and progress in one learning loop. It remains a personal product experiment: learning gains have not been measured. The Study view is still a preview, and generated feedback needs the learner’s judgment.',
  },
};
export const projects: Project[] = [
  { id: 'oee-manufacturing', githubHref: 'https://github.com/LeNgocPhuongTrinh/dashboard-visualization/tree/7a2c1d8808f39043f4e89bb051f2d37d8f507f27/OEE%20Manufacturing', title: 'OEE Manufacturing', category: 'Power BI × Manufacturing', mark: 'OEE', image: '/images/oee-manufacturing.webp', description: 'Availability, performance, and quality: tracing production losses from the plant overview to individual machines.', href: '/projects/evidence/oee-manufacturing.pdf', stack: ['Power BI', 'Data visualization'], caseStudy: {
    why: 'An overall production figure does not explain where effective run time is lost. This dashboard separates availability, performance, and quality to make those losses visible.',
    approach: 'Connect a plant-level OEE and TEEP overview to separate availability, performance, and quality views. Compare daily trends and machine-level indicators, including stoppages and capacity utilization.',
    build: 'A five-page Power BI report covering production efficiency, downtime, performance losses, quality losses, and machine-level details. The supplied report is available below as a static PDF.',
    reflection: 'The report presents multiple paths into the production data rather than a single aggregate score. Its displayed values describe the report dataset; they are not claims of efficiency improvements delivered by this project.',
  } },
  { id: 'fitness-health', githubHref: 'https://github.com/LeNgocPhuongTrinh/dashboard-visualization/tree/7a2c1d8808f39043f4e89bb051f2d37d8f507f27/Fitness%20Tracker%20in%20Indian%20market', title: 'Fitness & Health', category: 'Fitness tracker market analysis', mark: 'MOVE', image: '/images/fitness-tracker.webp', description: 'A visual study of fitness trackers in the Indian market: preferences, price segments, brands, and product features.', href: '/projects/evidence/fitness-tracker.pdf', stack: ['Data visualization', 'Market analysis'], caseStudy: {
    why: 'Fitness tracker products vary in price, brand, and features. The analysis brings those dimensions together to examine the Indian market.',
    approach: 'Compare user preferences, brand price segments, ratings, and product features. Use distributions and feature-level comparisons to explore price variation.',
    build: 'A visual report spanning preference profiles, brand and price segmentation, feature correlation, and price comparisons. The complete supplied report is available as a PDF.',
    reflection: 'The report explicitly identifies a data limitation: only 31% of the data is valid for its feature/price correlation analysis. Those comparisons should be read within that constraint, rather than treated as a complete market model.',
  } },
  { id: 'mrp', githubHref: 'https://github.com/LeNgocPhuongTrinh/python/tree/d80c5a6387380d7ec6ffe036a684d9f324bd0680/Supply%20Planning', title: 'MRP — Material Requirement Planning', category: 'Python × Supply chain automation', mark: 'MRP', image: '/images/mrp.webp', description: 'Calculate planned order releases while accounting for shelf life, minimum order quantities, and raw materials stored at multiple sites.', href: 'https://lengocphuongtrinh.wixsite.com/lnpt/mrp', stack: ['Python', 'Supply chain'], caseStudy: {
    why: 'Material planning has to account for practical constraints: shelf life, minimum order quantities, and materials held across multiple sites.',
    approach: 'Use Python to calculate planned order releases with these constraints included in the planning logic.',
    build: 'A Python application in supply chain automation. The original project page describes the material requirement planning work and remains the source for the detailed project evidence.',
    reflection: 'The project applies programming to a concrete planning problem. Quantified operational results and further retrospective detail are not published in the available source material.',
  } },
  { id: 'supplier-quality', title: 'Supplier Quality', category: 'Power BI × Supply chain', mark: 'QUALITY', image: '/images/supplier-quality.webp', description: 'Explore defects and downtime across vendors, materials, plants, and supply risk segments.', href: '/projects/evidence/supplier-quality.pdf' },
  { id: 'film-analysis', title: 'A Century of Film', category: 'Revenue × Return on investment', mark: 'FILM', image: '/images/film.webp', description: 'Visualizing movie revenue, returns, and their evolution from the 1900s onward.', href: '/images/film.webp' },
  { id: 'parental-leave', title: 'Parental Leave Policy', category: 'Data storytelling', mark: 'PEOPLE', image: '/images/parental-leave-policy.webp', description: 'Comparing paid maternity and paternity leave across industries in the surveyed data.', href: '/projects/evidence/parental-leave-policy.pdf' },
  { id: 'shopee-chatbot', title: 'AI & Data Chatbot at Shopee', category: 'AI × Data', mark: 'ASK', description: 'A project at the intersection of AI, data, and e-commerce.' },
  { id: 'projections', title: 'Short-term to Long-term Projection', category: 'Intraday × Long-term planning', mark: 'TIME', description: 'Projection work spanning intraday and longer-term time horizons.' },
];
export const caseStudies = [featuredProject, ...projects].filter(project => project.caseStudy);
