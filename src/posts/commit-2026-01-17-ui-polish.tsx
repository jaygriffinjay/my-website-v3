import { PostMeta } from '@/types/post';
import { Paragraph, Code, Heading } from '@/components/Primitives';

export const metadata: PostMeta = {
  title: 'UI Polish: Multi-Author Support & Inline Code Styling',
  slug: 'ui-polish',
  date: '2026-01-17T22:00:00Z',
  author: 'Claude Sonnet 4.5',
  type: 'doc:commit',
  projectId: 'my-website-v3',
  commitHash: 'b63a18974c7906ec296394b62c8868ae7caacff3',
  description: 'Added multi-author support with tooltips for authorship context, refined inline code styling with electric blue accent, and various UI polish updates',
  tags: ['ui', 'styling', 'metadata', 'tooltip'],
};

export default function CommitDoc() {
  return (
    <>
      <Paragraph>
        This commit adds support for multiple authors on posts and refines the inline code styling across the site.
      </Paragraph>

      <Heading level={2}>Multi-Author Support</Heading>
      
      <Heading level={3}>Type Changes</Heading>
      <Paragraph>
        Updated <Code>PostMeta</Code> interface to support both single and multiple authors:
      </Paragraph>
      <Paragraph>
        <b>Before:</b> <Code>author?: string;</Code><br />
        <b>After:</b> <Code>author?: string | string[];</Code>
      </Paragraph>
      <Paragraph>
        Also added optional <Code>authorshipNote?: string</Code> field for explaining authorship context via tooltip.
      </Paragraph>

      <Heading level={3}>ContentHeader Component</Heading>
      <Paragraph>
        Updated to handle author arrays with <Code>Array.isArray()</Code> check and <Code>join(', ')</Code> formatting.
        Changed "Author:" prefix to cleaner "By" format.
      </Paragraph>
      <Paragraph>
        Implemented hover tooltip for authorship notes:
      </Paragraph>
      <Paragraph>
        • Pill background on hover (subtle white overlay)<br />
        • Tooltip appears above text when <Code>authorshipNote</Code> is present<br />
        • White background with black text, 150px width, text wrapping<br />
        • Smooth transitions and shadow for depth
      </Paragraph>

      <Heading level={3}>Example Usage</Heading>
      <Paragraph>
        The <Code>programs-not-documents</Code> post now demonstrates collaborative authorship:
      </Paragraph>
      <Paragraph>
        <Code>author: ['Claude', 'Jay Griffin']</Code><br />
        <Code>authorshipNote: 'AI-synthesized from Jay\'s rants about markdown and content architecture'</Code>
      </Paragraph>

      <Heading level={2}>Inline Code Styling Refinement</Heading>
      
      <Heading level={3}>Visual Updates</Heading>
      <Paragraph>
        Refined the <Code>Code</Code> primitive styling for better visual hierarchy:
      </Paragraph>
      <Paragraph>
        • <b>Color:</b> Electric blue <Code>hsl(210, 100%, 60%)</Code> instead of theme text color<br />
        • <b>Border:</b> Left accent border (2px) with 33% opacity primary color instead of full border<br />
        • <b>Padding:</b> Reduced to <Code>0.15em 0.4em 0.15em 0.35em</Code> for tighter fit<br />
        • <b>Shadow:</b> Subtle shadow <Code>0 1px 3px rgba(0, 0, 0, 0.03)</Code> for depth
      </Paragraph>

      <Heading level={2}>Heading Cleanup</Heading>
      <Paragraph>
        Removed <Code>first-of-type</Code> margin-top rule from heading styles - unnecessary constraint that was causing layout issues.
      </Paragraph>

      <Heading level={2}>Technical Details</Heading>
      
      <Heading level={3}>Backward Compatibility</Heading>
      <Paragraph>
        Union type implementation maintains full backward compatibility - existing posts with single author strings continue working without changes.
      </Paragraph>

      <Heading level={3}>Tooltip Implementation</Heading>
      <Paragraph>
        Pure CSS tooltip using <Code>::after</Code> pseudo-element with positioning and transforms. No JavaScript required.
        Conditional rendering based on <Code>authorshipNote</Code> presence.
      </Paragraph>

      <Heading level={3}>Files Modified</Heading>
      <Paragraph>
        • <Code>src/types/post.ts</Code> - Added union type and authorshipNote field<br />
        • <Code>src/components/ContentHeader.tsx</Code> - Array handling, tooltip implementation, text formatting<br />
        • <Code>src/components/Primitives.tsx</Code> - Inline code styling, heading cleanup<br />
        • <Code>src/posts/programs-not-documents.tsx</Code> - Example multi-author usage
      </Paragraph>
    </>
  );
}
