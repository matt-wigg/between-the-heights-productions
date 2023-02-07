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
        <Nav />
        <div className={styles.container}>
          <main className={styles.main}>{children}</main>
        </div>
        <video autoPlay muted loop id='bth-home-reel'>
          <source
            src='https://static.videezy.com/system/resources/previews/000/044/479/original/banana.mp4'
            type='video/mp4'
          />
        </video>
      </body>
    </html>
  );
}
``;
