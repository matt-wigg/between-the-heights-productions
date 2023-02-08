import './(_layout)/globals.css';
import styles from './(_layout)/layout.module.css';

import Nav from './(_layout)/nav';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head />
      <body>
        <div className={styles.container}>
          <main className={styles.main}>
            <Nav />
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
``;
