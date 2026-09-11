import Image from 'next/image';
import Link from 'next/link';

import logo from '@/public/bth_logo.png';
import { navItems, site } from '@/lib/site';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div>
          <div className={styles.brand}>
            <Image src={logo} alt="" width={32} height={32} className={styles.logo} />
            <span className={styles.brandName}>{site.name}</span>
          </div>
          <p className={styles.tagline}>{site.tagline}</p>
        </div>

        <div className={styles.col}>
          <span className={styles.heading}>Site</span>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={styles.link}>
              {item.label}
            </Link>
          ))}
          <Link href="/contact" className={styles.link}>
            Contact
          </Link>
        </div>

        <div className={styles.col}>
          <span className={styles.heading}>Elsewhere</span>
          <a href={site.social.vimeo} rel="noopener noreferrer" target="_blank" className={styles.link}>
            Vimeo ↗
          </a>
          <a href={site.social.youtube} rel="noopener noreferrer" target="_blank" className={styles.link}>
            YouTube ↗
          </a>
          <a href={site.social.linkedin} rel="noopener noreferrer" target="_blank" className={styles.link}>
            LinkedIn ↗
          </a>
        </div>

        <div className={styles.col}>
          <span className={styles.heading}>Contact</span>
          <a href={`mailto:${site.email}`} className={styles.link}>
            {site.email}
          </a>
          <a href={site.phoneHref} className={styles.link}>
            {site.phoneDisplay}
          </a>
          <span className={styles.copyright}>
            © {year} {site.owner}
          </span>
        </div>
      </div>
    </footer>
  );
}
