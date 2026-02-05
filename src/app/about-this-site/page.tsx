import { Heading, Paragraph, List, ListItem, Link, Container } from '@/components/Primitives';
import { ContentWrapper } from '@/components/ContentWrapper';
import type { PostMeta } from '@/types/post';

export const routeMetadata: PostMeta = {
  title: 'About This Site',
  slug: 'about-this-site',
  date: '2026-01-21T00:00:00Z',
  author: ['Claude Sonnet 4.5', 'Jay Griffin'],
  type: 'doc',
  projectId: 'jaygriff',
  description: 'What this site is and how it works.',
  tags: ['meta', 'about'],
  authorshipNote: 'Claude wrote this based on Jay\'s direction and edits.',
  path: '/about-this-site',
};

export default function AboutThisSite() {
  return (
    <Container size="sm">
      <ContentWrapper>
        <Heading level={1}>{routeMetadata.title}</Heading>
      
      <Paragraph>
        This is my personal website, built from scratch as both a publishing platform and a development workspace. 
        It's where I document my work, share my thoughts, and build web applications.
      </Paragraph>

      <Heading level={2}>What I Built</Heading>

      <Paragraph>
        On the surface, this looks like a standard personal website. Under the hood, it's a full-stack 
        framework for rapidly building and shipping web applications. The site itself is the primary 
        application, but it also serves as a container for other projects.
      </Paragraph>

      <Paragraph>
        When I build a new app I can rebuild it 
        within <Link href="https://github.com/jaygriffinjay/jaygriff">this repo</Link>, leverage the existing tooling and component system, and host it directly on 
        the site. The framework makes each new project faster and better than building standalone.
      </Paragraph>

      <Heading level={2}>Tech Stack</Heading>

      <Paragraph>
        The stack is the result of years of experimentation on this project. I've rebuilt it 
        multiple times, trying different approaches until I landed on what actually works for me.
      </Paragraph>

      <Paragraph>
        <strong>Core:</strong>
      </Paragraph>
      <List>
        <ListItem><strong>Next.js and React</strong> - full-stack web application framework</ListItem>
        <ListItem><strong>TypeScript</strong> - my language of choice</ListItem>
        <ListItem><strong>Emotion</strong> - CSS-in-JS - my styling of choice</ListItem>
      </List>

      <Paragraph>
        <strong>Content System:</strong>
      </Paragraph>
      <List>
        <ListItem><strong>TSX Components</strong> - Rich, interactive content with full React capabilities</ListItem>
        <ListItem><strong>Markdown</strong> - Simple text-based content for quick writing</ListItem>
        <ListItem><strong>Custom Primitives</strong> - Primitive component system for consistent design</ListItem>
      </List>

      <Paragraph>
        <strong>Developer Experience:</strong>
      </Paragraph>
      <List>
        <ListItem><strong>Metadata Scanner</strong> - Audits all content for completeness</ListItem>
        <ListItem><strong>Theme Editor</strong> - Live design system adjustments</ListItem>
      </List>

      <Paragraph>
        <strong>Infrastructure:</strong>
      </Paragraph>
      <List>
        <ListItem><strong>Vercel</strong> - Deployment and hosting and analytics</ListItem>
        <ListItem><strong>Cloudflare</strong> - DNS management and email forwarding</ListItem>
        <ListItem><strong>GitHub</strong> - Source code hosting</ListItem>
      </List>

      <Paragraph>
        <strong>What does it cost to run this?</strong>
      </Paragraph>
      <List>
        <ListItem><strong>Domain</strong> - $12/year for jaygriff.com</ListItem>
        <ListItem><strong>Domain Email</strong> - Free (Cloudflare forwarding + Gmail)</ListItem>
        <ListItem><strong>Hosting</strong> - Free (Vercel's generous free tier)</ListItem>
        <ListItem><strong>Total</strong> - $12/year, or $1/month</ListItem>
      </List>

      <Paragraph>
        Hosting static sites is often free. For my site specifically, being a Next.js app hosted on Vercel, that means I need to pay more attention 
        to serverless and edge function usage. But for a personal site like this, the free tier 
        handles everything beautifully.
      </Paragraph>  

      <Heading level={2}>Why build this?</Heading>
      <Paragraph>
        I've wanted my own corner of the internet since I was a teenager. Not a profile on someone else's platform, 
        but an actual space that's mine. This is that space.
      </Paragraph>

      <Paragraph>
        More practically: I needed a cross between a note taking app, a personal knowledge management system, a traditional blog, a place for my development tools and documentation, and a dev blog, all with the 
        flexibility to evolve as needs change. I needed a powerful, customized tool that makes my work better.
      </Paragraph>

      <Heading level={2}>How it helps me develop better software</Heading>
      <Paragraph>
        This website is primarily meant to help me develop better software. It's my testbed for new features, 
        new ideas, and anything I find interesting and worth working on.
      </Paragraph>

      <Paragraph>
        The first and most obvious way is that this is a full-stack web app that I maintain in production. 
        The fact that the site functions at all means that I put significant work into making it do so, which 
        means I have learned a lot of things about software to get to that point.
      </Paragraph>

      <Paragraph>
        The next thing it does is it gives me endless things to work on. There is always a new feature for 
        the site. The site is never done. As the site gets bigger with more features and content, novel technical problems naturally arise that need solving. And even if the site doesn't need active work done on it, 
        it serves as the container for all my other development work, which means even when I'm not working 
        on the site directly, I'm working inside of it and using it.
      </Paragraph>

      <Heading level={2}>Debugging with visualization</Heading>
      <Paragraph>
        One thing I love doing is debugging things with it. I don't add random print statements to the console 
        to debug things. I post a comprehensive, styled, organized, interesting illustration of 
        the problem I'm having and the associated outputs as a page on my site.
      </Paragraph>

      <Paragraph>
        The fact that it's a website is secondary to the fact that I'm a visual learner who is visualizing 
        my problems in precise detail while web and browser just so happen to be the medium 
        I'm using to do so.
      </Paragraph>

      <Heading level={2}>Note-taking and knowledge accumulation</Heading>
      <Paragraph>
        Instead of using a note taking app and writing down stuff I did, stuff to remember, stuff I think 
        is interesting, or stuff I think is important, I constantly generate detailed documents of this stuff 
        and make them available as content on the site.
      </Paragraph>

      <Paragraph>
        Not necessarily for other people to see, although I would find that somewhat amusing. But moreso 
        because I believe if I can continue to have a record of what I've done and a way to access that 
        record that I will be able to improve my work and learning.
      </Paragraph>

      <Paragraph>
        A LOT of the design of this site can be attributed to me trying to maximize the UX of notes themselves 
        because for years I have felt like I don't have the right tools for notes.
      </Paragraph>

      <Heading level={2}>Rapid content generation</Heading>
      <Paragraph>
        Some other things have started to appear on this site that I think are really exciting and weren't 
        exactly intended but are very welcome. By having a robust component system, content design, and 
        AI assistance, I can actually make quality web pages really, really fast and that's honestly just 
        a lot of fun.
      </Paragraph>

      <Paragraph>
        I can see how I can make it even faster and better in a lot of ways (see <Link href="/roadmap">roadmap</Link> for component 
        generator spec and metadata editor spec).
      </Paragraph>
      </ContentWrapper>
    </Container>
  );
}
