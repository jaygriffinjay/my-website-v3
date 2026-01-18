// Server-side utility to build a cached index of all routes
import sitemap from '@/app/sitemap';
import { getAllPosts, getAllDocs } from './posts';

export interface RouteEntry {
  path: string;
  title: string;
  description?: string;
  keywords?: string[];
}

export async function getAllRoutes(): Promise<RouteEntry[]> {
  const sitemapEntries = await sitemap();
  const posts = await getAllPosts();
  const docs = await getAllDocs();
  
  const routes: RouteEntry[] = sitemapEntries.map((entry) => {
    const url = new URL(entry.url);
    const path = url.pathname === '/' ? '/' : url.pathname;
    
    // Find matching post data for post routes
    if (path.startsWith('/posts/')) {
      const slug = path.replace('/posts/', '');
      const post = posts.find(p => p.metadata.slug === slug);
      
      if (post) {
        return {
          path,
          title: post.metadata.title,
          description: post.metadata.description,
          keywords: [
            ...(post.metadata.topics || []),
            ...(post.metadata.tags || []),
            post.metadata.slug,
          ],
        };
      }
    }
    
    // Find matching doc data for doc routes
    if (path.startsWith('/docs/')) {
      const slug = path.replace('/docs/', '');
      const doc = docs.find(d => d.metadata.slug === slug);
      
      if (doc) {
        return {
          path,
          title: doc.metadata.title,
          description: doc.metadata.description,
          keywords: [
            ...(doc.metadata.topics || []),
            ...(doc.metadata.tags || []),
            doc.metadata.slug,
          ],
        };
      }
    }
    
    // Homepage
    if (path === '/') {
      return {
        path: '/',
        title: 'Home',
        keywords: ['home', 'index'],
      };
    }
    
    // Fallback for any other routes
    return {
      path,
      title: path.split('/').filter(Boolean).pop() || 'Page',
      keywords: path.split('/').filter(Boolean),
    };
  });
  
  // Add sitemap.xml route (not in sitemap itself)
  routes.push({
    path: '/sitemap.xml',
    title: 'Sitemap',
    description: 'XML sitemap',
    keywords: ['sitemap', 'xml', 'seo'],
  });

  return routes;
}
