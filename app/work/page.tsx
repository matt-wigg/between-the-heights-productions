import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import ProjectCard from '@/components/ProjectCard';
import { projects, reel } from '@/lib/projects';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Selected commercial, music and narrative projects from Between The Heights Productions, 2019 to 2024.',
};

export default function WorkPage() {
  const rest = projects.filter((p) => p.slug !== reel.slug);

  return (
    <div className="container page">
      <span className="eyebrow">Work</span>
      <h1 className="page__title">Selected projects</h1>
      <p className="page__lede">
        Commercial, music and narrative work from 2019 to 2024. Open any project to see how it
        came together.
      </p>

      <div className="grid grid--wide">
        <Link href={`/work/${reel.slug}`} className="card card--featured">
          <div className="card__media">
            <Image
              src={reel.still ?? '/reel-2024.jpg'}
              alt={reel.stillAlt}
              fill
              sizes="(max-width: 720px) 100vw, 590px"
              className="card__img"
              priority
            />
          </div>
          <div className="card__body">
            <span className="card__kicker">{reel.tag}</span>
            <h2 className="card__headline">{reel.title}</h2>
            <p className="card__lede">{reel.summary} Start here.</p>
            <span className="card__cta">Watch →</span>
          </div>
        </Link>

        {rest.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
