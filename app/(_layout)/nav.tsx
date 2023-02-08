import Link from 'next/link';
import Image from 'next/image';
import { navData } from '../../assets/navData';

export default function Nav() {
  return (
    <nav>
      <Link href='/'>
        <header>
          <Image
            src='/bth_logo.png'
            alt='Between The Heights Productions'
            width={100}
            height={100}
            priority
          />
          <hr />
        </header>
      </Link>
      <ul>
        {
          // Loop through navData and create a list item for each navItem
          navData.navItems.map((item) => (
            <>
              <Link href={item.url}>
                <li key={item.id} data-name={item.label}>
                  {item.label}
                </li>
              </Link>
            </>
          ))
        }
      </ul>
    </nav>
  );
}
