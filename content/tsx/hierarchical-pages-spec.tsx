import { Heading, Paragraph, List, ListItem, Code } from '@/components/Primitives';
import { CodeBlock } from '@/components/CodeBlock/CodeBlock';
import type { PostMeta } from '@/types/post';

export const metadata: PostMeta = {
  title: 'Hierarchical Pages Feature Spec',
  slug: 'hierarchical-pages-spec',
  date: '2026-01-21T00:00:00Z',
  author: ['Claude Sonnet 4.5', 'Jay Griffin'],
  type: 'doc',
  projectId: 'jaygriff',
  description: 'Technical specification for parent-child page relationships with automatic routing and dev-mode creation.',
  tags: ['feature-spec', 'routing', 'content-system'],
};

const HierarchicalPagesSpec = () => {
  return (
    <>
      <Heading level={2}>Problem Statement</Heading>
      <Paragraph>
        Large documents (like the roadmap) become walls of text. Need to break them into linked sub-pages without:
      </Paragraph>
      <List>
        <ListItem>Manually creating routes</ListItem>
        <ListItem>Copy-pasting sorting/filtering logic</ListItem>
        <ListItem>Managing nested URL structures</ListItem>
        <ListItem>Breaking links when re-organizing</ListItem>
      </List>

      <Heading level={2}>Solution: Notion-Style Flat Routing</Heading>
      <Paragraph>
        Parent-child relationships exist in metadata only. URLs remain flat. A child page under "Roadmap" lives at 
        <Code>/docs/search-feature-spec</Code>, not <Code>/docs/roadmap/search-feature-spec</Code>. The hierarchy is shown through 
        breadcrumbs and automatic child listings.
      </Paragraph>

      <Heading level={2}>Data Model</Heading>
      <Heading level={3}>PostMeta Extension</Heading>
      <CodeBlock language="typescript" filename="src/types/post.ts">
{`export interface PostMeta {
  title: string;
  slug: string;
  date: string;
  author: string[];
  type: 'post' | 'doc' | 'commit';
  projectId: string;
  description?: string;
  tags?: string[];
  authorshipNote?: string;
  commitHash?: string;
  parentSlug?: string; // NEW: Optional parent page slug
}`}
      </CodeBlock>

      <Heading level={3}>Example Usage</Heading>
      <CodeBlock language="typescript">
{`// Child page metadata
export const metadata: PostMeta = {
  title: 'Search Feature Deep Dive',
  slug: 'search-feature-spec',
  parentSlug: 'roadmap', // References parent
  date: '2026-01-21T00:00:00Z',
  type: 'doc',
  // ... other fields
};`}
      </CodeBlock>

      <Heading level={2}>Core Features</Heading>

      <Heading level={3}>1. Parent Page Auto-Listing</Heading>
      <Paragraph>
        Parent pages automatically show their children. Create a reusable component:
      </Paragraph>
      <CodeBlock language="typescript" filename="src/components/ChildPages.tsx">
{`export async function ChildPages({ parentSlug }: { parentSlug: string }) {
  const allPages = await getAllDocs();
  const children = allPages
    .filter(page => page.metadata.parentSlug === parentSlug)
    .sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime());
  
  if (children.length === 0) return null;
  
  return (
    <>
      <Heading level={3}>Pages in this section</Heading>
      <List>
        {children.map(page => (
          <ListItem key={page.slug}>
            <Link href={\`/docs/\${page.slug}\`}>
              {page.metadata.title}
            </Link>
            {' - '}
            {formatDate(page.metadata.date)}
          </ListItem>
        ))}
      </List>
    </>
  );
}`}
      </CodeBlock>

      <Paragraph>Usage in parent page:</Paragraph>
      <CodeBlock language="typescript" filename="content/tsx/roadmap.tsx">
{`const RoadmapDoc = () => {
  return (
    <>
      <Heading level={2}>Roadmap Overview</Heading>
      <Paragraph>Main roadmap content...</Paragraph>
      
      <ChildPages parentSlug="roadmap" />
    </>
  );
};`}
      </CodeBlock>

      <Heading level={3}>2. Breadcrumb Navigation</Heading>
      <Paragraph>
        Child pages show breadcrumb trail. Add to ContentHeader component:
      </Paragraph>
      <CodeBlock language="typescript" filename="src/components/Breadcrumbs.tsx">
{`export async function Breadcrumbs({ currentPage }: { currentPage: PostMeta }) {
  if (!currentPage.parentSlug) return null;
  
  const parent = await getDocBySlug(currentPage.parentSlug);
  if (!parent) return null;
  
  return (
    <nav>
      <Link href={\`/docs/\${parent.metadata.slug}\`}>
        {parent.metadata.title}
      </Link>
      {' / '}
      <span>{currentPage.title}</span>
    </nav>
  );
}`}
      </CodeBlock>

      <Heading level={3}>3. Dev Mode Page Creation</Heading>
      <Paragraph>
        Click "New Child Page" button in dev mode on any page. Modal workflow:
      </Paragraph>
      <List>
        <ListItem>User enters page title</ListItem>
        <ListItem>Generate slug from title (kebab-case)</ListItem>
        <ListItem>Create new .tsx file in content/tsx/</ListItem>
        <ListItem>Set parentSlug to current page's slug</ListItem>
        <ListItem>Auto-populate metadata</ListItem>
        <ListItem>Navigate to new page or refresh</ListItem>
      </List>

      <CodeBlock language="typescript" filename="src/app/api/create-page/route.ts">
{`export async function POST(request: Request) {
  if (process.env.NODE_ENV !== 'development') {
    return Response.json({ error: 'Not available in production' }, { status: 403 });
  }
  
  const { title, parentSlug } = await request.json();
  const slug = kebabCase(title);
  const timestamp = new Date().toISOString();
  
  const fileContent = \\\`
import { Heading, Paragraph } from '@/components/Primitives';
import type { PostMeta } from '@/types/post';

export const metadata: PostMeta = {
  title: '\\\${title}',
  slug: '\\\${slug}',
  parentSlug: '\\\${parentSlug}',
  date: '\\\${timestamp}',
  author: ['Jay Griffin'],
  type: 'doc',
  projectId: 'jaygriff',
  description: '',
  tags: [],
};

const \\\${pascalCase(slug)} = () => {
  return (
    <>
      <Heading level={2}>Overview</Heading>
      <Paragraph>Start writing...</Paragraph>
    </>
  );
};

export default \\\${pascalCase(slug)};
\\\`;

  await fs.writeFile(
    path.join(process.cwd(), 'content/tsx', \\\`\\\${slug}.tsx\\\`),
    fileContent
  );
  
  return Response.json({ success: true, slug });
}`}
      </CodeBlock>

      <Heading level={2}>Implementation Phases</Heading>

      <Heading level={3}>Phase 1: Data Model (No UI Changes)</Heading>
      <List>
        <ListItem>Add parentSlug to PostMeta type</ListItem>
        <ListItem>Add parentSlug to this spec doc as test</ListItem>
        <ListItem>Verify existing pages still work</ListItem>
      </List>

      <Heading level={3}>Phase 2: Reading Features</Heading>
      <List>
        <ListItem>Create ChildPages component</ListItem>
        <ListItem>Create Breadcrumbs component</ListItem>
        <ListItem>Add to ContentHeader</ListItem>
        <ListItem>Test by manually adding parentSlug to a few docs</ListItem>
      </List>

      <Heading level={3}>Phase 3: Writing Features (Dev Mode)</Heading>
      <List>
        <ListItem>Create /api/create-page endpoint</ListItem>
        <ListItem>Add "New Child Page" button to ContentHeader (dev only)</ListItem>
        <ListItem>Build page creation modal</ListItem>
        <ListItem>Test creating child pages</ListItem>
      </List>

      <Heading level={3}>Phase 4: Enhanced Features</Heading>
      <List>
        <ListItem>Page move/re-parent capability</ListItem>
        <ListItem>Bulk operations (move all children)</ListItem>
        <ListItem>Page deletion (dev mode)</ListItem>
        <ListItem>Sibling navigation (next/prev)</ListItem>
      </List>

      <Heading level={2}>Edge Cases</Heading>
      <List>
        <ListItem><strong>Orphaned pages:</strong> Parent deleted but children still reference it. Show warning in dev mode.</ListItem>
        <ListItem><strong>Circular references:</strong> Page A → Page B → Page A. Detect and prevent.</ListItem>
        <ListItem><strong>Deep nesting:</strong> No limit, but breadcrumbs might get long. Consider showing only last 2-3 levels.</ListItem>
        <ListItem><strong>Slug collisions:</strong> Check if slug exists before creating. Auto-append number if needed.</ListItem>
      </List>

      <Heading level={2}>Open Questions</Heading>
      <List>
        <ListItem>Should Navigator component show hierarchy? (indented child pages under parents)</ListItem>
        <ListItem>Max nesting depth limit? (Notion allows infinite, but UX suffers)</ListItem>
        <ListItem>Sort order for children: by date, manual order, alphabetical?</ListItem>
        <ListItem>Allow pages to have multiple parents? (tags vs hierarchy)</ListItem>
      </List>

      <Heading level={2}>Success Metrics</Heading>
      <List>
        <ListItem>Zero manual route files needed for new pages</ListItem>
        <ListItem>Can create and link child page in under 10 seconds</ListItem>
        <ListItem>Roadmap broken into 5+ child specs</ListItem>
        <ListItem>All hierarchy visible through breadcrumbs + child listings</ListItem>
      </List>
    </>
  );
};

export default HierarchicalPagesSpec;
