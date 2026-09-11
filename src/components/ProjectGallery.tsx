import { projectPreviews } from '../data/project-previews';
import { DestinationLink } from './DestinationLink';
import s from '../styles/Portfolio.module.css';

export function ProjectGallery({ projectId }: { projectId: string }) {
  const previews = projectPreviews[projectId];
  if (!previews?.length) return null;
  return (
    <div className={s.projectGallery} aria-label="Project image previews">
      {previews.map((preview, index) => (
        <figure key={preview.src}>
          <DestinationLink href={preview.src} aria-label={`Open ${preview.caption} at full size`}>
            <img src={preview.src} alt={preview.caption} loading="lazy" />
          </DestinationLink>
          <figcaption><span className={s.redMeta}>{String(index + 1).padStart(2, '0')} / </span>{preview.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}
