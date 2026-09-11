import type { Metadata } from 'next';
import Link from 'next/link';

import styles from './services.module.css';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Editorial, branded content, and music and narrative production from Between The Heights Productions.',
};

export default function ServicesPage() {
  return (
    <div className="container page">
      <span className="eyebrow">Services</span>
      <h1 className="page__title">What we do</h1>
      <p className={`page__lede ${styles.lede}`}>
        Take on the whole production, or just the edit. Every project starts with a short call.
      </p>

      <div className={styles.grid}>
        <div className={styles.service}>
          <span className="rule" />
          <h3 className={styles.serviceTitle}>Editorial</h3>
          <p className={styles.serviceBody}>
            Editorial on your footage, from first assembly through to a finished master.
          </p>
        </div>

        <div className={`${styles.service} ${styles.serviceHighlight}`}>
          <span className={styles.badge}>Most requested</span>
          <h3 className={styles.serviceTitle}>Branded content</h3>
          <p className={styles.serviceBody}>
            Commercial spots, product films and listing videos, taken from the first idea through
            to delivery.
          </p>
        </div>

        <div className={styles.service}>
          <span className="rule" />
          <h3 className={styles.serviceTitle}>Music and narrative</h3>
          <p className={styles.serviceBody}>
            Directing and cutting music videos, short films and web series.
          </p>
        </div>
      </div>

      <div className={styles.footer}>
        <p className={styles.footerText}>
          Not sure which one fits? Describe the project and we will tell you how we would approach
          it.
        </p>
        <Link href="/contact" className="btn">
          Get in touch <span>→</span>
        </Link>
      </div>
    </div>
  );
}
