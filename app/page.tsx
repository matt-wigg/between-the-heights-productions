import Link from 'next/link';

import HeroMedia from '@/components/HeroMedia';
import ProjectCard from '@/components/ProjectCard';
import { featuredSlugs, getProject, reel } from '@/lib/projects';
import styles from './home.module.css';

const disciplines = ['Editing', 'Directing', 'Videography', 'Colour and finish'];

const process = [
  {
    title: 'Brief and treatment',
    body: 'A clear plan agreed before the shoot, so the edit is decided in advance rather than discovered later.',
  },
  {
    title: 'Production',
    body: 'Shooting with the right people for the job, at whatever size the project calls for.',
  },
  {
    title: 'Post and delivery',
    body: 'Finished and delivered in the formats you need, ready to publish.',
  },
];

export default function Home() {
  const featured = featuredSlugs
    .map((slug) => getProject(slug))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);

  return (
    <div className={styles.page}>
      {/* Hero ----------------------------------------------------------- */}
      <section className={styles.hero}>
        <HeroMedia />
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.kicker}>
            <span className="rule" />
            <span className={styles.kickerText}>Production company, Southern California</span>
          </div>
          <h1 className={styles.heroTitle}>
            A production company for brands, labels and independent film.
          </h1>
          <p className={styles.heroLede}>
            Led by editor and director Daniel DuVall, working from the brief through to the
            finished master. Brand spots, music videos, listing films and narrative work.
          </p>
          <div className={styles.heroActions}>
            <Link href={`/work/${reel.slug}`} className="btn btn--hero">
              Watch the 2024 reel<span className="btn__icon">▶</span>
            </Link>
            <Link href="/work" className="btn btn--ghost">
              Selected work
            </Link>
          </div>
        </div>
      </section>

      {/* Disciplines ---------------------------------------------------- */}
      <section className={styles.band}>
        <div className={`container ${styles.disciplines}`}>
          <span className={styles.disciplinesLabel}>Disciplines</span>
          {disciplines.map((d) => (
            <span key={d} className={styles.discipline}>
              {d}
            </span>
          ))}
        </div>
      </section>

      {/* Selected work -------------------------------------------------- */}
      <section className={`container ${styles.work}`}>
        <div className={styles.workHead}>
          <div>
            <span className="eyebrow">Selected work</span>
            <h2 className={styles.workTitle}>Recent projects</h2>
          </div>
          <Link href="/work" className="link">
            All projects <span>→</span>
          </Link>
        </div>
        <div className="grid">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      {/* How we work ---------------------------------------------------- */}
      <section className={`${styles.band} ${styles.bandBordered}`}>
        <div className={`container ${styles.process}`}>
          <div className={styles.processIntro}>
            <span className="eyebrow">How we work</span>
            <h2 className={styles.processTitle}>
              One team from the first conversation to the final master.
            </h2>
          </div>
          <div className={styles.processSteps}>
            {process.map((step) => (
              <div key={step.title} className={styles.step}>
                <h4 className={styles.stepTitle}>{step.title}</h4>
                <p className={styles.stepBody}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA ------------------------------------------------------------ */}
      <section className={styles.cta}>
        <div className={styles.ctaGlow} aria-hidden="true" />
        <div className={styles.ctaLine} aria-hidden="true" />
        <div className={`container ${styles.ctaInner}`}>
          <div>
            <h2 className={styles.ctaTitle}>Have a project in mind?</h2>
            <p className={styles.ctaBody}>
              Tell us what you have in mind and we will tell you what is possible.
            </p>
          </div>
          <Link href="/contact" className={`btn ${styles.ctaButton}`}>
            Start a project <span>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
