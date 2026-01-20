import { Heading, Paragraph, List } from '@/components/Primitives';
import { CodeBlock } from '@/components/CodeBlock/CodeBlock';
import type { PostMeta } from '@/types/post';

export const metadata: PostMeta = {
  title: 'Separating Docs from Posts: Routing Architecture',
  slug: 'docs-routing',
  date: '2026-01-17T21:00:00Z',
  type: 'doc',
  author: 'Claude Sonnet 4.5',
  feature: 'Navigator',
  projectId: 'jaygriff',
  description:
    'How documentation pages are separated from blog posts using type-based routing, allowing docs to live at /docs/ while posts stay at /posts/.',
  topics: ['dev-docs', 'Architecture'],
  tags: ['routing', 'nextjs', 'architecture'],
};

const DocsRoutingArchitecture = () => {
  return (
    <article>      
      <Paragraph>
        This site serves two types of content: blog posts and technical documentation. While they share 
        the same file structure in the codebase (both live in <code>src/posts/</code>), they need 
        different URL paths: posts at <code>/posts/</code> and docs at <code>/docs/</code>.
      </Paragraph>

      <Heading level={2}>The Problem</Heading>
      
      <Paragraph>
        Originally, all content was served from <code>/posts/</code> regardless of whether it was 
        a blog post or technical documentation. This was confusing because:
      </Paragraph>

      <List>
        <li>Documentation isn't really a "post" - it's reference material</li>
        <li>URLs like <code>/posts/navigator-feature</code> suggested blog content when it was actually dev docs</li>
        <li>No clear separation between narrative blog posts and technical documentation</li>
      </List>

      <Heading level={2}>The Solution</Heading>
      
      <Paragraph>
        We added a <code>type</code> field to the <code>PostMeta</code> interface that allows each 
        file to declare whether it's a post or a doc:
      </Paragraph>

      <CodeBlock language="typescript">{`export interface PostMeta {
  title: string;
  slug: string;
  date: string;
  description: string;
  type?: 'post' | 'doc'; // Default is 'post'
  // ...other fields
}`}</CodeBlock>

      <Paragraph>
        Files with <code>type: 'doc'</code> are routed to <code>/docs/[slug]</code>, while 
        files without a type (or with <code>type: 'post'</code>) continue to be served 
        at <code>/posts/[slug]</code>.
      </Paragraph>

      <Heading level={2}>Implementation Details</Heading>

      <Heading level={3}>1. Type Field in Metadata</Heading>
      
      <Paragraph>
        Each content file declares its type in the metadata export:
      </Paragraph>

      <CodeBlock language="typescript">{`// This is a doc
export const metadata: PostMeta = {
  title: 'Building the Navigator',
  slug: 'navigator-feature',
  type: 'doc', // Routes to /docs/navigator-feature
  // ...
};

// This is a post (type omitted, defaults to 'post')
export const metadata: PostMeta = {
  title: 'Why Posts Are Programs',
  slug: 'programs-not-documents',
  // Routes to /posts/programs-not-documents
  // ...
};`}</CodeBlock>

      <Heading level={3}>2. Separate Route Handlers</Heading>
      
      <Paragraph>
        Two parallel route structures exist:
      </Paragraph>

      <List>
        <li><code>src/app/posts/[slug]/page.tsx</code> - Renders posts</li>
        <li><code>src/app/docs/[slug]/page.tsx</code> - Renders docs</li>
        <li><code>src/app/api/posts/[slug]/route.ts</code> - API for post lookups</li>
        <li><code>src/app/api/docs/[slug]/route.ts</code> - API for doc lookups</li>
      </List>

      <Paragraph>
        Both route handlers work identically - they load the TSX file from <code>src/posts/</code> 
        and render it. The only difference is which files they filter for.
      </Paragraph>

      <Heading level={3}>3. Filtering Logic in posts.ts</Heading>
      
      <Paragraph>
        The <code>getAllPosts()</code> and <code>getAllDocs()</code> functions filter based on type:
      </Paragraph>

      <CodeBlock language="typescript">{`export async function getAllPosts(): Promise<Post[]> {
  // Load all .tsx files from src/posts/
  const allContent = await loadAllContentFiles();
  
  // Filter to only return actual posts (not docs)
  return allContent.filter((p) => p.metadata.type !== 'doc');
}

export async function getAllDocs(): Promise<Post[]> {
  // Load all .tsx files from src/posts/
  const allContent = await loadAllContentFiles();
  
  // Filter to only return docs
  return allContent.filter((d) => d.metadata.type === 'doc');
}`}</CodeBlock>

      <Heading level={3}>4. Sitemap Generation</Heading>
      
      <Paragraph>
        The sitemap generates URLs based on type:
      </Paragraph>

      <CodeBlock language="typescript">{`const posts = await getAllPosts();
const docs = await getAllDocs();

const postUrls = posts.map((post) => ({
  url: \`\${baseUrl}/posts/\${post.metadata.slug}\`,
  lastModified: post.metadata.updated ?? post.metadata.date,
}));

const docUrls = docs.map((doc) => ({
  url: \`\${baseUrl}/docs/\${doc.metadata.slug}\`,
  lastModified: doc.metadata.updated ?? doc.metadata.date,
}));`}</CodeBlock>

      <Heading level={3}>5. Navigator Search Integration</Heading>
      
      <Paragraph>
        The Navigator automatically picks up both posts and docs from the sitemap. 
        Routes at <code>/posts/</code> and <code>/docs/</code> are treated the same 
        in the search interface - users just see titles and descriptions.
      </Paragraph>

      <Heading level={2}>Why This Approach?</Heading>
      
      <Paragraph>
        This design keeps all content files in one directory (<code>src/posts/</code>) while 
        allowing different URL routing. Benefits:
      </Paragraph>

      <List>
        <li><strong>Single source of truth</strong> - All content lives in one place</li>
        <li><strong>Same authoring experience</strong> - Posts and docs use identical components</li>
        <li><strong>Flexible routing</strong> - URLs reflect content type without moving files</li>
        <li><strong>No duplication</strong> - Shared rendering logic, just different filters</li>
        <li><strong>Easy migration</strong> - Change one field to move content between /posts/ and /docs/</li>
      </List>

      <Heading level={2}>Creating New Docs</Heading>
      
      <Paragraph>
        To create a new doc page, just add <code>type: 'doc'</code> to the metadata:
      </Paragraph>

      <CodeBlock language="typescript">{`// src/posts/my-new-doc.tsx
import { Heading, Paragraph } from '@/components/Primitives';
import type { PostMeta } from '@/types/post';

export const metadata: PostMeta = {
  title: 'My Documentation Page',
  slug: 'my-new-doc',
  date: '2026-01-17T00:00:00Z',
  type: 'doc', // This makes it route to /docs/my-new-doc
  description: 'A new documentation page',
  topics: ['dev-docs'],
  tags: ['documentation'],
};

const MyNewDoc = () => {
  return (
    <article>
      <Heading level={1}>My Documentation Page</Heading>
      <Paragraph>Content goes here...</Paragraph>
    </article>
  );
};

export default MyNewDoc;`}</CodeBlock>

      <Paragraph>
        That's it. The file will automatically:
      </Paragraph>

      <List>
        <li>Be served at <code>/docs/my-new-doc</code></li>
        <li>Appear in the sitemap at the correct URL</li>
        <li>Show up in Navigator search results</li>
        <li>Be excluded from the posts list</li>
      </List>

      <Heading level={2}>Key Takeaway</Heading>
      
      <Paragraph>
        URLs are infrastructure, not part of the authoring experience. By keeping all content 
        in one place but routing based on metadata, we get clean separation without complexity. 
        The <code>type</code> field is the single source of truth for how content gets served.
      </Paragraph>
    </article>
  );
};

export default DocsRoutingArchitecture;
