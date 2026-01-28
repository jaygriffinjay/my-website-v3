import { Heading, Paragraph, Link, Divider, Container } from '@/components/Primitives';
import { ContentWrapper } from '@/components/ContentWrapper';
import type { PostMeta } from '@/types/post';

export const routeMetadata: PostMeta = {
  title: 'About Me',
  slug: 'about-me',
  date: '2026-01-21T00:00:00Z',
  author: ['Jay Griffin'],
  description: '',
  tags: ['about'],
  path: '/about-me',
};

export default function AboutMePage() {
  return (
    <Container size="sm">
      <ContentWrapper>
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <img 
          src="/images/me.jpg" 
          alt="Jay Griffin" 
          style={{ 
            maxWidth: '250px', 
            width: '100%', 
            height: 'auto',
            borderRadius: '8px'
          }} 
        />
      </div>
      <Heading level={2}>Hi, I'm Jay!</Heading>


      <Paragraph>
        Welcome to my website where I do my work and publish it too. 
        My work is primarily software development - I am developing thoughtful web apps that make life easier or better in some way.
        
      </Paragraph>

      

      <Divider />

      <Heading level={2}>What I Do</Heading>
      <Paragraph>
        I primarily work with TypeScript, React, and Next.js. 
        You can see my stack and tooling in <Link href="/my-tools">my tools</Link>.
      </Paragraph>
      <Paragraph>
        My main project is <Link href="https://github.com/jaygriffinjay/jaygriff" target="_blank" rel="noopener noreferrer">this site itself</Link> - a custom-built full-stack web app that serves as 
        both my workspace and my publishing platform. It is the container for a lot of my other apps where I can just host and 
        demo them on this site.  While on the front end this just looks like a website, on the back end this site is a testbed 
        for my full-featured application framework I use to make all my apps. It's an excuse to improve the framework and 
        factor out my best work into a reusable system I endearingly call my <Link href="https://github.com/jaygriffinjay/bootstrap-fullstack-webapp" target="_blank" rel="noopener noreferrer">Bootstrap Repo</Link>, otherwise known as a "boilerplate". Learn more <Link href="/about-this-site">about this site</Link>, explore the <Link href="/features">completed features</Link>, or check out 
        the <Link href="/roadmap">future roadmap</Link>.
      </Paragraph>

      <Divider />

      <Heading level={2}>What I Write About</Heading>
      <Paragraph>
        Software, business, entrepreneurship, money, fitness and training 
        data, productivity, games, puzzles, and whatever else I'm interested in. This site is where I document my work, share my thoughts, and maybe post some personal stuff too!
      </Paragraph>

      <Divider />

      <Heading level={2}>Background</Heading>
      <Paragraph>
        I worked in public tax accounting before transitioning to software development. 
        Read the full story in <Link href="/posts/accounting-to-dev">accounting → software development?</Link>
      </Paragraph>
      </ContentWrapper>
    </Container>
  );
}
