import type { Metadata } from 'next';
import Image from 'next/image';

import portrait from '@/public/dan_photo.jpg';
import { site } from '@/lib/site';
import styles from './studio.module.css';

export const metadata: Metadata = {
  title: 'Studio',
  description:
    'Between The Heights Productions is a Southern California production company led by editor and director Daniel DuVall.',
};

const socialLinks = [
  { label: 'LinkedIn', href: site.social.linkedin },
  { label: 'YouTube', href: site.social.youtube },
  { label: 'Vimeo', href: site.social.vimeo },
];

export default function StudioPage() {
  return (
    <div className="container page">
      <div className={styles.grid}>
        <div>
          <span className="eyebrow">Studio</span>
          <h1 className={styles.title}>{site.name}</h1>
          <p className={styles.lead}>
            Between The Heights Productions is a Southern California production company working
            across commercial films, music videos, web series and independent narrative.
          </p>
          <p className={styles.body}>
            It is led by Daniel DuVall, an editor and director who holds a Bachelor of Science in
            Digital Filmmaking and Video Production from the Art Institute of Pittsburgh. His
            music video for “Uptown Party” by The Faintest Glow was featured by Music From the
            412 in Pittsburgh, PA.
          </p>
          <p className={`${styles.body} ${styles.bodyLast}`}>
            The studio takes on work at whatever scale it calls for, whether that means carrying a
            production from the first idea to delivery, or stepping in to finish an edit already
            underway.
          </p>

          <div className={`meta ${styles.facts}`}>
            <div>
              <span className="meta__label">Based in</span>
              <span className="meta__value">Southern California</span>
            </div>
            <div>
              <span className="meta__label">Founded by</span>
              <span className="meta__value">Daniel DuVall, editor and director</span>
            </div>
            <div>
              <span className="meta__label">Working since</span>
              <span className="meta__value">2019</span>
            </div>
          </div>

          <div className={styles.social}>
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                rel="noopener noreferrer"
                target="_blank"
                className="btn btn--pill"
              >
                {link.label} <span className="btn__arrow">↗</span>
              </a>
            ))}
          </div>
        </div>

        <div className={styles.portraitColumn}>
          <div className={styles.portrait}>
            <Image
              src={portrait}
              alt="Daniel DuVall"
              fill
              sizes="(max-width: 720px) 100vw, 40vw"
              placeholder="blur"
              className={styles.portraitImg}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
