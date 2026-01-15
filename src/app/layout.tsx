import type { ReactNode } from 'react';
import { ThemeProviders } from '../theme/theme';
import { GlobalStyles } from '../styles/GlobalStyles';

export const metadata = {
  // Site title (shows in browser tab and search results)
  title: "Jay Griffin",
  
  // Meta description (shows in search results under title)
  description: "Software development by Jay",
  
  // Keywords for SEO
  keywords: ["blog", "programming", "web development", "design"],
  
  // Author info
  authors: [{ name: "Jay" }],
  
  // Favicon
  icons: {
    icon: '/favicon.svg',
  },
  
  // Tell search engines to index this site
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProviders>
          <GlobalStyles />
          {children}
        </ThemeProviders>
      </body>
    </html>
  );
}
