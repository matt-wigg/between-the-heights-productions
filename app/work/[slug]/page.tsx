import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getNextProject, getProject, projects } from '@/lib/projects';
import styles from './project.module.css';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    openGraph: project.still
      ? { images: [{ url: project.still, width: 1280, height: 720, alt: project.stillAlt }] }
      : undefined,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = getNextProject(project.slug);

  return (
    <div className={styles.page}>
      <div className={`container ${styles.back}`}>
        <Link href="/work" className={styles.backLink}>
          <span>←</span> All work
        </Link>
      </div>

      <div className={`container ${styles.body}`}>
        <span className="eyebrow eyebrow--accent">{project.tag}</span>
        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.summary}>{project.summary}</p>

        <div className={`player ${styles.player}`}>
          <iframe
            src={project.embed}
            title={project.title}
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
            allowFullScreen
          />
        </div>

        <div className={`meta ${styles.meta}`}>
          <div>
            <span className="meta__label">Client</span>
            <span className="meta__value">{project.client}</span>
          </div>
          <div>
            <span className="meta__label">Role</span>
            <span className="meta__value">{project.role}</span>
          </div>
          <div>
            <span className="meta__label">Year</span>
            <span className="meta__value">{project.year}</span>
          </div>
          <div>
            <span className="meta__label">Deliverables</span>
            <span className="meta__value">{project.deliverables}</span>
          </div>
        </div>

        <div className={styles.story}>
          <div>
            <h3 className={styles.storyTitle}>Brief</h3>
            <p className={styles.storyBody}>{project.brief}</p>
          </div>
          <div>
            <h3 className={styles.storyTitle}>Approach</h3>
            <p className={styles.storyBody}>{project.approach}</p>
          </div>
          <div>
            <h3 className={styles.storyTitle}>Result</h3>
            <p className={styles.storyBody}>{project.outcome}</p>
          </div>
        </div>

        <div className={styles.footer}>
          <Link href={`/work/${next.slug}`} className={styles.next}>
            <span className={styles.nextLabel}>Next project</span>
            <span className={styles.nextTitle}>{next.title} →</span>
          </Link>
          <Link href="/contact" className="btn btn--soft">
            Ask about a project like this
          </Link>
        </div>
      </div>
    </div>
  );
}
