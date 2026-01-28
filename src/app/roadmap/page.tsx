import { Heading, Paragraph, List, ListItem, Link, Container } from '@/components/Primitives';
import { ContentWrapper } from '@/components/ContentWrapper';
import type { PostMeta } from '@/types/post';

export const routeMetadata: PostMeta = {
  title: 'jaygriff.com Roadmap',
  slug: 'roadmap',
  date: '2026-01-19T00:00:00Z',
  author: ['Claude Sonnet 4.5', 'Jay Griffin'],
  authorshipNote: 'Claude writes, Jay edits and tells it to add stuff',
  type: 'doc',
  projectId: 'jaygriff',
  description:
    'Active work, planned features, and long-term ideas for jaygriff.com.',
  tags: ['roadmap', 'planning', 'features'],
  path: '/roadmap',
};

export default function RoadmapDoc() {
  return (
    <Container size="sm">
      <ContentWrapper>
        <Heading level={1}>{routeMetadata.title}</Heading>
        <Heading level={3}>Content System</Heading>
      <List>
        <ListItem>
          <strong>AI-Powered Metadata Editor (Dev Mode)</strong> - Click ContentHeader to open modal with smart editing.
          Natural language interface for each field type: "jan 19 5pm" → ISO date, "add tags: ui, styling" → array.
          AI returns JSON, no manual code editing required. Proper UI fallbacks (date picker, tag selector, etc.).
        </ListItem>
        <ListItem>
          <strong>AI Metadata Generator</strong> - Automatically generate metadata for markdown files using AI API.
          Analyze content to suggest title, description, tags, projectId, and type.
        </ListItem>
        <ListItem>
          <strong>Activity Timeline/Feed</strong> - Timestamped stream of all docs/posts showing daily work.
          Proof of constant shipping.
        </ListItem>
        <ListItem>
          <strong>Content Analytics</strong> - Track what gets read, how long people spend, popular topics.
        </ListItem>
      </List>

      <Heading level={3}>Search & Discovery</Heading>
      <List>
        <ListItem>
          <strong>Search Hotkeys</strong> - Cmd+K to open search, Esc to close, arrow keys to navigate.
        </ListItem>
        <ListItem>
          <strong>Search Icons</strong> - Visual indicators for content type (doc vs post), project badges.
        </ListItem>
        <ListItem>
          <strong>Search Filters</strong> - Filter by projectId, type, tags, date range.
        </ListItem>
        <ListItem>
          <strong>Search Sorting</strong> - Sort by relevance, date, popularity.
        </ListItem>
        <ListItem>
          <strong>Fuzzy Search</strong> - Better matching for typos and partial queries.
        </ListItem>
      </List>

      <Heading level={3}>Code Blocks</Heading>
      <List>
        <ListItem>
          <strong>Line Numbers</strong> - Optional line numbers with highlighting.
        </ListItem>
        <ListItem>
          <strong>Diff View</strong> - Show before/after code changes with +/- indicators.
        </ListItem>
      </List>

      <Heading level={3}>Developer Experience</Heading>
      <List>
        <ListItem>
          <strong>LLM Component Designer</strong> - AI-powered UI generation using primitive library.
          Prompt → component in seconds.
        </ListItem>
        <ListItem>
          <strong>Content Templates</strong> - Quick-start templates for common doc types.
        </ListItem>
      </List>

      <Heading level={2}>💭 Ideas</Heading>
      
      <Heading level={3}>Multi-Project Features</Heading>
      <List>
        <ListItem>
          <strong>Project Landing Pages</strong> - Auto-generated pages at /projectId showing all content.
          Feed of posts/docs, project description, links.
        </ListItem>
        <ListItem>
          <strong>Project Configs</strong> - Custom theme overrides, project-specific settings.
        </ListItem>
        <ListItem>
          <strong>Access Control</strong> - Dev-only projects (finances), private content metadata flag.
        </ListItem>
      </List>

      <Heading level={3}>Content Enhancements</Heading>
      <List>
        <ListItem>
          <strong>Table of Contents</strong> - Auto-generated from headings, sticky sidebar on scroll.
        </ListItem>
        <ListItem>
          <strong>Related Content</strong> - "You might also like" based on tags/projectId.
        </ListItem>
        <ListItem>
          <strong>Reading Progress</strong> - Progress bar showing how far through article.
        </ListItem>
      </List>

      <Heading level={3}>Social & Sharing</Heading>
      <List>
        <ListItem>
          <strong>RSS Feed</strong> - Auto-generated from content metadata.
        </ListItem>
        <ListItem>
          <strong>OG Image Generation</strong> - Dynamic social preview images with title/project.
        </ListItem>
        <ListItem>
          <strong>Newsletter</strong> - Weekly digest of published content.
        </ListItem>
      </List>

      <Heading level={3}>Theme System</Heading>
      <List>
        <ListItem>
          <strong>Fix Theme Editor</strong> - Currently my theme editor is broken because not all of my components rely on my primitive theme data.
        </ListItem>
        <ListItem>
          <strong>Theme Presets</strong> - One-click themes (dark, light, high contrast, etc.).
        </ListItem>
        <ListItem>
          <strong>User Theme Preferences</strong> - Save/load custom themes, share with others.
        </ListItem>
      </List>

      <Heading level={2}>✅ Completed</Heading>
      <Paragraph>
        The completed roadmap items have been moved to a dedicated <Link href="/features">Features</Link> page.
      </Paragraph>
      </ContentWrapper>
    </Container>
  );
}
