import { images } from './images';

interface ProjectImage { src: string; caption: string }
export const projectPreviews: Record<string, ProjectImage[]> = {
  'think-with-ai': [
    { src: images['think-learning'].src, caption: 'Learning library and topic confidence' },
    { src: images['think-practice'].src, caption: 'Eigenvalues and eigenvectors learning material' },
    { src: images['think-progress'].src, caption: 'Practice session and learning controls' },
    { src: images['think-overview'].src, caption: 'Vectors and matrices topic preview' },
  ],
  'oee-manufacturing': Array.from({ length: 5 }, (_, index) => ({
    src: `/images/oee-report-${index + 1}.webp`,
    caption: ['Manufacturing efficiency overview', 'Availability and downtime', 'Performance analysis', 'Quality analysis', 'Machine-level report'][index],
  })),
  'fitness-health': [{ src: '/images/fitness-tracker.webp', caption: 'Fitness tracker market analysis — complete report' }],
  'mrp': [{ src: '/images/mrp.webp', caption: 'Material planning calculations and Python implementation' }],
  'supplier-quality': Array.from({ length: 3 }, (_, index) => ({
    src: `/images/supplier-report-${index + 1}.webp`, caption: `Supplier quality analysis — report page ${index + 1}`,
  })),
  'film-analysis': [{ src: '/images/film.webp', caption: 'Movie revenue and return on investment analysis' }],
  'parental-leave': [{ src: '/images/parental-leave-policy.webp', caption: 'Parental leave policy by industry — complete report' }],
};
