import { Heading, Paragraph, List, ListItem, Container } from '@/components/Primitives';
import { ContentWrapper } from '@/components/ContentWrapper';
import type { PostMeta } from '@/types/post';

export const routeMetadata: PostMeta = {
  title: 'Site Features',
  slug: 'features',
  date: '2026-01-26T00:00:00Z',
  author: 'Jay Griffin',
  type: 'doc',
  description: 'A detailed list of completed features and functionality available on jaygriff.com',
  tags: ['features', 'completed', 'roadmap'],
  path: '/features',
};

export default function FeaturesDoc() {
  return (
    <Container size="sm">
      <ContentWrapper>
        <Heading level={1}>{routeMetadata.title}</Heading>
        <Heading level={2}>✅ Completed Features</Heading>
      <List>
        <ListItem>
          <strong>Markdown File Support</strong> - Parse JSON frontmatter, render with react-markdown + remark-gfm.
          Drop .md files into content/ and publish immediately.
        </ListItem>
        <ListItem>
          <strong>Server Components Refactor</strong> - Moved from API routes to direct loading.
          60→25 lines per route, pre-rendered pages, better SEO.
        </ListItem>
        <ListItem>
          <strong>Static Generation</strong> - Added generateStaticParams for build-time pre-rendering.
          All ~15 content pages are now static HTML.
        </ListItem>
        <ListItem>
          <strong>Routing Strategy</strong> - Defined metadata-based routing for multi-project architecture.
        </ListItem>
        <ListItem>
          <strong>Navigator Component</strong> - Keyboard-friendly content navigation.
        </ListItem>
        <ListItem>
          <strong>Theme Editor</strong> - Visual theme editing with live preview.
        </ListItem>
        <ListItem>
          <strong>Primitive Component System</strong> - Constraint-based design system that can be composed by AI for quick and beautiful pages.
        </ListItem>
      </List>
      </ContentWrapper>
    </Container>
  );
}