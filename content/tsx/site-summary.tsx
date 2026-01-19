import { Heading, Paragraph, List, ListItem, Code } from '@/components/Primitives';
import type { PostMeta } from '@/types/post';
import { formatPostDate } from '@/lib/date';

export const metadata: PostMeta = {
  title: 'Dynamic Routes in Next.js',
  slug: 'dynamic-routes-nextjs',
  date: '2026-01-13T21:32:55Z',
  updated: '2026-01-17T22:00:00Z',
  type: 'doc',
  author: 'Claude Sonnet 4.5',
  feature: 'Dynamic Routes',
  projectId: 'my-website-v3',
  description:
    'A summary of implementing dynamic routes for posts, improving the homepage layout, and ensuring Next.js compatibility.',
  topics: ['Next.js', 'Dynamic Routes', 'Web Development'],
  tags: ['nextjs', 'routing', 'typescript'],
};

const DynamicRoutesPost = () => {
  return (
    <article>      
      <Paragraph>
        This site uses Next.js dynamic routes to serve both blog posts and documentation pages. 
        While both types of content live in the same directory (<Code>src/posts/</Code>), they're 
        routed differently based on their metadata.
      </Paragraph>

      <Heading level={2}>Route Structure</Heading>
      
      <Paragraph>
        We have two parallel route handlers:
      </Paragraph>
      
      <List>
        <ListItem><strong>Posts:</strong> <Code>/posts/[slug]</Code> - Blog posts and narrative content</ListItem>
        <ListItem><strong>Docs:</strong> <Code>/docs/[slug]</Code> - Technical documentation and feature specs</ListItem>
      </List>

      <Heading level={2}>How It Works</Heading>
      
      <Paragraph>
        Each route has its own page component and API endpoint, but they work identically:
      </Paragraph>

      <Heading level={3}>1. Client Requests a Page</Heading>
      <Paragraph>
        When you visit <Code>/posts/some-slug</Code> or <Code>/docs/some-slug</Code>, the respective 
        page component (<Code>src/app/posts/[slug]/page.tsx</Code> or <Code>src/app/docs/[slug]/page.tsx</Code>) 
        loads.
      </Paragraph>

      <Heading level={3}>2. Fetch Filename from API</Heading>
      <Paragraph>
        The page component calls its API route (<Code>/api/posts/[slug]</Code> or <Code>/api/docs/[slug]</Code>) 
        to get the filename for that slug.
      </Paragraph>

      <Heading level={3}>3. Dynamic Import</Heading>
      <Paragraph>
        The page then dynamically imports the TSX file from <Code>src/posts/</Code> using the filename, 
        extracts both the component and metadata, and renders them.
      </Paragraph>

      <Heading level={3}>4. Render with ContentHeader</Heading>
      <Paragraph>
        The ContentHeader component displays metadata (author, date, feature, project tags), then the 
        actual content component renders below it.
      </Paragraph>

      <Heading level={2}>Current Implementation Notes</Heading>
      
      <Paragraph>
        Right now there's code duplication between the posts and docs page components - they're nearly 
        identical except for which API they call and which filter function they use. This could be 
        refactored into a shared component, but for now the duplication is minimal and explicit.
      </Paragraph>

      <Paragraph>
        The filtering happens in <Code>src/lib/posts.ts</Code> where <Code>getAllPosts()</Code> 
        excludes docs (items with <Code>type: 'doc'</Code>) and <Code>getAllDocs()</Code> 
        only includes docs.
      </Paragraph>
    </article>
  );
};

export default DynamicRoutesPost;