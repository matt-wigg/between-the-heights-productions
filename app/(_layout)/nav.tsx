import Link from 'next/link';
import { navData } from '../../assets/navData';

export default function Nav() {
  return (
    <nav>
      <header>
        <a href='/'>BTH</a>
      </header>
      <ul>
        {
          // Loop through navData and create a list item for each navItem
          navData.navItems.map((item) => (
            <li key={item.id} data-name={item.label}>
              <Link href={item.url}>{item.label}</Link>
            </li>
          ))
        }
      </ul>
    </nav>
  );
}
