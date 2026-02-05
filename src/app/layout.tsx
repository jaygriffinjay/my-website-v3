import type { ReactNode } from 'react';
import { ThemeProviders } from '../theme/theme';
import { GlobalStyles } from '../styles/GlobalStyles';
import NavBar from '../components/NavBar';
import { getAllRoutes } from '@/lib/routes';
import { Analytics } from '@vercel/analytics/next';
import { Sekuya } from 'next/font/google';

const sekuya = Sekuya({ subsets: ['latin'], weight: ['400'], adjustFontFallback: false, variable: '--font-sekuya' });

export const metadata = {
  // Site title (shows in browser tab and search results)
  title: "Jay Griffin",
  
  // Meta description (shows in search results under title)
  description: "Software development by Jay Griffin",
  
  // Keywords for SEO
  keywords: ["blog", "programming", "web development", "design"],
  
  // Author info
  authors: [{ name: "Jay Griffin" }],
  
  // Favicon
  icons: {
    icon: '/favicon.svg',
  },
  
  // Tell search engines to index this site
  robots: "index, follow",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const routes = await getAllRoutes();
  
  return (
    <html lang="en" className={sekuya.variable}>
      <body>
        <ThemeProviders>
          <GlobalStyles />
          <NavBar routes={routes} />
          {children}
          <Analytics />
        </ThemeProviders>
      </body>
    </html>
  );
}
