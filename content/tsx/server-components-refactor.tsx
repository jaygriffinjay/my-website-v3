import { Heading, Paragraph, List, ListItem } from '@/components/Primitives';
import { CodeBlock } from '@/components/CodeBlock/CodeBlock';
import type { PostMeta } from '@/types/post';

export const metadata: PostMeta = {
  title: 'Server Components Refactor: From API Routes to Direct Loading',
  slug: 'server-components-refactor',
  date: '2026-01-19T00:00:00Z',
  author: ['Claude Sonnet 4.5'],
  type: 'doc',
  projectId: 'jaygriff',
  description:
    'How we refactored content loading from client-side API fetches to server-side direct imports, eliminating API routes and improving performance.',
  tags: ['nextjs', 'server-components', 'refactoring', 'performance'],
};

const ServerComponentsRefactorDoc = () => {
  return (
    <>
      <Heading level={2}>The Problem</Heading>
      <Paragraph>
        Originally, our dynamic content routes ([slug] pages) were client components that fetched
        data from API routes to determine which content file to load. This created an
        unnecessarily complex flow:
      </Paragraph>
      <List>
        <ListItem>User visits /posts/my-post</ListItem>
        <ListItem>Client component renders with loading state</ListItem>
        <ListItem>Client fetches /api/posts/my-post</ListItem>
        <ListItem>API route reads filesystem, finds filename</ListItem>
        <ListItem>API returns JSON with filename</ListItem>
        <ListItem>Client dynamically imports content file</ListItem>
        <ListItem>Client finally renders content</ListItem>
      </List>
      <Paragraph>
        This meant two serverless function invocations, client-side loading states, exposed
        internal APIs, and poor SEO (no content in initial HTML).
      </Paragraph>

      <Heading level={2}>The Solution</Heading>
      <Paragraph>
        We eliminated API routes entirely by using Next.js Server Components to load content
        directly on the server:
      </Paragraph>

      <Heading level={3}>1. Created Content Loader Utility</Heading>
      <Paragraph>
        A single utility function handles slug-to-content mapping server-side:
      </Paragraph>
      <CodeBlock language="typescript">{`// src/lib/content-loader.ts
import { getAllPosts, getAllDocs } from './posts';
import type { PostMeta } from '@/types/post';

export type ContentType = 'post' | 'doc';

export interface LoadedContent {
  Component: React.ComponentType;
  metadata: PostMeta;
  filename: string;
}

export async function loadContentBySlug(
  slug: string,
  type: ContentType
): Promise<LoadedContent | null> {
  const allContent = type === 'post' ? await getAllPosts() : await getAllDocs();
  const content = allContent.find((item) => item.metadata.slug === slug);
  
  if (!content) return null;
  
  const module = await import(\`@content/tsx/\${content.filename}\`);
  
  return {
    Component: module.default,
    metadata: module.metadata,
    filename: content.filename,
  };
}`}</CodeBlock>

      <Heading level={3}>2. Refactored Pages to Server Components</Heading>
      <Paragraph>
        Pages became async Server Components that load content directly:
      </Paragraph>
      <CodeBlock language="typescript">{`// Before: Client Component (~60 lines)
"use client";
import { useState, useEffect } from "react";

export default function Page({ params }) {
  const [component, setComponent] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch(\`/api/posts/\${slug}\`)
      .then(res => res.json())
      .then(data => import(\`@content/tsx/\${data.filename}\`))
      .then(module => setComponent(module.default));
  }, [slug]);
  
  if (loading) return null;
  return <Container>...</Container>;
}

// After: Server Component (~25 lines)
import { loadContentBySlug } from "@/lib/content-loader";

export default async function Page({ params }) {
  const { slug } = await params;
  const content = await loadContentBySlug(slug, 'post');
  
  if (!content) notFound();
  
  const { Component, metadata } = content;
  
  return (
    <Container size="sm">
      <article>
        <ContentHeader metadata={metadata} />
        <ContentWrapper>
          <Component />
        </ContentWrapper>
      </article>
    </Container>
  );
}`}</CodeBlock>

      <Heading level={3}>3. Established Client Boundaries</Heading>
      <Paragraph>
        Since content files use Emotion (which requires React Context), we created a wrapper to
        establish the client boundary:
      </Paragraph>
      <CodeBlock language="typescript">{`// src/components/ContentWrapper.tsx
"use client";

export function ContentWrapper({ children }) {
  return <>{children}</>;
}`}</CodeBlock>
      <Paragraph>
        This single client component wraps all dynamic content, giving it access to Emotion's
        context without making the entire page client-side.
      </Paragraph>

      <Heading level={3}>4. Deleted API Routes</Heading>
      <Paragraph>
        With direct server-side loading, we deleted the entire /app/api directory. No more exposed
        endpoints for internal operations.
      </Paragraph>

      <Heading level={2}>Architecture Diagram</Heading>
      <CodeBlock language="text">{`Before:
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │ GET /posts/my-post
       ▼
┌─────────────────────────┐
│  Client Component       │
│  - useState/useEffect   │
│  - Loading state        │
└──────┬──────────────────┘
       │ fetch('/api/posts/my-post')
       ▼
┌─────────────────────────┐
│  API Route              │
│  - Read filesystem      │
│  - Find file            │
│  - Return JSON          │
└──────┬──────────────────┘
       │ { filename: 'my-post.tsx' }
       ▼
┌─────────────────────────┐
│  Dynamic Import         │
│  - Load component       │
│  - Render               │
└─────────────────────────┘

After:
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │ GET /posts/my-post
       ▼
┌─────────────────────────┐
│  Server Component       │
│  - loadContentBySlug()  │
│  - Direct import        │
│  - Pre-render HTML      │
└──────┬──────────────────┘
       │ Pre-rendered HTML
       ▼
┌─────────────────────────┐
│  Client Boundary        │
│  - ContentWrapper       │
│  - Emotion context      │
│  - Hydrate content      │
└─────────────────────────┘`}</CodeBlock>

      <Heading level={2}>Benefits</Heading>
      <List>
        <ListItem>
          <strong>Better SEO:</strong> Content pre-rendered in initial HTML
        </ListItem>
        <ListItem>
          <strong>Faster loads:</strong> No client-side API roundtrips
        </ListItem>
        <ListItem>
          <strong>Simpler code:</strong> 60 lines → 25 lines per route
        </ListItem>
        <ListItem>
          <strong>No exposed APIs:</strong> Internal operations stay internal
        </ListItem>
        <ListItem>
          <strong>Better performance:</strong> Single serverless invocation instead of two
        </ListItem>
        <ListItem>
          <strong>No loading states:</strong> Content available immediately
        </ListItem>
      </List>

      <Heading level={2}>Server vs Client Components</Heading>
      <Paragraph>
        Understanding when to use each:
      </Paragraph>
      
      <Heading level={3}>Server Components (default)</Heading>
      <List>
        <ListItem>Fetch data from databases or filesystem</ListItem>
        <ListItem>Access backend resources directly</ListItem>
        <ListItem>Keep sensitive logic server-side</ListItem>
        <ListItem>Reduce client bundle size</ListItem>
        <ListItem>Improve SEO with pre-rendered content</ListItem>
      </List>

      <Heading level={3}>Client Components ("use client")</Heading>
      <List>
        <ListItem>Use React hooks (useState, useEffect, etc.)</ListItem>
        <ListItem>Add interactivity and event listeners</ListItem>
        <ListItem>Access browser APIs (window, localStorage)</ListItem>
        <ListItem>Use libraries that depend on React Context (Emotion)</ListItem>
      </List>

      <Heading level={2}>Pattern: Composition</Heading>
      <Paragraph>
        The key pattern is composition: Server Components can render Client Components, passing
        data down as props. This lets you keep most of your app server-rendered while adding
        client interactivity only where needed.
      </Paragraph>
      <CodeBlock language="typescript">{`// Server Component
export default async function Page() {
  const data = await loadDataFromDatabase();
  
  return (
    <Container> {/* Server-rendered */}
      <ClientInteractiveWidget data={data} /> {/* Client-rendered */}
    </Container>
  );
}`}</CodeBlock>

      <Heading level={2}>Build-Time Optimization</Heading>
      <Paragraph>
        We added <code>generateStaticParams</code> to pre-render all content pages at build time:
      </Paragraph>
      <CodeBlock language="typescript">{`// In content-loader.ts
export async function getAllPostSlugs() {
  const posts = await getAllPosts();
  return posts.map(post => ({ slug: post.metadata.slug }));
}

// In posts/[slug]/page.tsx
export async function generateStaticParams() {
  return await getAllPostSlugs();
}`}</CodeBlock>
      <Paragraph>
        Now all ~15 content pages are pre-rendered as static HTML during <code>npm run build</code>.
        Users get instant page loads from the CDN instead of waiting for serverless functions.
      </Paragraph>

      <Heading level={2}>The Hydration Challenge</Heading>
      <Paragraph>
        After the refactor, we encountered hydration warnings from Emotion. Understanding this
        issue taught us important lessons about Server Components and CSS-in-JS.
      </Paragraph>

      <Heading level={3}>What Happened</Heading>
      <Paragraph>
        Client Components (marked with "use client") still render on the server first, then
        hydrate on the client. Before the refactor, content loaded asynchronously after hydration.
        After the refactor, both NavBar and content components hydrate simultaneously.
      </Paragraph>
      <CodeBlock language="text">{`Before Refactor:
1. Server renders NavBar → HTML with Emotion styles
2. Client hydrates NavBar
3. Content loads later (client-only fetch + import)
4. Emotion handles them separately ✅

After Refactor:
1. Server renders NavBar + Content → HTML with Emotion styles
2. Client hydrates both simultaneously
3. Emotion re-injects styles for both at once
4. Style tag injection order differs server vs client ❌`}</CodeBlock>

      <Heading level={3}>Why It's Hard to Fix</Heading>
      <Paragraph>
        The hydration mismatch happens inside Emotion's internal style tag injection in the{' '}
        <code>&lt;head&gt;</code>, not in your component markup. You can't use{' '}
        <code>suppressHydrationWarning</code> because:
      </Paragraph>
      <List>
        <ListItem>It only works on elements you render directly</ListItem>
        <ListItem>Emotion manages style tags internally</ListItem>
        <ListItem>The warning is about structural mismatch (tag order), not content mismatch</ListItem>
      </List>

      <Heading level={3}>What We Tried</Heading>
      <List>
        <ListItem><code>suppressHydrationWarning</code> on various elements → Didn't help</ListItem>
        <ListItem>Disabling React Strict Mode → Works but loses other useful warnings</ListItem>
        <ListItem>Console filtering → Prevented by Next.js dev overlay architecture</ListItem>
        <ListItem>Client-only rendering → Works but loses SSR benefits</ListItem>
      </List>

      <Heading level={3}>The Real Fix (Not Worth It)</Heading>
      <Paragraph>
        Properly fixing it requires Emotion's advanced SSR cache setup to ensure identical style
        injection order server and client. This is complex, error-prone, and not worth the effort
        for cosmetic warnings.
      </Paragraph>

      <Heading level={3}>The Pragmatic Decision</Heading>
      <Paragraph>
        We accepted the warnings because:
      </Paragraph>
      <List>
        <ListItem>The site works perfectly (React auto-fixes the mismatch client-side)</ListItem>
        <ListItem>Warnings are cosmetic, not functional problems</ListItem>
        <ListItem>Most CSS-in-JS + App Router projects have 3-8 hydration warnings</ListItem>
        <ListItem>Our stack philosophy (Emotion for structured data) remains sound</ListItem>
        <ListItem>Alternatives like Tailwind don't align with our AI-first approach</ListItem>
      </List>

      <Heading level={2}>Why We Stick With Emotion</Heading>
      <Paragraph>
        Despite hydration warnings, Emotion aligns with our core philosophy:
      </Paragraph>
      <List>
        <ListItem>
          <strong>Structured Data:</strong> CSSObject is data, not magic strings
        </ListItem>
        <ListItem>
          <strong>Type-Safe:</strong> TypeScript validates styles at compile time
        </ListItem>
        <ListItem>
          <strong>AI-Friendly:</strong> LLMs understand objects better than utility classes
        </ListItem>
        <ListItem>
          <strong>Full CSS Power:</strong> No arbitrary value syntax or config bloat
        </ListItem>
        <ListItem>
          <strong>Composable:</strong> JavaScript object composition patterns
        </ListItem>
      </List>
      <Paragraph>
        See <code>WHY_NO_TAILWIND.md</code> for our full manifesto on treating styles as
        structured data rather than magic strings.
      </Paragraph>

      <Heading level={2}>Lessons Learned</Heading>
      <List>
        <ListItem>
          "use client" doesn't mean "skip SSR" - Client Components still server-render
        </ListItem>
        <ListItem>
          More concurrent hydration = more opportunities for CSS-in-JS ordering conflicts
        </ListItem>
        <ListItem>
          suppressHydrationWarning only works for intentional content mismatches (timestamps, etc)
        </ListItem>
        <ListItem>
          Hydration warnings from library internals can't be easily suppressed
        </ListItem>
        <ListItem>
          Cosmetic warnings are acceptable trade-offs for architectural benefits
        </ListItem>
        <ListItem>
          Philosophy matters: structured data &gt; magic strings for AI-era development
        </ListItem>
      </List>

      <Heading level={2}>Trade-offs Summary</Heading>
      <CodeBlock language="text">{`What We Gained:
✅ 60→25 lines per route (simpler code)
✅ Single serverless invocation (faster, cheaper)
✅ Pre-rendered static HTML (better SEO, instant loads)
✅ No exposed API routes (better security)
✅ No loading states (better UX)
✅ Build-time optimization (all pages pre-rendered)

What We Lost:
⚠️  1-3 hydration warnings in console (cosmetic only)

Verdict: Overwhelmingly positive. 10/10 would refactor again.`}</CodeBlock>

      <Heading level={2}>Next Steps</Heading>
      <Paragraph>
        This refactor sets us up to add markdown file support, since we can now load and transform
        files server-side before rendering. The content-loader utility can be extended to handle
        both TSX and MD files, parsing frontmatter and rendering markdown on the server.
      </Paragraph>
    </>
  );
};

export default ServerComponentsRefactorDoc;
