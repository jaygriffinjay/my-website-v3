import { Heading, Paragraph, Divider, Link, Container } from '@/components/Primitives';
import { ContentWrapper } from '@/components/ContentWrapper';
import type { PostMeta } from '@/types/post';

export const routeMetadata: PostMeta = {
  title: 'My Tools & Stack',
  slug: 'my-tools',
  date: '2026-01-26T00:00:00Z',
  author: ['Jay Griffin'],
  description: 'The tools, languages, and stack I use for web development and creative work',
  tags: ['tools', 'stack', 'dev'],
  type: 'doc',
  path: '/my-tools',
};

export default function MyToolsPage() {
  return (
    <Container size="sm">
      <ContentWrapper>
        <Heading level={1}>My Tools</Heading>
        <Paragraph>
          I've tried a lot of tools over the years and settled on what actually works for me. 
          But I'm always trying new things because software continues to get better!
        </Paragraph>

        <Heading level={2}>Languages</Heading>
        <Paragraph>
          TypeScript, JavaScript, Python, Shell, HTML, CSS
        </Paragraph>

        <Heading level={2}>Main Dev Tools</Heading>
        
        <Paragraph>
          <strong>React, Next.js</strong> - Full stack framework for building web applications
        </Paragraph>
        
        <Paragraph>
          <strong>CSS-in-JS (Emotion)</strong> - Styling
        </Paragraph>
        
        <Paragraph>
          <strong>Node</strong> - Runtime
        </Paragraph>
        
        <Paragraph>
          <strong>Vercel</strong> - CI/CD, Hosting, CDN
        </Paragraph>

        <Paragraph>
          <strong>Cloudflare</strong> - Registrar, DNS management, Object storage, CDN
        </Paragraph>
        
        <Paragraph>
          <strong>Git, GitHub</strong> - Version Control and Collaboration
        </Paragraph>
        
        <Paragraph>
          <strong>GitHub Copilot, Claude Code</strong> - AI Assistance
        </Paragraph>
        
        <Paragraph>
          <strong>VS Code</strong> - IDE
        </Paragraph>
        
        <Paragraph>
          <strong>Chrome DevTools, React Developer Tools</strong> - Browser Dev Tools
        </Paragraph>
        
        <Paragraph>
          <strong>Lovable.dev, Bolt.new</strong> - Rapid Prototyping &amp; UI Generation
        </Paragraph>

        <Divider />

        <Heading level={2}>Other Dev Tools</Heading>
        <Paragraph>
          Vite, Hugo, Jekyll, Eleventy, Tailwind, DaisyUI, Django, Flask, WordPress, Netlify, 
          Express, Hetzner, AutoHotKey
        </Paragraph>

        <Divider />

        <Heading level={2}>Main Productivity &amp; Creative Tools</Heading>
        <Paragraph>
          For web development I often have to create assets like images, icons, diagrams, and mockups. I have edited photos and created graphics for years so I have a solid toolkit for that too.
        </Paragraph>
        <Paragraph>
          Notion, Affinity, OBS, Excel, Google Sheets, and a custom <Link href="https://chromewebstore.google.com/detail/locus/mamfkhoggkjbacfkibdbcfmoonjbecmp?hl=en-US" target="_blank" rel="noopener noreferrer">Chrome extension</Link> I built for bookmark launching that I use every day.
        </Paragraph>

        <Divider />

        <Heading level={2}>Other Productivity &amp; Creative Tools</Heading>
        <Paragraph>
          Microsoft Office Suite for work, Photoshop, Photopea, GIMP, Inkscape, Obsidian
        </Paragraph>
      </ContentWrapper>
    </Container>
  );
}
