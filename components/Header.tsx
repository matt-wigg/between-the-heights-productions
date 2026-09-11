'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import logo from '@/public/bth_logo.png';
import { navItems, site } from '@/lib/site';
import styles from './Header.module.css';

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const pathname = usePathname() ?? '/';

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand} aria-label={`${site.name} home`}>
          <Image src={logo} alt="" width={40} height={40} className={styles.logo} priority />
          <span className={styles.brandText}>
            <span className={styles.brandName}>{site.shortName}</span>
            <span className={styles.brandSub}>Productions</span>
          </span>
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={styles.navLink}
                aria-current={active ? 'page' : undefined}
              >
                {item.label}
                {active && <span className={styles.navIndicator} aria-hidden="true" />}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className={styles.cta}
            aria-current={isActive(pathname, '/contact') ? 'page' : undefined}
          >
            Start a project
          </Link>
        </nav>
      </div>
    </header>
  );
}
