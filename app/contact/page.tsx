import type { Metadata } from 'next';

import ContactForm from '@/components/ContactForm';
import { site } from '@/lib/site';
import styles from './contact.module.css';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Start a project with Between The Heights Productions.',
};

export default function ContactPage() {
  return (
    <div className="container page">
      <div className={styles.grid}>
        <div>
          <span className="eyebrow">Contact</span>
          <h1 className={styles.title}>Start a project</h1>
          <p className={styles.lede}>
            Tell us about the project and we will come back to you quickly.
          </p>
          <div className={styles.details}>
            <div>
              <span className="meta__label">Email</span>
              <a href={`mailto:${site.email}`} className={styles.detailLink}>
                {site.email}
              </a>
            </div>
            <div>
              <span className="meta__label">Phone</span>
              <a href={site.phoneHref} className={styles.detailLink}>
                {site.phoneDisplay}
              </a>
            </div>
            <div>
              <span className="meta__label">Availability</span>
              <span className="meta__value">Taking bookings now</span>
            </div>
          </div>
        </div>

        <div className={styles.formCard}>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
