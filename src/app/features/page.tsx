import { Heading, Paragraph, List, ListItem, Container, Link } from '@/components/Primitives';
import { ContentWrapper } from '@/components/ContentWrapper';
import type { PostMeta } from '@/types/post';

export const routeMetadata: PostMeta = {
  title: 'jaygriff.com Features',
  slug: 'features',
  date: '2026-01-27T00:00:00Z',
  updated: '2026-02-03T00:00:00Z',
  author: 'Jay Griffin',
  type: 'doc',
  description: 'Comprehensive list of features, architecture decisions, and capabilities that make this site a powerful development platform',
  tags: ['features', 'completed', 'architecture', 'development'],
  path: '/features',
};

export default function FeaturesDoc() {
  return (
    <Container size="sm">
      <ContentWrapper>
        <Heading level={1}>{routeMetadata.title}</Heading>
        
        <Paragraph>
          This isn't just a website—it's a full-stack development platform built from scratch with Next.js, TypeScript, and React. 
          Every feature here was designed to make building and shipping faster, better, and more enjoyable.
        </Paragraph>

        <Heading level={2}>🎨 Content & Design System</Heading>

        <Heading level={3}>Dual Content System</Heading>
        <Paragraph>
          Flexible content architecture supporting both formats with automatic discovery:
        </Paragraph>
        <List>
          <ListItem><strong>TSX Components</strong> - Full React power for interactive pages, custom layouts, and complex compositions</ListItem>
          <ListItem><strong>Markdown Files</strong> - Write in markdown with JSON frontmatter, auto-renders with primitives via react-markdown + remark-gfm</ListItem>
          <ListItem><strong>Zero Config</strong> - Drop a file in content/, add metadata, it appears on the site. No build config, no manual registration</ListItem>
          <ListItem><strong>Unified Metadata</strong> - Same PostMeta interface for both formats, consistent routing and discovery</ListItem>
        </List>

        <Heading level={3}>Primitive Component System</Heading>
        <Paragraph>
          Constraint-based design system optimized for AI composition and consistent styling:
        </Paragraph>
        <List>
          <ListItem><strong>Core Primitives</strong> - Heading, Paragraph, List, Link, Code, Table, Blockquote, Container, Stack, Flex, Box</ListItem>
          <ListItem><strong>Theme Integration</strong> - All primitives connected to live theme system with real-time updates</ListItem>
          <ListItem><strong>Composable by Design</strong> - AI can generate beautiful pages by composing primitives without custom CSS</ListItem>
          <ListItem><strong>Fix Once, Apply Everywhere</strong> - Update Link primitive to use Next.js Link → entire site gets SPA navigation</ListItem>
          <ListItem><strong>Emotion CSS-in-JS</strong> - Dynamic styling, theme access, TypeScript support</ListItem>
        </List>

        <Heading level={3}>CodeBlock Component</Heading>
        <Paragraph>
          Syntax-highlighted code display with polished interactions:
        </Paragraph>
        <List>
          <ListItem><strong>Multi-Language Support</strong> - TypeScript, JavaScript, React (TSX/JSX), CSS, HTML, Markdown, Bash/Shell with Prism.js</ListItem>
          <ListItem><strong>File Icons</strong> - Language-specific icons in header (TypeScript logo, React logo, shell icon, etc.)</ListItem>
          <ListItem><strong>Hover-Only Copy Button</strong> - Reduces visual clutter, appears smoothly on hover with crossfaded SVG icons</ListItem>
          <ListItem><strong>Smart Copy Feedback</strong> - Checkmark persists during 2s animation even when cursor leaves, instant hide when animation completes if not hovering</ListItem>
          <ListItem><strong>No Flash Transitions</strong> - data-copied attribute with transition:none prevents brief visibility flashes</ListItem>
          <ListItem><strong>Custom Language Styling</strong> - Bash/shell uses terminal green, other languages get VS Code Dark+ theme</ListItem>
        </List>

        <Heading level={3}>ContentHeader with Smart Tooltips</Heading>
        <Paragraph>
          Metadata display with intelligent tooltip positioning:
        </Paragraph>
        <List>
          <ListItem><strong>Multiple Update Dates</strong> - Supports string | string[] for pages with many edits, displays as ordered list</ListItem>
          <ListItem><strong>Auto-Flip Positioning</strong> - Tooltips detect viewport overflow using getBoundingClientRect() and flip from above to below automatically</ListItem>
          <ListItem><strong>Hover Delay Logic</strong> - 0.5s delay before showing prevents appearing when cursor sweeps across, 0.15s fast disappear on leave</ListItem>
          <ListItem><strong>Authorship Notes</strong> - Optional asterisk-triggered tooltip explaining collaborative authorship or AI involvement</ListItem>
        </List>

        <Heading level={3}>Live Theme Editor</Heading>
        <Paragraph>
          Visual design system with real-time preview (dev mode only):
        </Paragraph>
        <List>
          <ListItem><strong>Interactive Controls</strong> - Adjust colors, typography, spacing, borders, shadows in real-time</ListItem>
          <ListItem><strong>HSL Color System</strong> - Primary hue/saturation sliders for cohesive color schemes</ListItem>
          <ListItem><strong>LocalStorage Persistence</strong> - Theme settings survive page reloads</ListItem>
          <ListItem><strong>Copy/Export Config</strong> - Generate theme config code for permanent changes</ListItem>
        </List>

        <Heading level={2}>🚀 Performance & Architecture</Heading>

        <Heading level={3}>Next.js 15 App Router</Heading>
        <List>
          <ListItem><strong>Server Components by Default</strong> - Smaller bundles, faster loads, better SEO</ListItem>
          <ListItem><strong>Static Generation</strong> - All content pages pre-rendered at build time with generateStaticParams</ListItem>
          <ListItem><strong>Client Components</strong> - Strategic use for interactivity (Navigator, Theme Editor, NavBar)</ListItem>
          <ListItem><strong>SPA Navigation</strong> - Next.js Link integration for instant client-side routing</ListItem>
        </List>

        <Heading level={3}>Smart Routing System</Heading>
        <List>
          <ListItem><strong>Metadata-Based Routes</strong> - PostMeta interface drives routing for posts and docs</ListItem>
          <ListItem><strong>App Routes for Foundational Pages</strong> - About Me, Features, Roadmap, Reader's Guide as app routes for custom layout control</ListItem>
          <ListItem><strong>Dynamic Routes for Content</strong> - /posts/[slug] and /docs/[slug] for auto-discovered content</ListItem>
          <ListItem><strong>Automatic Sitemap</strong> - Generated from route metadata for SEO</ListItem>
        </List>

        <Heading level={3}>Content Discovery & Loading</Heading>
        <List>
          <ListItem><strong>Filesystem-Based Discovery</strong> - Automatically finds all content files in content/ directory</ListItem>
          <ListItem><strong>Metadata Extraction</strong> - Parses TSX exports and markdown frontmatter uniformly</ListItem>
          <ListItem><strong>Type-Safe Loading</strong> - TypeScript ensures PostMeta consistency across all content</ListItem>
          <ListItem><strong>Route Generation</strong> - getAllRoutes() aggregates all discoverable content for navigation</ListItem>
        </List>

        <Heading level={2}>🎯 Navigation & UX</Heading>

        <Heading level={3}>Navigator Component</Heading>
        <Paragraph>
          Keyboard-first content navigation inspired by VS Code command palette:
        </Paragraph>
        <List>
          <ListItem><strong>Instant Search</strong> - Filter all content by title/description in real-time</ListItem>
          <ListItem><strong>Keyboard Navigation</strong> - Arrow keys, Enter to select, Escape to close</ListItem>
          <ListItem><strong>Visual Feedback</strong> - Highlighted selection, smooth animations</ListItem>
          <ListItem><strong>Click-Outside Close</strong> - Intuitive modal behavior with scroll detection</ListItem>
        </List>

        <Heading level={3}>NavMenu with Radix UI</Heading>
        <Paragraph>
          Accessible dropdown menu using Radix UI primitives:
        </Paragraph>
        <List>
          <ListItem><strong>Hamburger Menu</strong> - Clean SVG icon, no external dependencies</ListItem>
          <ListItem><strong>Main Navigation</strong> - Home, About Me, About This Site, Features, Roadmap, Reader's Guide, Privacy Policy</ListItem>
          <ListItem><strong>Dev-Only Section</strong> - Theme Editor only visible in NODE_ENV === 'development'</ListItem>
          <ListItem><strong>Full Accessibility</strong> - Keyboard navigation, focus management, ARIA attributes handled by Radix</ListItem>
          <ListItem><strong>Composable Primitives</strong> - Radix components with custom styling, no style conflicts</ListItem>
        </List>

        <Heading level={3}>Responsive NavBar</Heading>
        <List>
          <ListItem><strong>Floating Pill Design</strong> - Fixed bottom positioning with rounded pill shape</ListItem>
          <ListItem><strong>Compact Padding</strong> - Reduced spacing for sleek appearance without sacrificing usability</ListItem>
          <ListItem><strong>Custom Font</strong> - Sekuya Google Font for distinctive branding</ListItem>
          <ListItem><strong>Particle Effects</strong> - Animated particles on title hover for visual polish</ListItem>
          <ListItem><strong>Mobile-Optimized</strong> - Responsive sizing, touch-friendly targets, Safari-compatible positioning</ListItem>
          <ListItem><strong>Navigator Integration</strong> - Quick access to all content from any page</ListItem>
        </List>

        <Heading level={2}>📝 Developer Experience</Heading>

        <Heading level={3}>AI-Optimized Workflow</Heading>
        <Paragraph>
          Built specifically for AI-assisted development with structured outputs and composable primitives:
        </Paragraph>
        <List>
          <ListItem><strong>Natural Language → Pages</strong> - Describe intent, AI generates TSX with primitives, approve and ship</ListItem>
          <ListItem><strong>Structured Metadata</strong> - PostMeta interface provides clear schema for AI to follow</ListItem>
          <ListItem><strong>Component Composition</strong> - AI composes from known primitives instead of generating custom CSS</ListItem>
          <ListItem><strong>Instant Deployment</strong> - Vercel CI/CD for push-to-deploy workflow</ListItem>
        </List>

        <Heading level={3}>Content Workflow</Heading>
        <List>
          <ListItem><strong>Write Anywhere</strong> - TSX for complex pages, Markdown for quick docs</ListItem>
          <ListItem><strong>Immediate Preview</strong> - Hot reload on save, instant feedback loop</ListItem>
          <ListItem><strong>Git-Backed</strong> - Full version history, easy rollback, collaborative editing via PRs</ListItem>
          <ListItem><strong>Workflow Transparency</strong> - 🤖🔧✍️ badges track AI vs human authorship</ListItem>
        </List>

        <Heading level={2}>🛠️ Infrastructure</Heading>

        <Heading level={3}>Deployment & Hosting</Heading>
        <List>
          <ListItem><strong>Vercel Platform</strong> - Zero-config deployment, edge network, automatic HTTPS</ListItem>
          <ListItem><strong>CI/CD Pipeline</strong> - Push to main → automatic build → instant deploy</ListItem>
          <ListItem><strong>Vercel Analytics</strong> - Privacy-friendly page view tracking</ListItem>
          <ListItem><strong>Custom Domain</strong> - jaygriff.com with SSL</ListItem>
        </List>

        <Heading level={3}>Content Versioning</Heading>
        <List>
          <ListItem><strong>Git as Source of Truth</strong> - All content in version control</ListItem>
          <ListItem><strong>Superseded Archive</strong> - raw/content/superseded/ for old versions useful in AI synthesis</ListItem>
          <ListItem><strong>Commit History as Memory</strong> - Full edit history for every page</ListItem>
          <ListItem><strong>Branch-Based Workflow</strong> - Feature branches for major changes</ListItem>
        </List>

        <Heading level={3}>Open Source & Transparency</Heading>
        <List>
          <ListItem><strong>Public GitHub Repo</strong> - Full source code visible to anyone</ListItem>
          <ListItem><strong>MIT-Style Licensing</strong> - Use at your own risk, no warranties</ListItem>
          <ListItem><strong>Radical Transparency</strong> - Process, mistakes, and evolution all public</ListItem>
          <ListItem><strong>Bootstrap Repo</strong> - Designed to be forked and reused for future projects</ListItem>
        </List>

        <Heading level={2}>📊 Content Management</Heading>

        <Heading level={3}>Metadata System</Heading>
        <List>
          <ListItem><strong>PostMeta Interface</strong> - title, slug, date, author, type, description, tags, and more</ListItem>
          <ListItem><strong>Dual Format Support</strong> - TSX exports, markdown JSON frontmatter</ListItem>
          <ListItem><strong>Flexible Authorship</strong> - Single author, multiple authors, authorship notes for transparency</ListItem>
          <ListItem><strong>Type Discrimination</strong> - post vs doc vs doc:commit for different content types</ListItem>
        </List>

        <Heading level={3}>Content Organization</Heading>
        <List>
          <ListItem><strong>Tagging System</strong> - Free-form tags for categorization and discovery</ListItem>
          <ListItem><strong>Project IDs</strong> - Group content by project for multi-site support</ListItem>
          <ListItem><strong>Draft Support</strong> - Hide incomplete content from production</ListItem>
          <ListItem><strong>Related Posts</strong> - Cross-linking via slug references</ListItem>
        </List>

        <Heading level={2}>🎯 What's Next?</Heading>
        <Paragraph>
          Check out the <Link href="/roadmap">Roadmap</Link> for planned features including:
        </Paragraph>
        <List>
          <ListItem>AI-powered metadata editor for quick content updates</ListItem>
          <ListItem>Dev-mode WYSIWYG content editor for in-browser markdown editing</ListItem>
          <ListItem>Search with hotkeys, filters, and sorting</ListItem>
          <ListItem>Badge system to display workflow transparency on pages</ListItem>
          <ListItem>Component generator for rapid primitive composition</ListItem>
        </List>

        <Paragraph>
          This site is a living development platform—constantly evolving, always improving, built in public.
        </Paragraph>
      </ContentWrapper>
    </Container>
  );
}