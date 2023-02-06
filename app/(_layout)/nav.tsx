import Link from 'next/link';
import { navData } from '../../assets/navData';

export default function Nav() {
  return (
    <nav>
      <header>
        BTH 🎬
        <hr />
      </header>

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
