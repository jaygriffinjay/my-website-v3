import { PostMeta } from '@/types/post';
import { Heading, Paragraph, List, ListItem, Code } from '@/components/Primitives';
import { CodeBlock } from '@/components/CodeBlock/CodeBlock';

export const metadata: PostMeta = {
  title: 'NavBar Component',
  slug: 'navbar-component',
  date: '2026-02-03T10:00:00Z',
  updated: '2026-02-04T18:00:00Z',
  description: 'The fixed navigation bar that lives at the top of every page, featuring an animated title, search navigator, and menu system with elegant mobile responsiveness.',
  type: 'doc',
  tags: ['components', 'navigation', 'animation', 'mobile', 'responsive', 'flexbox'],
  feature: 'navbar',
  author: ['Jay Griffin', 'Claude Sonnet 4.5'],
  authorshipNote: 'Collaboratively written with Claude by summarizing work done and analyzing the code',
};

export default function NavBarComponentDoc() {
  return (
    <>
      <Heading level={1}>NavBar Component</Heading>
      
      <Paragraph>
        The NavBar is the primary navigation component that appears at the top of every page. 
        It provides quick access to search, menu navigation, and features an interactive animated title 
        that serves as the home link.
      </Paragraph>

      <Heading level={2}>Overview</Heading>
      
      <Paragraph>
        The navbar uses a fixed positioning strategy, staying visible at the top of the viewport as you scroll. 
        It has a floating pill design with a dark background, subtle border, and shadow effects that give it 
        depth and separation from the page content.
      </Paragraph>

      <Heading level={2}>Core Features</Heading>

      <List>
        <ListItem>
          <strong>Fixed positioning</strong> - Stays at top of viewport (1.5rem from top on desktop, 0 on mobile)
        </ListItem>
        <ListItem>
          <strong>Floating pill design</strong> - Rounded edges, backdrop blur, subtle border and shadow
        </ListItem>
        <ListItem>
          <strong>Interactive title</strong> - "Jay Griffin" text with hover gradient effect and particle animations
        </ListItem>
        <ListItem>
          <strong>Navigator integration</strong> - Search/filter component for quick page access
        </ListItem>
        <ListItem>
          <strong>Menu system</strong> - Hamburger menu with all site navigation
        </ListItem>
        <ListItem>
          <strong>Responsive design</strong> - Adapts sizing and spacing for mobile devices
        </ListItem>
      </List>

      <Heading level={2}>Layout and Positioning</Heading>

      <Paragraph>
        The navbar was originally positioned at the bottom of the screen but was moved to the top for better 
        usability. This required several cascading changes including body padding (6rem on desktop, 4rem on mobile) 
        to prevent content from being hidden underneath, and updating the Navigator and NavMenu popovers to open 
        downward instead of upward.
      </Paragraph>

      <Paragraph>
        The component uses <Code>position: fixed</Code> rather than <Code>position: sticky</Code> because the 
        latter caused annoying elastic scroll behavior on macOS. The tradeoff is requiring explicit body padding, 
        but this provides a more consistent experience across devices.
      </Paragraph>

      <Heading level={2}>Child Components</Heading>

      <Paragraph>
        The navbar orchestrates three main components:
      </Paragraph>

      <List>
        <ListItem>
          <strong>NavMenu</strong> - Dropdown menu with links to posts, docs, commits, and other sections. 
          Uses Radix UI DropdownMenu with <Code>modal=false</Code> to prevent body scroll lock. Closes automatically 
          on scroll.
        </ListItem>
        <ListItem>
          <strong>Title Link</strong> - The "Jay Griffin" text that links to the homepage. Features hover gradient 
          and particle effects. Uses the Sekuya font for distinctive styling.
        </ListItem>
        <ListItem>
          <strong>Navigator</strong> - Popover with search functionality for filtering and navigating to pages. 
          Auto-focuses search input on desktop but not mobile (to prevent keyboard popup). Also closes on scroll.
        </ListItem>
      </List>

      <Heading level={2}>Particle Effect Implementation</Heading>

      <Paragraph>
        One of the most distinctive features of the navbar is the animated particle effect on the title. 
        When you hover over "Jay Griffin", small cyan particles spawn and float outward in random directions, 
        creating a dynamic, playful effect that complements the gradient color shift.
      </Paragraph>

      <Heading level={3}>How It Works</Heading>
      
      <Paragraph>
        The particle system uses an interval that generates new particles every 150ms while hovering. 
        Each particle floats outward in a random direction, fading out over 1.5 seconds before being removed 
        from the DOM.
      </Paragraph>

      <CodeBlock language="typescript" filename="NavBar.tsx (simplified)">
{`const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
  setIsHovered(true);
  isHoveredRef.current = true;
  const rect = e.currentTarget.getBoundingClientRect();
  
  intervalRef.current = setInterval(() => {
    const x = Math.random() * rect.width;
    const y = Math.random() * rect.height;
    const angle = Math.random() * Math.PI * 2;
    const distance = 40 + Math.random() * 40;
    
    const particle = {
      id: particleIdRef.current++,
      x,
      y,
      tx: Math.cos(angle) * distance,
      ty: Math.sin(angle) * distance,
    };

    // Only add if still hovering
    setParticles(prev => {
      if (!isHoveredRef.current) return prev;
      return [...prev, particle];
    });

    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== particle.id));
    }, 1500);
  }, 150);
};`}
      </CodeBlock>

      <Heading level={2}>The Particle Synchronization Challenge</Heading>

      <Paragraph>
        While implementing the particle effects, I ran into a deceptively difficult problem: keeping the particles 
        perfectly synchronized with the hover state. My requirement was simple - particles should only exist when 
        the title is highlighted. If there's no gradient, there should be no particles. They should be logically 
        intertwined, making it physically impossible for one to exist without the other.
      </Paragraph>

      <Paragraph>
        This turned out to be much harder than expected because of subtle timing issues between 
        CSS <Code>:hover</Code> state and JavaScript mouse events, particularly on mobile devices.
      </Paragraph>

      <Heading level={3}>Failed Attempts</Heading>

      <List>
        <ListItem>
          <strong>Touch event handlers</strong> - Added <Code>onTouchStart</Code>, <Code>onTouchEnd</Code>, 
          <Code>onTouchMove</Code> with boundary detection. Problem: mobile browsers don't fire touch move events 
          during scrolling, so particles continued when I scrolled away from the title.
        </ListItem>
        <ListItem>
          <strong>Scroll listeners</strong> - Added a window scroll listener to stop particles when scrolling. 
          Problem: caused buggy behavior, particles would stop during normal page scrolling even when not touching the title.
        </ListItem>
        <ListItem>
          <strong>Complex touch boundary checking</strong> - Used <Code>getBoundingClientRect()</Code> to check if 
          touch coordinates were still within the element. Problem: either fired incorrectly or didn't fire at all 
          during certain gestures.
        </ListItem>
      </List>

      <Heading level={3}>The Solution: Ref-Based State Tracking</Heading>

      <Paragraph>
        The breakthrough was using a ref to track hover state that the interval closure could access in real-time. 
        Here's the key insight: the interval's callback captures variables at creation time, so checking a state 
        variable won't work - it always sees the initial value.
      </Paragraph>

      <CodeBlock language="typescript" filename="The fix">
{`// Both state (for UI) and ref (for interval closure)
const [isHovered, setIsHovered] = useState(false);
const isHoveredRef = useRef(false);

const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
  setIsHovered(true);
  isHoveredRef.current = true;  // Update ref immediately
  // ... start interval
};

const handleMouseLeave = () => {
  setIsHovered(false);
  isHoveredRef.current = false;  // Update ref immediately
  // Stop interval and clear particles
  if (intervalRef.current) {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }
  setParticles([]);  // Clear all particles immediately
};

// Inside the interval
setParticles(prev => {
  if (!isHoveredRef.current) return prev;  // Check ref, not state!
  return [...prev, particle];
});`}
      </CodeBlock>

      <Heading level={3}>Why This Works</Heading>

      <List>
        <ListItem>
          <Code>isHoveredRef.current</Code> is checked before adding each particle, making it physically 
          impossible to add particles when not hovering
        </ListItem>
        <ListItem>
          <Code>setParticles([])</Code> in <Code>handleMouseLeave</Code> immediately clears all existing particles, 
          so there's no fade-out delay
        </ListItem>
        <ListItem>
          Simple mouse events only - no complex touch handling. Browsers naturally convert touch events to mouse 
          events, and the hover state tracking handles all edge cases
        </ListItem>
        <ListItem>
          The CSS <Code>:hover</Code> and JavaScript hover state stay perfectly synchronized because they both 
          respond to the same underlying mouse/touch events
        </ListItem>
      </List>

      <Heading level={2}>Lessons Learned</Heading>

      <List>
        <ListItem>
          Simple is better - the final solution removed all complex touch handling and just trusts the browser's 
          mouse event abstraction
        </ListItem>
        <ListItem>
          Interval closures capture variables at creation time - use refs for values that need to be checked in real-time
        </ListItem>
        <ListItem>
          Mobile scrolling suppresses touch move events - can't rely on <Code>onTouchMove</Code> for tracking
        </ListItem>
        <ListItem>
          When synchronizing visual effects with hover state, clearing state immediately on mouse leave is crucial 
          for maintaining the illusion of tight coupling
        </ListItem>
        <ListItem>
          Sometimes the best mobile solution is to let the browser handle touch-to-mouse event conversion rather 
          than trying to handle touch events explicitly
        </ListItem>
      </List>

      <Heading level={2}>Technical Implementation Details</Heading>

      <Paragraph>
        The NavBar component maintains several pieces of state to manage the particle system:
      </Paragraph>

      <CodeBlock language="typescript">
{`const [particles, setParticles] = useState<Particle[]>([]);
const [isHovered, setIsHovered] = useState(false);
const isHoveredRef = useRef(false);
const intervalRef = useRef<NodeJS.Timeout | null>(null);
const particleIdRef = useRef(0);`}
      </CodeBlock>

      <List>
        <ListItem><Code>particles</Code> - Array of active particles with position and velocity data</ListItem>
        <ListItem><Code>isHovered</Code> - State for potential future UI needs</ListItem>
        <ListItem><Code>isHoveredRef</Code> - Ref for real-time hover checking in interval closure</ListItem>
        <ListItem><Code>intervalRef</Code> - Reference to the active particle generation interval</ListItem>
        <ListItem><Code>particleIdRef</Code> - Counter for unique particle IDs</ListItem>
      </List>

      <Paragraph>
        The particles are rendered as absolutely positioned divs with a CSS animation that fades them out while 
        moving them outward. Each particle knows its starting position and travel vector, and CSS custom properties 
        handle the animation.
      </Paragraph>

      <Heading level={2}>Styling and Theme Integration</Heading>

      <Paragraph>
        The navbar uses Emotion for styling with a combination of static styles and responsive breakpoints. 
        Key design elements include:
      </Paragraph>

      <List>
        <ListItem>
          <strong>Background</strong> - Dark (#1a1a24) with subtle transparency and backdrop blur
        </ListItem>
        <ListItem>
          <strong>Border</strong> - White with 10% opacity plus a shadow for depth
        </ListItem>
        <ListItem>
          <strong>Typography</strong> - Sekuya font at 2.5rem (clamps down to 1.25rem on mobile)
        </ListItem>
        <ListItem>
          <strong>Hover gradient</strong> - Linear gradient from cyan (#00d4ff) to navy blue (#1e3a8a)
        </ListItem>
        <ListItem>
          <strong>Particles</strong> - 3px cyan dots with CSS keyframe animation
        </ListItem>
      </List>

      <Heading level={2}>Responsive Behavior</Heading>

      <Paragraph>
        The navbar went through a significant layout refactor to achieve perfect centering with responsive behavior. 
        Initially attempted with absolute positioning (which caused collision issues), the final solution uses a 
        clean three-column flexbox architecture.
      </Paragraph>

      <Heading level={3}>Current Layout Architecture</Heading>

      <Paragraph>
        The navbar uses <Code>display: flex</Code> with <Code>justifyContent: space-between</Code> to create 
        three distinct columns:
      </Paragraph>

      <List>
        <ListItem>
          <strong>Left Controls</strong> - Fixed-width column (<Code>flex: 0 0 auto</Code>) containing the 
          hamburger menu and search icons (~84px total)
        </ListItem>
        <ListItem>
          <strong>Title Container</strong> - Growing center column (<Code>flex: 1 1 auto</Code>) that centers 
          the "Jay Griffin" title via <Code>justifyContent: center</Code>
        </ListItem>
        <ListItem>
          <strong>Right Spacer</strong> - Fixed-width empty column (<Code>flex: 0 0 auto, width: 84px</Code>) 
          that matches the left controls width for perfect symmetry
        </ListItem>
      </List>

      <Paragraph>
        This architecture naturally prevents element collisions - when the viewport shrinks, the flex container 
        automatically manages space distribution without elements overlapping.
      </Paragraph>

      <Heading level={3}>Responsive Breakpoints</Heading>

      <Paragraph>
        At <strong>550px and below</strong>, the navbar applies two simultaneous changes:
      </Paragraph>

      <List>
        <ListItem>
          <strong>Font resize</strong> - Title shrinks from <Code>2.5rem</Code> to <Code>2rem</Code>
        </ListItem>
        <ListItem>
          <strong>Layout shift</strong> - Title container changes to <Code>justifyContent: flex-end</Code> 
          (right-aligned) and the right spacer hides (<Code>display: none</Code>)
        </ListItem>
      </List>

      <Paragraph>
        The 550px breakpoint targets the "dead zone" - larger than phones in portrait (~430px max) but smaller 
        than tablets (768px+). This catches landscape phones, narrow browser windows, and very small tablets.
      </Paragraph>

      <Heading level={3}>Design Philosophy: 90% Coverage</Heading>

      <Paragraph>
        The responsive strategy deliberately targets modern devices and practical viewport sizes. The layout 
        works perfectly down to 375px (iPhone SE), which covers the vast majority of mobile users in 2026. 
        Below ~355px, the layout may break slightly, but these edge cases represent ancient devices with 
        negligible market share.
      </Paragraph>

      <Paragraph>
        As I said during development: "I'm all about doing half the work for capturing 90% of the use cases. 
        If you're on Internet Explorer, go throw your computer in the trash. If you're on iPhone 5, 
        you're a walking security risk."
      </Paragraph>

      <Heading level={3}>What We Removed</Heading>

      <Paragraph>
        The final implementation is significantly simpler than earlier attempts. Removed features include:
      </Paragraph>

      <List>
        <ListItem>
          <strong>Absolute positioning</strong> - Initially tried to center the title with <Code>position: absolute, 
          left: 50%, transform: translateX(-50%)</Code> but this caused height collapse and collision issues
        </ListItem>
        <ListItem>
          <strong>Pointer events workarounds</strong> - The absolute positioned title blocked clicks, requiring 
          <Code>pointerEvents: none</Code> patches
        </ListItem>
        <ListItem>
          <strong>Z-index stacking fixes</strong> - Absolute positioning created overlay issues that needed z-index 
          management
        </ListItem>
        <ListItem>
          <strong>Text overflow ellipsis</strong> - Briefly tried truncating the name ("Jay Griff...") which was 
          immediately rejected as it felt wrong for personal branding
        </ListItem>
        <ListItem>
          <strong>Complex responsive font scaling</strong> - Originally used <Code>clamp(1rem, 5vw, 2.5rem)</Code> 
          for fluid font scaling, but the simpler two-size approach (2.5rem → 2rem at 550px) is cleaner
        </ListItem>
        <ListItem>
          <strong>Nested container divs</strong> - The old <Code>navBarContentStyles</Code> wrapper is gone; 
          the nav element itself is now the flex container
        </ListItem>
      </List>

      <Heading level={3}>Mobile-Specific Behaviors</Heading>

      <Paragraph>
        Beyond the 550px breakpoint, mobile devices get these optimizations:
      </Paragraph>

      <List>
        <ListItem>Navbar sits at the very top of the screen (top: 0)</ListItem>
        <ListItem>Smaller icon buttons (maintain usability with reduced size)</ListItem>
        <ListItem>Navigator search input doesn't auto-focus (prevents unwanted keyboard popup)</ListItem>
        <ListItem>iOS tap highlights disabled (<Code>-webkit-tap-highlight-color: transparent</Code>)</ListItem>
      </List>

      <Heading level={2}>Future Improvements</Heading>

      <Paragraph>
        Possible enhancements for the navbar:
      </Paragraph>

      <List>
        <ListItem>Add visual indicator for current page/section</ListItem>
        <ListItem>Experiment with different particle shapes or colors based on theme</ListItem>
        <ListItem>Add keyboard shortcuts for opening Navigator (⌘K style)</ListItem>
        <ListItem>Consider adding breadcrumb navigation for deeper page hierarchies</ListItem>
      </List>

      <Heading level={2}>Related Components</Heading>
      
      <Paragraph>
        The navbar integrates closely with Navigator and NavMenu components. It also works in concert with 
        the global body padding defined in GlobalStyles to ensure content isn't hidden underneath the fixed positioning.
      </Paragraph>
    </>
  );
}
