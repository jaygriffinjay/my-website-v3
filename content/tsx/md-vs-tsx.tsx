import { Heading, Paragraph, List, ListItem, Code } from '@/components/Primitives';
import { CodeBlock } from '@/components/CodeBlock/CodeBlock';
import type { PostMeta } from '@/types/post';

export const metadata: PostMeta = {
  title: 'Content Architecture: TSX-First with MD Fallback',
  slug: 'md-vs-tsx',
  date: '2026-01-13T00:00:00Z',
  author: 'Jay Griffin',
  type: 'post',
  description: 'Why TSX is the first-class citizen and Markdown is just an input format',
  tags: ['architecture', 'tsx', 'markdown', 'content'],
  relatedPosts: ['programs-not-documents'],
};

const MdVsTsxPost = () => {
  return (
    <>
      <Heading level={2}>Philosophy</Heading>

      <Paragraph>
        <strong>TSX is the first-class citizen.</strong> Markdown is just an input format, not a working format.
      </Paragraph>

      <Paragraph>
        We write 95% JSX. Content and logic are inherently coupled in this paradigm. Instead of fighting that reality, we embrace it.
      </Paragraph>

      <Heading level={2}>The System</Heading>

      <Heading level={3}>File Priority</Heading>
      <List>
        <ListItem>Check for <Code>.tsx</Code> version → use if exists (preferred)</ListItem>
        <ListItem>Fall back to <Code>.md</Code> → parse with react-markdown + custom components</ListItem>
        <ListItem>No file → 404</ListItem>
      </List>

      <Heading level={3}>Directory Structure</Heading>
      <CodeBlock language="plaintext">
{`/content/
  my-post.md       <- fallback, gets auto-rendered
  my-post.tsx      <- preferred, full control
/source/raw/assets/
  [markdown files live here for now]`}
      </CodeBlock>

      <Heading level={3}>Rendering Strategy</Heading>

      <Paragraph>
        MD files get parsed with custom component mapping:
      </Paragraph>

      <CodeBlock language="tsx">
{`const components = {
  h1: MyH1Component,
  p: MyParagraph,
  code: MyCodeBlock,
  // etc
}

<ReactMarkdown components={components}>
  {mdContent}
</ReactMarkdown>`}
      </CodeBlock>

      <Paragraph>
        When we need custom logic, interactivity, or special components → create the TSX version.
      </Paragraph>

      <Heading level={2}>Why Not MDX?</Heading>

      <Paragraph>
        MDX assumes <strong>markdown-first, JSX-second</strong>.
      </Paragraph>

      <Paragraph>
        Our reality is <strong>TSX-first, markdown-as-input</strong>.
      </Paragraph>

      <Paragraph>
        We don't want to make markdown do things it wasn't meant to do. We use markdown as raw content that gets promoted to first-class TSX when needed.
      </Paragraph>

      <Heading level={2}>Content Storage: In-Repo for Now</Heading>

      <Paragraph>
        Currently: 4 MD files in <Code>/source/raw/assets/</Code>
      </Paragraph>

      <Heading level={3}>Why in-repo:</Heading>
      <List>
        <ListItem>Version control for content + code together</ListItem>
        <ListItem>Simple deployment (everything in one place)</ListItem>
        <ListItem>No external dependencies, APIs, or auth</ListItem>
        <ListItem>Fast local development</ListItem>
      </List>

      <Heading level={3}>When to move out of repo:</Heading>
      <List>
        <ListItem>Non-technical people need to edit (need a UI)</ListItem>
        <ListItem>Hundreds/thousands of files bloating the repo</ListItem>
        <ListItem>Build times suffering</ListItem>
        <ListItem>Multi-repo content sharing needed</ListItem>
      </List>

      <Paragraph>
        We'll know when we hit those thresholds. Until then: keep it simple.
      </Paragraph>

      <Heading level={2}>Development Philosophy</Heading>

      <Heading level={3}>No Premature Factoring</Heading>

      <Paragraph>
        <strong>Create → Iterate → Improve → Factor when painful</strong>
      </Paragraph>

      <Paragraph>
        Don't abstract until:
      </Paragraph>
      <List>
        <ListItem>Pattern appears 3+ times</ListItem>
        <ListItem>Every change requires multiple edits</ListItem>
        <ListItem>The pain is <em>real</em> and <em>felt</em></ListItem>
      </List>

      <Paragraph>
        The code will tell you when it wants to be factored.
      </Paragraph>

      <Heading level={3}>Why This Works</Heading>

      <Paragraph>
        Early factoring means guessing at patterns that don't exist yet. You don't know:
      </Paragraph>
      <List>
        <ListItem>What gets reused</ListItem>
        <ListItem>What changes together</ListItem>
        <ListItem>What the actual constraints are</ListItem>
      </List>

      <Paragraph>
        Living with the "mess" for a bit means when you DO factor, the abstraction fits perfectly instead of being a generic guess.
      </Paragraph>

      <Heading level={2}>Implementation Notes</Heading>

      <List>
        <ListItem>Using react-markdown (or similar) for MD parsing</ListItem>
        <ListItem>Custom components map to all markdown elements</ListItem>
        <ListItem>TSX files have full access to all repo components, logic, types</ListItem>
        <ListItem>MD files are treated as content ingestion points (like copying a conversation into the repo)</ListItem>
        <ListItem>Everything renders through the same component system</ListItem>
      </List>
    </>
  );
};

export default MdVsTsxPost;
