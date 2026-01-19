import { Heading, Paragraph, List } from '@/components/Primitives';
import { CodeBlock } from '@/components/CodeBlock/CodeBlock';
import type { PostMeta } from '@/types/post';

export const metadata: PostMeta = {
  title: 'Building the Navigator: A Route Search Tool',
  slug: 'navigator-feature',
  date: '2026-01-17T20:00:00Z',
  type: 'doc',
  author: 'Claude Sonnet 4.5',
  feature: 'Navigator',
  projectId: 'my-website-v3',
  description:
    'A complete walkthrough of the Navigator feature - a popover search tool for quickly finding and navigating to any route in the application.',
  topics: ['dev-docs', 'Features'],
  tags: ['search', 'routing', 'architecture', 'react', 'nextjs'],
};

const NavigatorFeatureDocs = () => {
  return (
    <article>      
      <Paragraph>
        The Navigator is a popover search tool that lets you quickly find and jump to any route in the application. 
        Think of it as a command palette for navigation - type to search, click to navigate.
      </Paragraph>

      <Heading level={2}>What It Does</Heading>
      
      <Paragraph>
        The Navigator provides instant search across all routes in your site:
      </Paragraph>
      
      <List>
        <li>Click the arrow icon in the navbar to open the Navigator popover</li>
        <li>Type to search across route titles, paths, descriptions, and keywords</li>
        <li>Click any result to navigate to that route</li>
        <li>Press Escape or click outside to close the popover</li>
      </List>

      <Paragraph>
        It automatically indexes all routes from your sitemap and enriches them with metadata from posts 
        (titles, descriptions, topics, and tags become searchable keywords).
      </Paragraph>

      <Heading level={2}>File Structure</Heading>

      <Paragraph>
        The Navigator feature consists of 4 files:
      </Paragraph>

      <List>
        <li><strong>src/lib/routes.ts</strong> - Server-side route indexing logic</li>
        <li><strong>src/components/Navigator.tsx</strong> - Client-side search UI component</li>
        <li><strong>src/components/NavBar.tsx</strong> - Integration point (trigger button + state management)</li>
        <li><strong>src/app/layout.tsx</strong> - Data fetching (calls getAllRoutes() and passes to NavBar)</li>
      </List>

      <Heading level={2}>Architecture Decisions</Heading>

      <Heading level={3}>Why Sitemap as Source of Truth?</Heading>

      <Paragraph>
        We use the sitemap as the single source of truth for routes because:
      </Paragraph>

      <List>
        <li>Sitemap already knows about all public routes (it's required for SEO)</li>
        <li>No duplication - we don't maintain a separate route registry</li>
        <li>Auto-scaling - new pages automatically show up in Navigator when they're added to sitemap</li>
        <li>Zero maintenance - as routes change, sitemap updates, Navigator reflects changes</li>
      </List>

      <Heading level={3}>Why Popover Instead of Modal?</Heading>

      <Paragraph>
        The Navigator uses a popover pattern (anchored to the trigger button) rather than a centered modal:
      </Paragraph>

      <List>
        <li>Feels more like a tool than an interruption</li>
        <li>Contextual - it's clearly associated with the navbar button</li>
        <li>Lighter weight - doesn't require a full-screen overlay</li>
        <li>Faster to dismiss - clicking anywhere outside closes it</li>
      </List>

      <Heading level={3}>Server vs Client Components</Heading>

      <Paragraph>
        We split data fetching and UI rendering between server and client:
      </Paragraph>

      <List>
        <li><strong>Server (layout.tsx)</strong> - Fetches routes once at build time or request time</li>
        <li><strong>Client (Navigator.tsx)</strong> - Handles search input, filtering, and user interactions</li>
        <li>This avoids client-side data fetching delays - routes are available immediately when popover opens</li>
      </List>

      <Heading level={2}>Code Walkthrough</Heading>

      <Heading level={3}>1. Route Indexing (src/lib/routes.ts)</Heading>

      <Paragraph>
        This file builds the searchable route index:
      </Paragraph>

      <CodeBlock language="typescript">{`export interface RouteEntry {
  path: string;
  title: string;
  description?: string;
  keywords?: string[];
}

export async function getAllRoutes(): Promise<RouteEntry[]> {
  // Get all routes from sitemap
  const sitemapEntries = await sitemap();
  const posts = await getAllPosts();
  
  const routes: RouteEntry[] = sitemapEntries.map((entry) => {
    const url = new URL(entry.url);
    const path = url.pathname === '/' ? '/' : url.pathname;
    
    // Enrich post routes with metadata
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
    
    // Handle other routes...
  });
  
  return routes;
}`}</CodeBlock>

      <Paragraph>
        <strong>Key concepts:</strong>
      </Paragraph>

      <List>
        <li>Fetches sitemap entries to get all public URLs</li>
        <li>Extracts path from each URL</li>
        <li>For post routes, finds matching post and enriches with title, description, and keywords</li>
        <li>Keywords include topics, tags, and slug - all searchable</li>
        <li>Returns array of RouteEntry objects with structured data</li>
      </List>

      <Heading level={3}>2. Search UI (src/components/Navigator.tsx)</Heading>

      <Paragraph>
        This component renders the popover and handles search:
      </Paragraph>

      <CodeBlock language="tsx">{`'use client';

export default function Navigator({ routes, onClose }: NavigatorProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRoutes = useMemo(() => {
    if (!searchQuery.trim()) return routes;

    const query = searchQuery.toLowerCase();
    return routes.filter((route) => {
      const titleMatch = route.title.toLowerCase().includes(query);
      const pathMatch = route.path.toLowerCase().includes(query);
      const descriptionMatch = route.description?.toLowerCase().includes(query);
      const keywordMatch = route.keywords?.some((keyword) =>
        keyword.toLowerCase().includes(query)
      );

      return titleMatch || pathMatch || descriptionMatch || keywordMatch;
    });
  }, [routes, searchQuery]);

  return (
    <div css={navigatorStyles}>
      <input
        type="text"
        placeholder="Search routes..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        autoFocus
      />
      <div css={resultsContainerStyles}>
        {filteredRoutes.map((route) => (
          <Link key={route.path} href={route.path} onClick={onClose}>
            <div>{route.title}</div>
            <div>{route.path}</div>
            {route.description && <div>{route.description}</div>}
          </Link>
        ))}
      </div>
    </div>
  );
}`}</CodeBlock>

      <Paragraph>
        <strong>Key concepts:</strong>
      </Paragraph>

      <List>
        <li><strong>'use client'</strong> - This is a Client Component (needs interactivity)</li>
        <li><strong>useState</strong> - Tracks search input value</li>
        <li><strong>useMemo</strong> - Optimizes filtering (only re-runs when routes or query changes)</li>
        <li><strong>Filter logic</strong> - Checks if query matches title, path, description, or any keyword</li>
        <li><strong>autoFocus</strong> - Input is focused when popover opens</li>
        <li><strong>onClose callback</strong> - Called when user clicks a route (closes popover)</li>
      </List>

      <Heading level={3}>3. Integration (src/components/NavBar.tsx)</Heading>

      <Paragraph>
        The NavBar manages Navigator state and trigger button:
      </Paragraph>

      <CodeBlock language="tsx">{`export default function NavBar({ routes }: NavBarProps) {
  const [isNavigatorOpen, setIsNavigatorOpen] = useState(false);
  const navigatorRef = useRef<HTMLDivElement>(null);

  // Close on click outside or Escape key
  useEffect(() => {
    if (!isNavigatorOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (navigatorRef.current && !navigatorRef.current.contains(event.target as Node)) {
        setIsNavigatorOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsNavigatorOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isNavigatorOpen]);

  return (
    <nav>
      {/* Title and particles... */}
      
      <div ref={navigatorRef}>
        <button onClick={() => setIsNavigatorOpen(!isNavigatorOpen)}>
          <svg>{/* Arrow icon */}</svg>
        </button>
        {isNavigatorOpen && (
          <Navigator routes={routes} onClose={() => setIsNavigatorOpen(false)} />
        )}
      </div>
    </nav>
  );
}`}</CodeBlock>

      <Paragraph>
        <strong>Key concepts:</strong>
      </Paragraph>

      <List>
        <li><strong>navigatorRef</strong> - Used to detect clicks outside the Navigator</li>
        <li><strong>useEffect cleanup</strong> - Event listeners are removed when popover closes</li>
        <li><strong>Click outside detection</strong> - Checks if click target is inside navigatorRef</li>
        <li><strong>Escape key handling</strong> - Standard pattern for dismissible overlays</li>
        <li><strong>Conditional render</strong> - Navigator only mounts when isNavigatorOpen is true</li>
      </List>

      <Heading level={3}>4. Data Fetching (src/app/layout.tsx)</Heading>

      <Paragraph>
        The root layout fetches routes and passes them down:
      </Paragraph>

      <CodeBlock language="tsx">{`import { getAllRoutes } from '@/lib/routes';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const routes = await getAllRoutes();
  
  return (
    <html>
      <body>
        <EmotionProvider>
          <NavBar routes={routes} />
          {children}
        </EmotionProvider>
      </body>
    </html>
  );
}`}</CodeBlock>

      <Paragraph>
        <strong>Key concepts:</strong>
      </Paragraph>

      <List>
        <li><strong>async function</strong> - Layout is now a Server Component that can fetch data</li>
        <li><strong>await getAllRoutes()</strong> - Fetches routes at build time or request time</li>
        <li><strong>Props drilling</strong> - Routes passed to NavBar which passes to Navigator</li>
        <li>This ensures routes are available immediately (no loading state needed in Navigator)</li>
      </List>

      <Heading level={2}>Styling Approach</Heading>

      <Paragraph>
        All styles use Emotion CSS objects (not template literals):
      </Paragraph>

      <CodeBlock language="typescript">{`const navigatorStyles = css({
  position: 'absolute',
  top: 'calc(100% + 8px)',
  right: 0,
  width: '400px',
  maxHeight: '500px',
  backgroundColor: 'rgba(20, 20, 30, 0.95)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '12px',
  // ...
});`}</CodeBlock>

      <Paragraph>
        <strong>Why CSS objects?</strong>
      </Paragraph>

      <List>
        <li>Type-safe - TypeScript validates CSS properties</li>
        <li>Composable - Objects can be merged programmatically</li>
        <li>AI-friendly - Structured data easier to generate/modify than strings</li>
        <li>No string escaping - Values are JavaScript, not template strings</li>
      </List>

      <Heading level={2}>Future Enhancements</Heading>

      <Paragraph>
        Potential improvements for the Navigator:
      </Paragraph>

      <List>
        <li><strong>Fuzzy search</strong> - Use a library like Fuse.js for better matching (typo tolerance)</li>
        <li><strong>Keyboard navigation</strong> - Arrow keys to select results, Enter to navigate</li>
        <li><strong>Recent/frequent routes</strong> - Track usage and show popular routes first</li>
        <li><strong>Keyboard shortcut</strong> - Cmd+K to open Navigator from anywhere</li>
        <li><strong>Search highlighting</strong> - Highlight matching text in results</li>
        <li><strong>Route categories</strong> - Group results by type (posts, pages, docs)</li>
      </List>

      <Heading level={2}>Testing the Navigator</Heading>

      <Paragraph>
        To test the Navigator feature:
      </Paragraph>

      <List>
        <li>Click the arrow icon in the navbar (top-right corner)</li>
        <li>Popover should open with search input focused</li>
        <li>All routes should be visible initially</li>
        <li>Type a query - results should filter in real-time</li>
        <li>Search works across titles, paths, descriptions, and keywords</li>
        <li>Click a result - should navigate to that route and close popover</li>
        <li>Press Escape - should close popover</li>
        <li>Click outside - should close popover</li>
      </List>

      <Heading level={2}>Common Patterns</Heading>

      <Paragraph>
        This feature demonstrates several important React patterns:
      </Paragraph>

      <List>
        <li><strong>Server/Client split</strong> - Data fetching server-side, interaction client-side</li>
        <li><strong>useMemo optimization</strong> - Prevent expensive filtering on every render</li>
        <li><strong>useRef for DOM access</strong> - Detect clicks outside an element</li>
        <li><strong>useEffect cleanup</strong> - Remove event listeners to prevent memory leaks</li>
        <li><strong>Conditional rendering</strong> - Only mount components when needed</li>
        <li><strong>Callback props</strong> - Child component (Navigator) triggers parent state change (close popover)</li>
        <li><strong>Type safety</strong> - RouteEntry interface ensures data structure consistency</li>
      </List>

      <Heading level={2}>Summary</Heading>

      <Paragraph>
        The Navigator is a practical feature that shows how to build a search tool with:
      </Paragraph>

      <List>
        <li>Automatic route indexing from sitemap (zero maintenance)</li>
        <li>Metadata enrichment from posts (searchable descriptions and keywords)</li>
        <li>Real-time filtering with React hooks (useMemo for performance)</li>
        <li>Proper UX patterns (click outside, Escape to close, autofocus)</li>
        <li>Server/Client separation (data fetching vs interactivity)</li>
        <li>Type-safe structured data (TypeScript + Emotion CSS objects)</li>
      </List>

      <Paragraph>
        The code is clean, maintainable, and follows Next.js best practices. It scales automatically as new routes 
        are added to the site.
      </Paragraph>
    </article>
  );
};

export default NavigatorFeatureDocs;
