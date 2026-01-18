import { Heading, Paragraph, List, ListItem } from '@/components/Primitives';
import { CodeBlock } from '@/components/CodeBlock/CodeBlock';
import type { PostMeta } from '@/types/post';
import { formatPostDate } from '@/lib/date';

export const metadata: PostMeta = {
  title: 'Why My Blog Posts Are Programs, Not Documents',
  slug: 'programs-not-documents',
  date: '2026-01-13T21:40:00Z',
  author: ['Claude Sonnet 4.5', 'Jay Griffin'],
  authorshipNote: 'AI-synthesized from my rants about markdown',
  projectId: 'my-website-v3',
  description:
    'Exploring why my blog posts are written as code instead of simple markdown files, and the tradeoffs that come with this approach.',
  topics: ['React', 'TypeScript', 'Web Development', 'Content Strategy'],
  tags: ['react', 'tsx', 'markdown', 'cms', 'blogging'],
};

const ProgramsNotDocumentsPost = () => {
  return (
    <article>
      <Heading level={2}>Markdown Sounds Really Good</Heading>
      <Paragraph>
        I wanted what sounded like a really good idea: a clean separation of content and code. A
        pristine folder full of markdown files with all my writing in one place. Simple, portable,
        version-controlled text that could live anywhere.
      </Paragraph>
      <Paragraph>
        The promise was beautiful: write in markdown, commit, deploy. No dependencies, no
        complexity, just pure content.
      </Paragraph>
      <Paragraph>But I have markdown prejudice. And for good reason.</Paragraph>

      <Heading level={2}>The Reality: My Content Does Stuff</Heading>
      <Paragraph>Here's what I actually want to publish:</Paragraph>
      <List>
        <ListItem>Interactive games and simulations</ListItem>
        <ListItem>Live data visualizations and dashboards</ListItem>
        <ListItem>Custom UI components and demos</ListItem>
        <ListItem>Programs that people can experience, not just read about</ListItem>
      </List>
      <Paragraph>
        I'm not Stephen King at a typewriter. I'm a programmer who publishes programs. Writing{' '}
        <em>about</em> my programs often requires programs to describe those programs.
      </Paragraph>

      <Heading level={2}>The Failed Separation Attempts</Heading>

      <Heading level={3}>Attempt 1: Separate Posts Repo</Heading>
      <Paragraph>"I'll keep all my posts in their own repo! Clean separation!"</Paragraph>
      <Paragraph>But then my TSX posts need:</Paragraph>
      <List>
        <ListItem>My component library</ListItem>
        <ListItem>My theme system</ListItem>
        <ListItem>Shared utilities</ListItem>
        <ListItem>The whole stack</ListItem>
      </List>
      <Paragraph>
        The "posts repo" became a full application repo. Not content - a codebase.
      </Paragraph>

      <Heading level={3}>Attempt 2: Maybe a CMS?</Heading>
      <Paragraph>"What about Strapi or another headless CMS?"</Paragraph>
      <Paragraph>Sure, if my posts were:</Paragraph>
      <CodeBlock language="text">
        {`Title: "My Post"
Body: "Some text here..."
Image: "hero.jpg"`}
      </CodeBlock>
      <Paragraph>But my posts are actually:</Paragraph>
      <CodeBlock language="tsx">
        {`export default function Post() {
  // 300 lines of custom logic
  // Interactive visualizations
  // some normal text content
  // custom components that depend on my theme system code
  return <ComplexInteractiveThing />
}`}
      </CodeBlock>
      <Paragraph>
        You can't store React components with custom logic in a database. CMSs want structured
        data. I want executable code.
      </Paragraph>

      <Heading level={3}>Attempt 3: Hybrid Approach</Heading>
      <Paragraph>"What if I keep text in a CMS but components in code?"</Paragraph>
      <Paragraph>Now I'm doing some weird mapping:</Paragraph>
      <CodeBlock language="tsx">
        {`// Which component does this post need?
{data.componentName === 'FlappyBird' && <FlappyBird />}
{data.componentName === 'Dashboard' && <Dashboard />}`}
      </CodeBlock>
      <Paragraph>
        This would result in fighting the system constantly. It would lose the whole point of TSX:
        code and content together with maximum flexibility.
      </Paragraph>

      <Heading level={2}>Accepting Reality</Heading>
      <Paragraph>My posts aren't portable. They're tightly coupled to:</Paragraph>
      <List>
        <ListItem>React and TypeScript</ListItem>
        <ListItem>My component library</ListItem>
        <ListItem>My theme/styling system (emotion/CSS-in-JS)</ListItem>
        <ListItem>Specific dependencies</ListItem>
      </List>
      <Paragraph>
        <strong>This isn't a bug. It's the feature.</strong>
      </Paragraph>
      <Paragraph>
        I chose power over simplicity. The ability to build whatever I want instead of being
        limited to paragraphs and images.
      </Paragraph>

      <Heading level={2}>The Actual Structure</Heading>
      <Paragraph>One repo. Everything together. Honest about what it is.</Paragraph>
      <CodeBlock language="text">
        {`my-blog/
├── app/              # Next.js routes
├── posts/            # the "content"
│   ├── simple-post.tsx
│   ├── complex-game/
│   │   ├── index.tsx
│   │   ├── game-logic/
│   │   └── assets/
│   └── data-viz/
│       └── index.tsx
├── components/       # shared across posts
├── theme/           # design system
└── types/
    └── post.ts      # metadata interface`}
      </CodeBlock>

      <Paragraph>Each "post" is either:</Paragraph>
      <List>
        <ListItem>
          <strong>Simple</strong>: one <code>.tsx</code> file with some content
        </ListItem>
        <ListItem>
          <strong>Complex</strong>: a whole directory containing a program
        </ListItem>
      </List>

      <Paragraph>Posts export metadata:</Paragraph>
      <CodeBlock language="tsx">
        {`export const meta: PostMeta = {
  title: "My Post",
  slug: "my-post",
  date: "2024-01-15T14:30:00Z",
  description: "Description here",
  projectId: "my-app",
  topics: ["react", "games"]
}

export default function Post() {
  return <article>...</article>
}`}
      </CodeBlock>

      <Heading level={2}>The Tradeoffs</Heading>
      <Paragraph>
        <strong>What I lost:</strong>
      </Paragraph>
      <List>
        <ListItem>Clean content/code separation</ListItem>
        <ListItem>Easy automation (can't process all posts the same)</ListItem>
        <ListItem>The markdown simplicity dream</ListItem>
        <ListItem>Portability</ListItem>
      </List>

      <Paragraph>
        <strong>What I gained:</strong>
      </Paragraph>
      <List>
        <ListItem>Full creative freedom</ListItem>
        <ListItem>Interactive, living content</ListItem>
        <ListItem>Programs that do stuff</ListItem>
        <ListItem>Unlimited possibilities</ListItem>
      </List>

      <Heading level={2}>Why This Works For Me</Heading>
      <Paragraph>
        I'm not managing a team. I'm not enabling non-technical editors. I'm not trying to build a
        generic blogging platform.
      </Paragraph>
      <Paragraph>
        I'm a solo developer who wants to publish interactive programs on the web. I want those
        interactive programs because sometimes they can help communicate ideas much clearer than
        words can.
      </Paragraph>

      <Heading level={2}>Conclusion</Heading>
      <Paragraph>
        If you're building a traditional blog, use markdown. It's great for that.
      </Paragraph>
      <Paragraph>
        But I like stuff that does stuff. So a lot of my writing is done in the context of a
        program even if I just want to post text.
      </Paragraph>
    </article>
  );
};

export default ProgramsNotDocumentsPost;
