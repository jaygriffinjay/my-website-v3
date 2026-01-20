import { Heading, Paragraph, List, ListItem, Code } from '@/components/Primitives';
import { CodeBlock } from '@/components/CodeBlock/CodeBlock';
import type { PostMeta } from '@/types/post';

export const metadata: PostMeta = {
  title: 'The Safari Margin Collapse Hack',
  slug: 'safari-margin-hack',
  date: '2026-01-20T00:00:00Z',
  author: 'Claude Sonnet 4.5',
  type: 'doc',
  projectId: 'jaygriff',
  description: 'Why we have a mysterious 1px padding on the body element',
  tags: ['safari', 'css', 'hack', 'margin-collapse'],
};

const SafariMarginHackDoc = () => {
  return (
    <>
      <Heading level={2}>The Problem</Heading>

      <Paragraph>
        On Safari (both desktop and iOS), when scrolling beyond the page content, 
        a different background color appears below the content. The site's background 
        (<Code>#1a1a24</Code>) stops abruptly, revealing a darker default background behind it.
      </Paragraph>

      <Heading level={2}>Root Cause</Heading>

      <Paragraph>
        Two CSS behaviors combine to create this issue:
      </Paragraph>

      <List>
        <ListItem>
          <strong>Margin collapse:</strong> Child elements' margins can "collapse through" 
          their parent if the parent has no padding or border
        </ListItem>
        <ListItem>
          <strong>Background painting:</strong> Safari paints the background only as far 
          as the actual content extends, not including collapsed margins
        </ListItem>
      </List>

      <Paragraph>
        Our <Code>Container</Code> component has <Code>margin-bottom: 24rem</Code> to 
        give breathing room at the bottom of pages. This margin was collapsing through 
        the body element, so Safari's background stopped before that 24rem space.
      </Paragraph>

      <Heading level={2}>Attempted Solutions</Heading>

      <Heading level={3}>❌ Attempt 1: height: 100%</Heading>
      <CodeBlock language="css">
{`html {
  height: 100%;
}
body {
  height: 100%;
}`}
      </CodeBlock>
      <Paragraph>
        <strong>Result:</strong> Fixed Safari background, but broke all bottom margins. 
        Setting explicit height prevents margins from working properly.
      </Paragraph>

      <Heading level={3}>❌ Attempt 2: minHeight: 100%</Heading>
      <CodeBlock language="css">
{`body {
  minHeight: 100%;
}`}
      </CodeBlock>
      <Paragraph>
        <strong>Result:</strong> Same margin collapse issue persisted.
      </Paragraph>

      <Heading level={3}>✅ Solution: 1px padding</Heading>
      <CodeBlock language="css">
{`body {
  minHeight: 100vh;
  paddingBottom: 1px;
}`}
      </CodeBlock>
      <Paragraph>
        <strong>Result:</strong> Works perfectly. The 1px padding creates a "boundary" 
        that prevents margin collapse, while being imperceptible to users.
      </Paragraph>

      <Heading level={2}>Why This Works</Heading>

      <Paragraph>
        According to CSS spec, margins don't collapse through a parent that has:
      </Paragraph>
      <List>
        <ListItem>Padding (even 1px)</ListItem>
        <ListItem>Border</ListItem>
        <ListItem>Inline content</ListItem>
        <ListItem>
          <Code>overflow</Code> other than <Code>visible</Code>
        </ListItem>
      </List>

      <Paragraph>
        The 1px padding is enough to prevent collapse while being visually undetectable. 
        Combined with <Code>minHeight: 100vh</Code>, the body extends to fill the viewport 
        and its background color covers the full scrollable area.
      </Paragraph>

      <Heading level={2}>The Code</Heading>

      <Paragraph>
        Location: <Code>src/styles/GlobalStyles.tsx</Code>
      </Paragraph>

      <CodeBlock language="typescript">
{`body: {
  // ... other styles
  minHeight: '100vh',
  paddingBottom: '1px', // Safari margin collapse fix
}`}
      </CodeBlock>

      <Heading level={2}>When Can We Remove This?</Heading>

      <Paragraph>
        This hack can be removed when one of the following happens:
      </Paragraph>
      <List>
        <ListItem>Safari changes how it paints backgrounds with collapsed margins</ListItem>
        <ListItem>We change the Container component to use padding instead of margin</ListItem>
        <ListItem>We stop caring about Safari (unlikely)</ListItem>
      </List>

      <Heading level={2}>Related Issues</Heading>

      <Paragraph>
        This is a known Safari quirk that many developers encounter. It's technically 
        spec-compliant behavior, just inconvenient. The conservative fix (1px padding) 
        is better than fighting browser behavior.
      </Paragraph>
    </>
  );
};

export default SafariMarginHackDoc;
