import { Heading, Paragraph, List, ListItem, Code } from '@/components/Primitives';
import { CodeBlock } from '@/components/CodeBlock/CodeBlock';
import type { PostMeta } from '@/types/post';

export const metadata: PostMeta = {
  title: 'Content System Refactor - Docs/Posts Separation',
  slug: 'content-system-refactor',
  date: '2026-01-17T22:30:00Z',
  type: 'doc:commit',
  author: 'Claude Sonnet 4.5',
  feature: 'Navigator',
  projectId: 'my-website-v3',
  commitHash: '9cbde96ec935dd5c7e2d6cf07ba8756d90d96d2e',
  description:
    'Complete refactor of content infrastructure: separated docs from posts with type-based routing, added comprehensive metadata system, improved Navigator UX, and created ContentHeader component.',
  tags: ['refactor', 'routing', 'metadata'],
};

const CommitContentSystemRefactor = () => {
  return (
    <article>      
      <Paragraph>
        This commit represents a major refactor of how content is organized, routed, and displayed 
        on the site. What started as a simple Navigator tweak evolved into a complete rethinking of 
        the content system architecture.
      </Paragraph>

      <Heading level={2}>Summary of Changes</Heading>
      
      <List>
        <ListItem>Separated documentation from blog posts using type-based routing (<Code>/docs/</Code> vs <Code>/posts/</Code>)</ListItem>
        <ListItem>Removed URL paths from Navigator search results for cleaner UX</ListItem>
        <ListItem>Added comprehensive metadata system with <Code>author</Code>, <Code>feature</Code>, and <Code>type</Code> fields</ListItem>
        <ListItem>Created ContentHeader component for consistent metadata display across all content</ListItem>
        <ListItem>Updated Container component with proper vertical spacing</ListItem>
        <ListItem>Created multiple documentation pages explaining the system</ListItem>
      </List>

      <Heading level={2}>The Problem</Heading>
      
      <Heading level={3}>1. Navigator Showed Too Much Implementation Detail</Heading>
      <Paragraph>
        The Navigator was displaying full URL paths like <Code>/posts/navigator-feature</Code> in 
        search results. This violated a core UX principle: users don't care about URL structures. 
        They just want to navigate to content. As the saying goes, "only nerds care about URLs."
      </Paragraph>

      <Heading level={3}>2. Docs Were Masquerading as Posts</Heading>
      <Paragraph>
        Technical documentation was being served at <Code>/posts/</Code> URLs, which was misleading. 
        Documentation isn't really a "post" - it's reference material. The URL structure didn't 
        reflect the content type.
      </Paragraph>

      <Heading level={3}>3. No Consistent Metadata Display</Heading>
      <Paragraph>
        Content files had metadata but no standard way to display it. Important context like 
        author, feature, and project associations wasn't visible to readers.
      </Paragraph>

      <Heading level={2}>The Solution</Heading>

      <Heading level={3}>1. Type-Based Content Routing</Heading>
      
      <Paragraph>
        Added a <Code>type</Code> field to the <Code>PostMeta</Code> interface:
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
        Files with <Code>type: 'doc'</Code> are now served at <Code>/docs/[slug]</Code>, while 
        regular posts (no type specified) remain at <Code>/posts/[slug]</Code>. This keeps the 
        authoring simple - most content doesn't need to specify a type.
      </Paragraph>

      <Heading level={3}>2. Parallel Route Handlers</Heading>
      
      <Paragraph>
        Created separate but parallel routing infrastructure:
      </Paragraph>

      <List>
        <ListItem><Code>src/app/posts/[slug]/page.tsx</Code> - Renders posts</ListItem>
        <ListItem><Code>src/app/docs/[slug]/page.tsx</Code> - Renders docs</ListItem>
        <ListItem><Code>src/app/api/posts/[slug]/route.ts</Code> - API for post lookups</ListItem>
        <ListItem><Code>src/app/api/docs/[slug]/route.ts</Code> - API for doc lookups</ListItem>
      </List>

      <Paragraph>
        Both work identically - they fetch the filename via API, dynamically import the TSX file, 
        and render it. The only difference is which type they filter for.
      </Paragraph>

      <Heading level={3}>3. Enhanced Metadata System</Heading>
      
      <Paragraph>
        Extended <Code>PostMeta</Code> with new fields for better organization:
      </Paragraph>

      <CodeBlock language="typescript">{`export interface PostMeta {
  // ...existing fields
  author?: string;      // "Jay Griffin", "Claude Sonnet 4.5"
  feature?: string;     // "Navigator", "Theme Editor"
  projectId?: string;   // "my-website-v3", "locus"
  type?: 'post' | 'doc';
}`}</CodeBlock>

      <Paragraph>
        Removed <Code>relatedPosts</Code> field as it was redundant - you can already filter by 
        feature, project, topics, and tags to find related content.
      </Paragraph>

      <Heading level={3}>4. ContentHeader Component</Heading>
      
      <Paragraph>
        Created a standardized header component (<Code>src/components/ContentHeader.tsx</Code>) that displays:
      </Paragraph>

      <List>
        <ListItem>Title (large, prominent)</ListItem>
        <ListItem>Author and publication date (traditional text format)</ListItem>
        <ListItem>Last updated date (when applicable)</ListItem>
        <ListItem>Metadata badges (docs badge, feature, project) as pill-style tags</ListItem>
        <ListItem>Description (larger, readable format)</ListItem>
      </List>

      <Paragraph>
        This gives every page a Notion-like feel with clear, consistent metadata presentation.
      </Paragraph>

      <Heading level={3}>5. Cleaned Up Navigator UX</Heading>
      
      <Paragraph>
        Removed URL path display from Navigator search results. Now users just see:
      </Paragraph>

      <List>
        <ListItem>Title</ListItem>
        <ListItem>Description</ListItem>
      </List>

      <Paragraph>
        No more <Code>/posts/navigator-feature</Code> cluttering the interface. Users don't need 
        to understand our URL scheme to navigate the site.
      </Paragraph>

      <Heading level={2}>Files Changed</Heading>

      <Heading level={3}>New Files</Heading>
      <List>
        <ListItem><Code>src/app/docs/[slug]/page.tsx</Code> - Doc page handler</ListItem>
        <ListItem><Code>src/app/api/docs/[slug]/route.ts</Code> - Doc API endpoint</ListItem>
        <ListItem><Code>src/components/ContentHeader.tsx</Code> - Metadata display component</ListItem>
        <ListItem><Code>src/posts/docs-routing.tsx</Code> - Documentation explaining the routing system</ListItem>
        <ListItem><Code>src/posts/commit-2026-01-17-content-system.tsx</Code> - This commit doc</ListItem>
      </List>

      <Heading level={3}>Modified Files</Heading>
      <List>
        <ListItem><Code>src/types/post.ts</Code> - Added author, feature, type fields; removed relatedPosts</ListItem>
        <ListItem><Code>src/lib/posts.ts</Code> - Added getAllDocs() and getDocBySlug() functions</ListItem>
        <ListItem><Code>src/lib/routes.ts</Code> - Updated to handle both /posts/ and /docs/ paths</ListItem>
        <ListItem><Code>src/app/sitemap.ts</Code> - Generate sitemap entries for both posts and docs</ListItem>
        <ListItem><Code>src/app/posts/[slug]/page.tsx</Code> - Integrated ContentHeader</ListItem>
        <ListItem><Code>src/components/Navigator.tsx</Code> - Removed URL path display</ListItem>
        <ListItem><Code>src/components/Primitives.tsx</Code> - Updated Container margins for better spacing</ListItem>
        <ListItem><Code>src/posts/navigator-feature.tsx</Code> - Updated metadata with type, author, feature</ListItem>
        <ListItem><Code>src/posts/site-summary.tsx</Code> - Converted to doc, rewrote content, updated metadata</ListItem>
        <ListItem><Code>src/posts/programs-not-documents.tsx</Code> - Updated metadata</ListItem>
      </List>

      <Heading level={2}>Technical Notes</Heading>

      <Heading level={3}>Code Duplication</Heading>
      <Paragraph>
        The posts and docs page components are nearly identical - they just call different APIs 
        and use different filter functions. This could be refactored into a shared component, 
        but for now the duplication is minimal and keeps things explicit. Each route handler is 
        ~60 lines and easy to understand.
      </Paragraph>

      <Heading level={3}>Default Behavior</Heading>
      <Paragraph>
        Posts are "first-class" - they don't need to specify <Code>type: 'post'</Code>. Only docs 
        need the explicit <Code>type: 'doc'</Code> marker. This keeps most metadata blocks clean.
      </Paragraph>

      <Heading level={3}>Backwards Compatibility</Heading>
      <Paragraph>
        Old content without the new metadata fields continues to work. The system gracefully handles 
        missing author, feature, or type information.
      </Paragraph>

      <Heading level={2}>Future Possibilities</Heading>

      <List>
        <ListItem>Filter Navigator results by type, feature, or project</ListItem>
        <ListItem>Create dedicated feature or project index pages that list all related content</ListItem>
        <ListItem>Add more content types beyond posts and docs (e.g., projects, demos)</ListItem>
        <ListItem>Refactor page handlers to reduce duplication</ListItem>
        <ListItem>Generate commit documentation automatically from git history</ListItem>
      </List>

      <Heading level={2}>Why This Matters</Heading>
      
      <Paragraph>
        This refactor establishes a scalable content architecture that:
      </Paragraph>

      <List>
        <ListItem>Separates concerns properly (docs vs posts have different purposes)</ListItem>
        <ListItem>Hides implementation details from users (no more URL clutter)</ListItem>
        <ListItem>Provides rich metadata without complexity</ListItem>
        <ListItem>Creates a foundation for feature-based organization</ListItem>
        <ListItem>Maintains the "programs not documents" philosophy while improving UX</ListItem>
      </List>

      <Paragraph>
        The site now has a clear content model that can grow without becoming chaotic. Each piece 
        of content knows what it is, who wrote it, what feature it documents, and where it belongs.
      </Paragraph>

    </article>
  );
};

export default CommitContentSystemRefactor;
