import type { PostMeta } from '@/types/post';
import { Heading, Paragraph, List, ListItem, Link } from '@/components/Primitives';
import { CodeBlock } from '@/components/CodeBlock/CodeBlock';

export const metadata: PostMeta = {
  title: 'Building an Interactive Timeline Component',
  slug: 'building-timeline-component',
  date: '2026-01-31T00:00:00Z',
  author: 'Claude Sonnet 4.5',
  authorshipNote: 'AI-generated based on summary of work done on component',
  description: 'Deep dive into creating a custom SVG-based timeline component with hover interactions, dynamic positioning, and responsive year labels',
  tags: ['dev', 'react', 'components', 'svg', 'design'],
  path: '/posts/building-timeline-component',
};

export default function BuildingTimelineComponent() {
  return (
    <>
      <Heading level={1}>Building an Interactive Timeline Component</Heading>
      
      <Paragraph>
        I built a custom timeline component for my about page to visualize my development journey from 2019 to 2026. 
        What started as a simple idea turned into an interesting exploration of SVG manipulation, React state management, 
        and spatial UI interactions. Here's how I built it and the bugs I encountered along the way.
      </Paragraph>

      <Heading level={2}>What It Does</Heading>
      
      <Paragraph>
        The timeline shows project milestones chronologically with these features:
      </Paragraph>

      <List>
        <ListItem>Year markers (26, 25, 24...) positioned to the left in Sekuya font</ListItem>
        <ListItem>Tick marks of varying lengths: years (36px), half-years (24px), months (12px)</ListItem>
        <ListItem>Purple-colored tick marks indicate events/projects</ListItem>
        <ListItem>Hover over purple marks to extend the tick mark and reveal project cards</ListItem>
        <ListItem>Multiple projects in the same month stack vertically with 240px spacing</ListItem>
        <ListItem>Cards show year, title, and description with styled backgrounds</ListItem>
      </List>

      <Heading level={2}>Architecture Overview</Heading>

      <Paragraph>
        The component is built with React, Emotion CSS, and SVG. The key architectural decisions:
      </Paragraph>

      <Heading level={3}>SVG-Based Timeline</Heading>

      <Paragraph>
        I chose SVG over HTML/CSS because it gives precise control over positioning and allows tick marks to 
        extend dynamically on hover without layout shifts. The viewBox is set to <code>-40 65 290 1490</code> 
        to accommodate year labels on the left while keeping the timeline content properly bounded.
      </Paragraph>

      <CodeBlock language="typescript">{`// Timeline spans 2019-2026, positions calculated from dates
const getYPosition = (year: number, month: number): number => {
  const startYear = 2019;
  const startMonth = 1;
  const totalMonths = (2026 - 2019) * 12;
  const timelineHeight = 1490;
  const monthsFromStart = (year - startYear) * 12 + (month - startMonth);
  return 1555 - (monthsFromStart / totalMonths) * timelineHeight;
};`}</CodeBlock>

      <Paragraph>
        Every milestone gets a Y position calculated from its actual date. This makes the spacing proportional 
        to time rather than arbitrary.
      </Paragraph>

      <Heading level={3}>Hover Interaction System</Heading>

      <Paragraph>
        I use React state to track which timeline position is being hovered. Each tick mark that has events 
        gets an invisible 30x30px rect as a hover target:
      </Paragraph>

      <CodeBlock language="typescript">{`const [hoveredPosition, setHoveredPosition] = useState<number | null>(null);

// In the tick mark rendering:
if (hasEvent) {
  const isHovered = hoveredPosition !== null && Math.abs(hoveredPosition - y) < 5;
  const finalX2 = isHovered ? 200 : x2;
  
  // Tick mark extends from x1 to finalX2 when hovered
  ticks.push(
    <line x1={x1} y1={y} x2={finalX2} y2={y} ... />
  );
}`}</CodeBlock>

      <Paragraph>
        When hovered, the tick mark extends from its normal length (12-36px) all the way to x=200, creating 
        a visual connection to the card that appears at x=205.
      </Paragraph>

      <Heading level={3}>Multi-Card Stacking</Heading>

      <Paragraph>
        Multiple projects in the same month need to stack without overlapping. I calculate vertical offsets 
        based on how many cards share the same Y position:
      </Paragraph>

      <CodeBlock language="typescript">{`// In card rendering:
const cardsAtSamePosition = devMilestones.filter(m => Math.abs(m.y - item.y) < 5);
const indexAtPosition = cardsAtSamePosition.findIndex(m => m.title === item.title);
const verticalOffset = indexAtPosition * 240; // 240px spacing between cards

// Position with offset applied
style={{ 
  top: \`\${item.y + verticalOffset}px\`, 
  left: '205px',
  opacity: isHovered ? 1 : 0,
}}`}</CodeBlock>

      <Heading level={2}>Major Bugs and Fixes</Heading>

      <Heading level={3}>Bug #1: Overlapping Tick Mark Lines</Heading>

      <Paragraph>
        Initially, I was drawing the base tick mark AND an extension line on hover, which created a visible 
        artifact where they met. The fix was to make the tick mark's x2 dynamic - it extends all the way to 
        x=200 when hovered instead of drawing two separate lines.
      </Paragraph>

      <Heading level={3}>Bug #2: Year Labels Cut Off</Heading>

      <Paragraph>
        The year labels (26, 25, 24...) were positioned at x=-5 but the viewBox started at x=0, so they were 
        being clipped. I adjusted the viewBox to start at x=-40, giving 40px of space for the labels on the left.
      </Paragraph>

      <Heading level={3}>Bug #3: Massive Top/Bottom Padding</Heading>

      <Paragraph>
        The SVG had huge empty space at top and bottom because the viewBox was 0-1620 but the actual timeline 
        content only spanned y=65 to y=1555. Fixed by adjusting viewBox to start at y=65 with height=1490, 
        and matching the sideStyles height to 1490px.
      </Paragraph>

      <Heading level={3}>Bug #4: Cards Not Spatially Related to Tick Marks</Heading>

      <Paragraph>
        At one point the SVG was 250px wide but the grid column was only 60px, causing a misalignment between 
        where cards appeared and where tick marks extended. The SVG width, viewBox width, and container width 
        all need to be coordinated.
      </Paragraph>

      <Heading level={2}>Design Evolution</Heading>

      <Paragraph>
        The component went through several design iterations:
      </Paragraph>

      <List>
        <ListItem><strong>Center-aligned → Left-aligned</strong>: Started with centered tick marks extending both directions, switched to left-aligned for cleaner visual flow</ListItem>
        <ListItem><strong>Dot indicators → Color coding</strong>: Removed small indicator dots in favor of making event tick marks purple (hsl 280°)</ListItem>
        <ListItem><strong>Variable thickness → Variable length</strong>: All marks are now 2px thick, differentiated only by length</ListItem>
        <ListItem><strong>Year labels</strong>: Added abbreviated year labels (26, 25, 24) using Sekuya font for better temporal orientation</ListItem>
        <ListItem><strong>Vertical space reduction</strong>: Halved the timeline height from 3000px to 1490px since cards collapse by default</ListItem>
      </List>

      <Heading level={2}>Tech Stack Details</Heading>

      <Paragraph>
        The component uses:
      </Paragraph>

      <List>
        <ListItem><strong>React</strong>: State management with useState for hover tracking and card expansion</ListItem>
        <ListItem><strong>Emotion</strong>: CSS-in-JS with css and keyframes for styling and animations</ListItem>
        <ListItem><strong>Next.js Font</strong>: Sekuya from next/font/google for year labels</ListItem>
        <ListItem><strong>SVG</strong>: All timeline rendering, tick marks, and year labels</ListItem>
        <ListItem><strong>TypeScript</strong>: Full type safety with custom TimelineEvent interface</ListItem>
      </List>

      <Heading level={2}>Code Organization</Heading>

      <Paragraph>
        The file structure follows a pattern I use across components:
      </Paragraph>

      <List>
        <ListItem>Imports and font setup at top</ListItem>
        <ListItem>TypeScript interfaces (TimelineEvent)</ListItem>
        <ListItem>Emotion keyframes for animations</ListItem>
        <ListItem>Emotion CSS styles (container, content, cards, etc)</ListItem>
        <ListItem>Component function with state</ListItem>
        <ListItem>Helper functions (getYPosition)</ListItem>
        <ListItem>Data array (devMilestones)</ListItem>
        <ListItem>JSX rendering logic</ListItem>
      </List>

      <Heading level={2}>Performance Considerations</Heading>

      <Paragraph>
        With 14 milestones and tick marks generated for every month from 2019-2026 (84 months), there are 
        ~100 SVG elements being rendered. The component performs well because:
      </Paragraph>

      <List>
        <ListItem>SVG is hardware-accelerated by browsers</ListItem>
        <ListItem>Hover state only re-renders affected elements</ListItem>
        <ListItem>Cards use CSS transitions (GPU-accelerated) for opacity changes</ListItem>
        <ListItem>No complex calculations in render - Y positions pre-calculated in data array</ListItem>
      </List>

      <Heading level={2}>What I'd Do Differently</Heading>

      <Paragraph>
        If I were to rebuild this component from scratch with what I know now:
      </Paragraph>

      <List>
        <ListItem>Start with the viewBox dimensions figured out instead of adjusting them repeatedly</ListItem>
        <ListItem>Use a more systematic approach to coordinate space (SVG space vs container space vs screen space)</ListItem>
        <ListItem>Add debug borders from the beginning to catch spatial issues early</ListItem>
        <ListItem>Consider using a library like D3.js for scale/axis management if the complexity grows</ListItem>
        <ListItem>Add accessibility - keyboard navigation and ARIA labels for screen readers</ListItem>
      </List>

      <Heading level={2}>Conclusion</Heading>

      <Paragraph>
        This component demonstrates that custom timeline UIs don't require heavy libraries - with SVG, React, 
        and some geometric calculations, you can build something both functional and visually interesting. The 
        key is understanding coordinate systems, managing state cleanly, and iterating on the design based on 
        what works visually.
      </Paragraph>

      <Paragraph>
        The full component code is available in <Link href="https://github.com/jaygriffinjay/jaygriff" target="_blank" rel="noopener noreferrer">
        my site's repository</Link> at <code>src/components/Timeline.tsx</code>.
      </Paragraph>
    </>
  );
}
