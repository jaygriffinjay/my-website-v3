import { Heading, Paragraph, List, ListItem, Divider } from '@/components/Primitives';
import { CodeBlock } from '@/components/CodeBlock/CodeBlock';
import type { PostMeta } from '@/types/post';

export const metadata: PostMeta = {
  title: 'Routing Strategy: Multi-Project Architecture',
  slug: 'routing-strategy',
  date: '2026-01-19T00:00:00Z',
  author: ['Claude Sonnet 4.5'],
  type: 'doc',
  projectId: 'jaygriff',
  description:
    'How we structure URLs and content for multiple projects under one domain using metadata-based routing.',
  tags: ['architecture', 'nextjs', 'routing', 'multi-project'],
};

const RoutingStrategyDoc = () => {
  return (
    <>
      <Heading level={2}>The Challenge</Heading>
      <Paragraph>
        This site hosts multiple projects: the jaygriff.com site itself, a Strava analyzer, 
        a fitness blog, data wrangling tools, and potentially more. Each project needs its own 
        space, but we want to maximize development velocity and brand cohesion.
      </Paragraph>

      <Heading level={2}>The Decision: Metadata Routing</Heading>
      <Paragraph>
        Instead of creating physical route hierarchies like <code>/strava/docs/[slug]</code>, 
        we use metadata-based routing where all content lives in shared namespaces and 
        projects are identified by metadata.
      </Paragraph>

      <Heading level={2}>URL Structure</Heading>
      
      <Heading level={3}>Standard Site Pages</Heading>
      <CodeBlock language="text">{`/                   Homepage
/about              About page
/privacy            Privacy policy
/terms              Terms of service`}</CodeBlock>

      <Heading level={3}>Meta-Site Content (jaygriff.com itself)</Heading>
      <CodeBlock language="text">{`/posts/[slug]       Blog posts about programming, design, philosophy
/docs/[slug]        Documentation about this site and all projects`}</CodeBlock>
      <Paragraph>
        These routes handle content for jaygriff.com AND all projects. The physical route 
        is the same, but metadata determines which project the content belongs to.
      </Paragraph>

      <Heading level={3}>Project Aggregator Pages</Heading>
      <CodeBlock language="text">{`/strava             Strava analyzer project landing page
/fitness            Fitness blog landing page
/data-wrangler      Data wrangling tools landing page`}</CodeBlock>
      <Paragraph>
        These pages query and display all content where <code>metadata.projectId</code> matches 
        the project name. They're landing pages and content feeds, not separate route hierarchies.
      </Paragraph>

      <Heading level={2}>How It Works</Heading>
      
      <Heading level={3}>Content Files Use Metadata</Heading>
      <CodeBlock language="typescript" filename="strava-api-reference.tsx">{`export const metadata: PostMeta = {
  title: 'Strava API Reference',
  slug: 'strava-api-reference',
  projectId: 'strava',  // ← Connects to project
  type: 'doc',
  // ...
};`}</CodeBlock>

      <Heading level={3}>Routes Handle All Projects</Heading>
      <CodeBlock language="typescript" filename="src/app/docs/[slug]/page.tsx">{`export default async function Page({ params }) {
  const { slug } = await params;
  const content = await loadContentBySlug(slug, 'doc');
  
  // Works for ANY projectId - jaygriff, strava, fitness, etc.
  return <Container>
    <ContentHeader metadata={content.metadata} />
    <ContentWrapper>
      <content.Component />
    </ContentWrapper>
  </Container>;
}`}</CodeBlock>

      <Heading level={3}>Project Pages Query by Metadata</Heading>
      <CodeBlock language="typescript" filename="src/app/strava/page.tsx">{`export default async function StravaPage() {
  const allContent = await getAllContent();
  const stravaContent = allContent.filter(
    c => c.metadata.projectId === 'strava'
  );
  
  return <div>
    <h1>Strava Analyzer Project</h1>
    <ContentFeed items={stravaContent} />
  </div>;
}`}</CodeBlock>

      <Heading level={2}>Benefits</Heading>
      <List>
        <ListItem>
          <strong>Single route handler:</strong> /docs/[slug] handles all doc pages regardless 
          of project, no duplication
        </ListItem>
        <ListItem>
          <strong>Shared components:</strong> All projects use the same primitives, theme, 
          and system components
        </ListItem>
        <ListItem>
          <strong>Unified search:</strong> One search function finds content across all projects
        </ListItem>
        <ListItem>
          <strong>Cross-discovery:</strong> Users naturally discover your other work
        </ListItem>
        <ListItem>
          <strong>Brand cohesion:</strong> Everything strengthens "Jay Griffin makes cool stuff"
        </ListItem>
        <ListItem>
          <strong>Fast development:</strong> No context switching between repos
        </ListItem>
        <ListItem>
          <strong>Flexible categorization:</strong> Change projectId without breaking URLs
        </ListItem>
        <ListItem>
          <strong>Multi-project content:</strong> A post can belong to multiple projects via tags
        </ListItem>
      </List>

      <Heading level={2}>Migration Strategy</Heading>
      <Paragraph>
        If a project grows into its own business and needs to be separated:
      </Paragraph>

      <Heading level={3}>Extract Content by Metadata</Heading>
      <CodeBlock language="typescript" filename="scripts/migrate-project.ts">{`import { getAllContent } from '@/lib/posts';
import fs from 'fs';

async function migrateProject(projectId: string, targetDir: string) {
  const allContent = await getAllContent();
  const projectContent = allContent.filter(
    c => c.metadata.projectId === projectId
  );
  
  projectContent.forEach(item => {
    fs.copyFileSync(
      \`content/tsx/\${item.filename}\`,
      \`\${targetDir}/content/tsx/\${item.filename}\`
    );
  });
  
  console.log(\`Migrated \${projectContent.length} files to \${targetDir}\`);
}

migrateProject('strava', '../strava-app');\n`}</CodeBlock>

      <Heading level={3}>Set Up Redirects</Heading>
      <CodeBlock language="typescript" filename="next.config.ts">{`const nextConfig = {
  async redirects() {
    return [
      {
        source: '/strava/:path*',
        destination: 'https://strava.app/:path*',
        permanent: true,
      },
    ];
  },
};\n`}</CodeBlock>

      <Heading level={3}>Or Use Subdomains First</Heading>
      <CodeBlock language="text">{`strava.jaygriff.com → separate Next.js app
                      ↓
                 strava.app (if it grows)`}</CodeBlock>

      <Paragraph>
        The metadata system makes extraction a 5-minute operation. Optimize for velocity now, 
        separate later if actually needed (which is rare).
      </Paragraph>

      <Heading level={2}>Alternative Considered: Physical Routing</Heading>
      <Paragraph>We considered creating separate route hierarchies:</Paragraph>
      <CodeBlock language="text">{`/strava/docs/[slug]
/strava/posts/[slug]
/fitness/docs/[slug]
/fitness/posts/[slug]`}</CodeBlock>

      <Paragraph>
        <strong>Why we rejected it:</strong>
      </Paragraph>
      <List>
        <ListItem>Duplicate route handlers for each project</ListItem>
        <ListItem>Can't share content across projects easily</ListItem>
        <ListItem>More complex routing logic</ListItem>
        <ListItem>Harder to search/aggregate across projects</ListItem>
        <ListItem>Premature separation when most projects won't spin off</ListItem>
      </List>

      <Heading level={2}>Content Organization</Heading>
      <CodeBlock language="text">{`content/
├── tsx/
│   ├── site-summary.tsx           (projectId: 'jaygriff')
│   ├── routing-strategy.tsx       (projectId: 'jaygriff')
│   ├── strava-api-reference.tsx   (projectId: 'strava')
│   ├── marathon-training.tsx      (projectId: 'fitness')
│   └── data-wrangling-intro.tsx   (projectId: 'data-wrangler')
└── md/
    └── (same structure, same metadata system)`}</CodeBlock>

      <Paragraph>
        All content mixed together, organized by metadata. Physical file organization doesn't 
        matter - it's all queryable by projectId.
      </Paragraph>

      <Heading level={2}>UI Integration</Heading>
      <Paragraph>
        Project IDs become clickable badges on content pages:
      </Paragraph>
      <CodeBlock language="tsx" filename="ContentHeader.tsx">{`{metadata.projectId && (
  <Link href={\`/\${metadata.projectId}\`}>
    <Badge>{metadata.projectId}</Badge>
  </Link>
)}`}</CodeBlock>

      <Paragraph>
        Clicking the badge takes you to the project landing page showing all related content.
      </Paragraph>

      <Heading level={2}>Future Additions</Heading>
      <List>
        <ListItem>
          <strong>Project-specific routes:</strong> /strava/app for interactive features
        </ListItem>
        <ListItem>
          <strong>Project configs:</strong> Each project can have custom theme/settings
        </ListItem>
        <ListItem>
          <strong>Access control:</strong> Some projects (finances) can be dev-only via metadata
        </ListItem>
        <ListItem>
          <strong>Project API routes:</strong> /api/strava/* for project-specific functionality
        </ListItem>
      </List>

      <Heading level={2}>Philosophy</Heading>
      <Paragraph>
        <strong>Start together, separate if needed.</strong>
      </Paragraph>
      <Paragraph>
        Most side projects stay side projects. Premature separation kills momentum. Build 
        everything under your brand, leverage shared infrastructure, ship fast. If something 
        actually grows into a business, migration is straightforward.
      </Paragraph>
      <Paragraph>
        Your brand compounds. Individual projects are lottery tickets. Optimize for the common 
        case (rapid development under one brand) not the rare case (spinning off into separate 
        business).
      </Paragraph>
    </>
  );
};

export default RoutingStrategyDoc;
