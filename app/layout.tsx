import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { site } from '@/lib/site';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000');

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  icons: {
    icon: [{ url: '/bth_logo.ico' }, { url: '/bth_logo.png', type: 'image/png' }],
    apple: '/bth_logo.png',
  },
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: site.name,
    description: site.description,
    images: [{ url: '/reel-2024.jpg', width: 1280, height: 720, alt: '2024 demo reel' }],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#101012',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <div className="shell">
          <div className="ambient" aria-hidden="true">
            <div className="ambient__beamA" />
            <div className="ambient__beamB" />
            <div className="ambient__top" />
            <div className="ambient__vignette" />
          </div>
          <Header />
          <main className="shell__main">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
