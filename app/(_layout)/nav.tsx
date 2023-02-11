import Link from 'next/link';
import Image from 'next/image';
import { navData } from '../../assets/navData';

import logo from '../../public/bth_logo.png';

export default function Nav() {
  return (
    <nav>
      <Link href='/'>
        <header>
          <Image
            src={logo}
            alt='Between The Heights Productions'
            width={145}
            height={145}
            priority
          />
        </header>
      </Link>
      <ul>
        {
          // Loop through navData and create a list item for each navItem
          navData.navItems.map((item) => (
            <>
              <Link key={item.label} href={item.url}>
                <li data-name={item.label}>{item.label}</li>
              </Link>
            </>
          ))
        }
      </ul>
    </nav>
  );
}
