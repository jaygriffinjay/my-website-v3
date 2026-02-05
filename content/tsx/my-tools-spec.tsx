import { Heading, Paragraph, List, ListItem, Code } from '@/components/Primitives';
import { CodeBlock } from '@/components/CodeBlock/CodeBlock';
import type { PostMeta } from '@/types/post';

export const metadata: PostMeta = {
  title: 'My Stack Spec',
  slug: 'my-stack-spec',
  date: '2026-02-04T00:00:00Z',
  author: ['Jay Griffin', 'Claude Sonnet 4.5'],
  type: 'doc',
  projectId: 'jaygriff',
  description: 'Spec for my stack page - filterable categories showing what I use, what I\'m watching, what I retired, and why',
  tags: ['feature-spec', 'ux', 'design'],
  authorshipNote: 'Spec emerged organically from building the page',
};

const MyToolsInteractivePortfolioSpec = () => {
  return (
    <>
      <Heading level={2}>Vision</Heading>
      <Paragraph>
        The My Stack page shows what I actually use, what I'm following, and what I've retired—with the stories behind those choices. Instead of just listing "I use React," it explains <em>why</em> I picked React, what I moved away from, and what I'm actively exploring. Filter by AI dev, homelab, superseded tools, whatever—each view tells a different story about how my stack evolved.
      </Paragraph>
      <Paragraph>
        It's basically a living document of my technical worldview and how it changes over time.
      </Paragraph>

      <Heading level={2}>Problem Statement</Heading>
      <Paragraph>
        Most tool pages are boring as hell:
      </Paragraph>
      <List>
        <ListItem><strong>Static lists:</strong> "Proficient in React, TypeScript, Python" means nothing—where's the context?</ListItem>
        <ListItem><strong>No filtering:</strong> Can't drill down to AI stuff vs infrastructure vs creative tools</ListItem>
        <ListItem><strong>Missing migration stories:</strong> Nobody explains why they moved from Tailwind to Emotion, or Django to Next.js</ListItem>
        <ListItem><strong>Overwhelming:</strong> 60+ tools in one endless scroll = cognitive overload</ListItem>
        <ListItem><strong>No narrative:</strong> Just logos and names, no explanation of technical choices</ListItem>
      </List>

      <Heading level={2}>Core Philosophy</Heading>
      <Paragraph>
        This documents my technical worldview. It's not about flexing expertise—it's about showing:
      </Paragraph>
      <List>
        <ListItem>What I actually use day-to-day and why</ListItem>
        <ListItem>Tech I'm following and what makes it interesting</ListItem>
        <ListItem>Tools I've retired and what I learned from the switch</ListItem>
        <ListItem>Stuff I respect but haven't deployed yet (aspirational homelab vibes)</ListItem>
        <ListItem>How my stack evolved over time</ListItem>
      </List>
      <Paragraph>
        The goal: show technical reasoning. React for components over templates. Tailwind → Emotion when I needed more control. Actively studying distributed AI. That kind of thing.
      </Paragraph>

      <Heading level={2}>Current Implementation (Phase 1)</Heading>
      <Heading level={3}>Component Architecture</Heading>
      <CodeBlock language="typescript" filename="src/app/my-tools/test/page.tsx">
{`// ToolCard component (reusable)
<ToolCard 
  logo="/tool-logos/react.svg"
  title="React"
  description="Component architecture for ui"
  invert={false} // white logos need inversion
/>

// ColoredHeading (custom styled component)
const ColoredHeading = styled.h2\`
  color: hsl(210, 100%, 60%);
  font-family: var(--font-sekuya), sans-serif;
  font-size: 2rem;
  margin: 3rem 0 1rem 0;
\`;

// Section pattern (17 sections currently)
<ColoredHeading>Section Title</ColoredHeading>
<div style={{ margin: '3rem 0' }}>
  <Paragraph>Narrative description...</Paragraph>
</div>
<div style={gridContainerStyle}>
  <ToolCard ... />
  <ToolCard ... />
</div>
<Divider />`}
      </CodeBlock>

      <Heading level={3}>Current Sections (17 Total)</Heading>
      <List ordered>
        <ListItem><strong>Software I'm Following</strong> (6 tools): Cursor, Claude Code, GitHub Copilot SDK, Claude Cowork, Codex, Exo</ListItem>
        <ListItem><strong>Software I Plan to Use</strong> (2 tools): LangChain, LangSmith</ListItem>
        <ListItem><strong>Homelab & Self-Hosting</strong> (10 tools): Ollama, Open WebUI, Proxmox, Grafana, Hetzner, TrueNAS, Home Assistant, Prometheus, Unraid, OpenMediaVault</ListItem>
        <ListItem><strong>Languages</strong> (6 tools): TypeScript, JavaScript, Python, HTML, CSS, Shell</ListItem>
        <ListItem><strong>Core Dev Stack</strong> (12 tools): React, Next.js, Vite, Emotion, Vercel, Cloudflare, Git, GitHub, GitHub Copilot, VS Code, Chrome DevTools, jaygriff.com</ListItem>
        <ListItem><strong>Chatbots</strong> (3 tools): ChatGPT, Claude, Gemini</ListItem>
        <ListItem><strong>Vibecoding</strong> (2 tools): Lovable.dev, Bolt.new</ListItem>
        <ListItem><strong>Productivity</strong> (6 tools): Notion, Obsidian, Excel, Google Sheets, Office Suite, Locus</ListItem>
        <ListItem><strong>Photo & Image Editing</strong> (2 tools): Affinity, Canva</ListItem>
        <ListItem><strong>Video Recording</strong> (1 tool): OBS</ListItem>
        <ListItem><strong>Design & Color Tools</strong> (2 tools): Figma, Coolors</ListItem>
        <ListItem><strong>OS Automation</strong> (2 tools): Hammerspoon, AutoHotKey</ListItem>
        <ListItem><strong>CSS Frameworks (Superseded)</strong> (2 tools): Tailwind, DaisyUI</ListItem>
        <ListItem><strong>Web Frameworks (Superseded)</strong> (4 tools): Django, Flask, Express, WordPress</ListItem>
        <ListItem><strong>Static Site Generators (Superseded)</strong> (2 tools): Hugo, Jekyll</ListItem>
        <ListItem><strong>Hosting & Infrastructure (Superseded)</strong> (1 tool): Netlify</ListItem>
        <ListItem><strong>Tools Vanquished by Affinity</strong> (4 tools): Photoshop, Photopea, Inkscape, GIMP</ListItem>
      </List>

      <Heading level={2}>Phase 2: Filtering System (Planned)</Heading>
      <Heading level={3}>Filter Categories</Heading>
      <Paragraph>
        Each filter creates a curated view with its own narrative:
      </Paragraph>
      <List>
        <ListItem><strong>All:</strong> Gallery mode—just logos and names, minimal cognitive load, quick scanning</ListItem>
        <ListItem><strong>AI Dev / AI Engineering:</strong> Cursor, Claude Code, GitHub Copilot SDK, Exo, LangChain, LangSmith, Chatbots, Vibecoding tools—shows AI-native development workflow</ListItem>
        <ListItem><strong>Homelab / Infrastructure:</strong> All 10 homelab tools with narrative: "I respect this deeply even though I don't run one yet"</ListItem>
        <ListItem><strong>Superseded / Retired:</strong> CSS Frameworks, Web Frameworks, Static Site Generators, Hosting, Affinity-vanquished—tells migration stories</ListItem>
        <ListItem><strong>Creative & Productivity:</strong> Productivity, Photo/Image Editing, Video Recording, Design & Color Tools—shows creative workflow</ListItem>
        <ListItem><strong>What I'm Following:</strong> Software I'm Following section—what's on my radar for adoption</ListItem>
        <ListItem><strong>What I'm Studying:</strong> Meta-category about learning vibe coding architecture, AI assistant internals, distributed inference systems</ListItem>
        <ListItem><strong>Core Stack / Daily Toolkit:</strong> Languages, Core Dev Stack—everyday tools, production-ready</ListItem>
      </List>

      <Heading level={3}>Filter-Specific Narratives</Heading>
      <Paragraph>
        Each filter gets its own introductory paragraph explaining context. Examples:
      </Paragraph>
      <CodeBlock language="typescript">
{`const filterIntros = {
  'ai-dev': \`I build with AI-native tools daily. Not just using ChatGPT—I'm 
    deep into system prompts, context management, tool-calling patterns, and 
    distributed inference. This is where I see development heading.\`,
    
  'homelab': \`I respect homelab culture deeply even though I don't run one yet. 
    Proxmox, TrueNAS, Grafana—I'm studying these because self-hosting, 
    infrastructure ownership, and local-first AI are where I want to grow.\`,
    
  'superseded': \`These are tools I've retired, but each migration taught 
    something valuable. Tailwind → Emotion: realized CSS-in-JS gives more 
    control. Django → Next.js: discovered React components changed how I think 
    about UI. WordPress → Custom: understood the power of owning your stack.\`,
    
  'studying': \`I'm not just using tools—I'm studying how they're built. 
    Fascinated by Cursor's architecture, Claude Sonnet's context management, 
    distributed inference patterns in Exo. Want to understand internals, not 
    just APIs.\`
};`}
      </CodeBlock>

      <Heading level={3}>State Management</Heading>
      <CodeBlock language="typescript">
{`// Client component with useState
'use client';

const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

// Filter button component
interface FilterButtonProps {
  label: string;
  category: FilterCategory;
  active: boolean;
  onClick: () => void;
}

// Conditional rendering
{activeFilter === 'all' && <GalleryView tools={allTools} />}
{activeFilter === 'ai-dev' && (
  <>
    <FilterIntro text={filterIntros['ai-dev']} />
    <ToolSection title="AI Development Tools" tools={aiDevTools} />
  </>
)}`}
      </CodeBlock>

      <Heading level={3}>Tag System (Cross-Cutting Concerns)</Heading>
      <Paragraph>
        Some tools belong in multiple categories. Use tags for flexible filtering:
      </Paragraph>
      <CodeBlock language="typescript">
{`interface ToolData {
  logo: string;
  title: string;
  description: string;
  invert?: boolean;
  tags: string[]; // e.g., ['ai', 'dev', 'core-stack']
  status: 'active' | 'watching' | 'want-to-use' | 'superseded';
}

// Example
const tools: ToolData[] = [
  {
    logo: '/tool-logos/cursor.svg',
    title: 'Cursor',
    description: 'Ai-first code editor',
    tags: ['ai', 'dev', 'core-stack', 'following'],
    status: 'active'
  },
  {
    logo: '/tool-logos/vercel.svg',
    title: 'Vercel',
    description: 'Serverless deployment platform',
    tags: ['infrastructure', 'hosting', 'core-stack'],
    status: 'active'
  }
];`}
      </CodeBlock>

      <Heading level={2}>UX Requirements</Heading>
      <Heading level={3}>Gallery Mode (All View)</Heading>
      <List>
        <ListItem><strong>Compact grid:</strong> Just logos and titles, no descriptions</ListItem>
        <ListItem><strong>Quick scanning:</strong> See 60+ tools at a glance</ListItem>
        <ListItem><strong>No cognitive load:</strong> Minimal text, maximum visual recognition</ListItem>
        <ListItem><strong>Click to filter:</strong> Clicking a tool could auto-filter to its primary category</ListItem>
      </List>

      <Heading level={3}>Filtered Views</Heading>
      <List>
        <ListItem><strong>Rich narrative intro:</strong> Context-setting paragraph at top</ListItem>
        <ListItem><strong>Full descriptions:</strong> Show ToolCards with complete text</ListItem>
        <ListItem><strong>Grouped sections:</strong> Related tools together with subheadings</ListItem>
        <ListItem><strong>Migration stories:</strong> For "Superseded" view, explain why tools were retired</ListItem>
      </List>

      <Heading level={3}>Filter Button Design</Heading>
      <CodeBlock language="typescript">
{`// Filter bar at top of page
<FilterBar>
  <FilterButton label="All" category="all" active={activeFilter === 'all'} />
  <FilterButton label="AI Dev" category="ai-dev" active={activeFilter === 'ai-dev'} />
  <FilterButton label="Homelab" category="homelab" active={activeFilter === 'homelab'} />
  <FilterButton label="Superseded" category="superseded" active={activeFilter === 'superseded'} />
  <FilterButton label="Creative" category="creative" active={activeFilter === 'creative'} />
  <FilterButton label="Core Stack" category="core-stack" active={activeFilter === 'core-stack'} />
</FilterBar>

// Active state styling
const FilterButton = styled.button<{ active: boolean }>\`
  background: \${props => props.active ? 'hsl(210, 100%, 60%)' : 'transparent'};
  color: \${props => props.active ? 'white' : 'hsl(210, 100%, 60%)'};
  border: 2px solid hsl(210, 100%, 60%);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: hsl(210, 100%, 60%);
    color: white;
  }
\`;`}
      </CodeBlock>

      <Heading level={2}>Filter Examples</Heading>
      <Heading level={3}>AI Dev Filter</Heading>
      <Paragraph>
        Shows: Cursor, Claude Code, GitHub Copilot SDK, Exo, LangChain, LangSmith, Chatbots, Vibecoding tools
      </Paragraph>
      <Paragraph>
        Intro could be: "I build with AI-native tools daily. Not just using ChatGPT—deep into system prompts, context management, tool-calling patterns, local inference."
      </Paragraph>

      <Heading level={3}>Homelab Filter</Heading>
      <Paragraph>
        Shows: All 10 homelab tools (Ollama, Open WebUI, Proxmox, TrueNAS, Grafana, etc.)
      </Paragraph>
      <Paragraph>
        Intro could be: "I love homelab even though I don't run a lot of hardware. Studying Proxmox, TrueNAS, Grafana because self-hosting and local-first AI is where I want to grow."
      </Paragraph>

      <Heading level={3}>Superseded Filter</Heading>
      <Paragraph>
        Shows: Retired tools with migration stories
      </Paragraph>
      <List>
        <ListItem><strong>Tailwind → Emotion:</strong> Realized CSS-in-JS gives more control for constraint-based design systems</ListItem>
        <ListItem><strong>Django → Next.js:</strong> React components changed how I think about UI composition</ListItem>
        <ListItem><strong>WordPress → Custom:</strong> Understood the power of owning your entire stack</ListItem>
        <ListItem><strong>Photoshop → Affinity:</strong> Professional design tools without subscription lock-in</ListItem>
      </List>

      <Heading level={2}>Implementation Roadmap</Heading>
      <Heading level={3}>Phase 1: Current State ✓</Heading>
      <List>
        <ListItem>17 sections with consistent structure</ListItem>
        <ListItem>60+ tools with logos, titles, descriptions</ListItem>
        <ListItem>ColoredHeading + Paragraph + ToolCards pattern</ListItem>
        <ListItem>All descriptions capitalized</ListItem>
        <ListItem>Homelab section created and populated</ListItem>
      </List>

      <Heading level={3}>Phase 2: Data Refactor (Next)</Heading>
      <List>
        <ListItem>Extract tools into data structure (tools.ts)</ListItem>
        <ListItem>Add tags array to each tool</ListItem>
        <ListItem>Add status field (active, watching, want-to-use, superseded)</ListItem>
        <ListItem>Map current sections to tool tags</ListItem>
      </List>

      <Heading level={3}>Phase 3: Filter UI (Following Phase 2)</Heading>
      <List>
        <ListItem>Create FilterButton component</ListItem>
        <ListItem>Add useState for active filter</ListItem>
        <ListItem>Implement filter bar at top of page</ListItem>
        <ListItem>Write filter-specific intro paragraphs</ListItem>
        <ListItem>Create conditional rendering logic</ListItem>
      </List>

      <Heading level={3}>Phase 4: Gallery Mode (Following Phase 3)</Heading>
      <List>
        <ListItem>Design compact ToolCard variant (logo + title only)</ListItem>
        <ListItem>Create GalleryView component</ListItem>
        <ListItem>Implement grid layout with responsive sizing</ListItem>
        <ListItem>Add hover states for quick tool info</ListItem>
      </List>

      <Heading level={3}>Phase 5: Migration Stories (Final Polish)</Heading>
      <List>
        <ListItem>Write detailed migration narratives for Superseded view</ListItem>
        <ListItem>Add "What I Learned" sections for retired tools</ListItem>
        <ListItem>Create timeline visualization of stack evolution</ListItem>
        <ListItem>Add "Why I'm Watching" stories for Following view</ListItem>
      </List>

      <Heading level={2}>Success Metrics</Heading>
      <List>
        <ListItem><strong>Self-serve navigation:</strong> People can drill down to specific interests without scrolling endlessly</ListItem>
        <ListItem><strong>Story resonance:</strong> Migration stories and "What I'm Studying" sections land well</ListItem>
        <ListItem><strong>Better than static lists:</strong> More interesting than typical "skills" pages</ListItem>
        <ListItem><strong>Personal clarity:</strong> Acts as living document of my own technical evolution</ListItem>
      </List>

      <Heading level={2}>Technical Debt & Future Considerations</Heading>
      <Heading level={3}>Known Issues</Heading>
      <List>
        <ListItem><strong>Missing logo:</strong> <Code>/tool-logos/codex.svg</Code> returns 404</ListItem>
        <ListItem><strong>No search:</strong> 60+ tools with no search functionality yet</ListItem>
        <ListItem><strong>Manual data entry:</strong> All tools hardcoded in JSX, no CMS or data file</ListItem>
        <ListItem><strong>No timestamps:</strong> Can't track when tools were added/removed over time</ListItem>
      </List>

      <Heading level={3}>Future Enhancements</Heading>
      <List>
        <ListItem><strong>Tool detail pages:</strong> Click a tool to see full usage notes, projects built with it, learning resources</ListItem>
        <ListItem><strong>Timeline view:</strong> Visualize stack evolution over time (2020: Python/Django → 2022: React/Next.js → 2024: AI-native)</ListItem>
        <ListItem><strong>Project cross-references:</strong> Link tools to specific projects (e.g., "Used React + Emotion to build jaygriff.com")</ListItem>
        <ListItem><strong>Learning notes:</strong> Embed thoughts on each tool—why I chose it, what problems it solves, gotchas discovered</ListItem>
      </List>

      <Heading level={2}>Conclusion</Heading>
      <Paragraph>
        This is about showing technical decision-making. Not a static skill list—it tells stories about why I switched tools, what I'm exploring, and how my stack evolved.
      </Paragraph>
      <Paragraph>
        Filter by AI dev to see the AI-native workflow. Click Superseded for migration stories. Hit Homelab to see aspirational infrastructure interests. Each view is its own narrative about how I think about tech.
      </Paragraph>
    </>
  );
};

export default MyToolsInteractivePortfolioSpec;
