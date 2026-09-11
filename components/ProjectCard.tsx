import Image from 'next/image';
import Link from 'next/link';

import type { Project } from '@/lib/projects';
import { getThumbnail } from '@/lib/thumbnails';

interface ProjectCardProps {
  project: Project;
  /** `sizes` hint for the responsive still. */
  sizes?: string;
}

export default async function ProjectCard({
  project,
  sizes = '(max-width: 720px) 100vw, (max-width: 1180px) 50vw, 380px',
}: ProjectCardProps) {
  const thumb = await getThumbnail(project);
  const isRemote = thumb !== null && thumb.startsWith('http');

  return (
    <Link href={`/work/${project.slug}`} className="card">
      <div className={`card__media${thumb ? '' : ' card__media--placeholder'}`}>
        {thumb ? (
          <Image
            src={thumb}
            alt={project.stillAlt}
            fill
            sizes={sizes}
            className="card__img"
            unoptimized={isRemote}
          />
        ) : (
          <span className="card__placeholderText">still needed, “{project.title}” frame</span>
        )}
        <span className="card__tag">{project.category}</span>
      </div>
      <div className="card__body">
        <h3 className="card__title">{project.title}</h3>
        <p className="card__sub">{project.subtitle}</p>
      </div>
    </Link>
  );
}
