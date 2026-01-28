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
        This is a personal website built from scratch to work exactly how I want it to work. 
        A place for documenting my work, my thoughts, and anything I find interesting.
      </Paragraph>
          <Paragraph>
            This site isn't just for personal publishing. I do my actual web development work here. 
            I'm currently making mostly TypeScript applications with React and Next.js. 
            The most sophisticated software I have made to date is this very website. 
            While it's a website in the traditional sense it's also a full stack framework for making web applications. 
            So not only is this website a container for almost all of my work and writing, it's also a back end 
            system I built to make web applications quickly and efficiently. I try my best to factor out all the good features I build into a reuasble framework for all my future projects.
          </Paragraph>
          <Paragraph>
            No CMS, no WordPress, no templates. Just TypeScript, React, and Next.js with a custom 
            content system that handles both TSX components and Markdown files. 
            I built a constraint-based primitive component 
            system for consistent design, use Emotion for CSS-in-JS styling, and deployed it all on Vercel 
            with proper CI/CD.
          </Paragraph>
          <Paragraph>
            I've also built internal dev tools right into the site - a metadata scanner to audit all content, 
            a theme editor for live design adjustments, and other utilities that make my workflow faster. 
            This isn't just a website. It's my development environment.
          </Paragraph>      

      <Heading level={2}>Why build this?</Heading>
      <Paragraph>
        I've wanted my own corner of the internet since I was a teenager. Not a profile on someone else's platform, 
        but an actual space that's mine. This is that space.
      </Paragraph>

      <Paragraph>
        More practically: I needed a cross between a personal knowledge management system, a development blog and workspace, a regular blog, and a documentation site with the 
        flexibility to evolve as needs change. Something that makes my work easier.
      </Paragraph>

      <Heading level={2}>How it helps me develop better software</Heading>
      <Paragraph>
        This website is primarily meant to help me develop better software. It's my test bed for new features, 
        new ideas, and anything I find interesting and worth working on.
      </Paragraph>

      <Paragraph>
        The first and most obvious way is that this is a full stack web app that I maintain in production. 
        The fact that the site functions at all means that I put significant work into making it do so, which 
        means I have learned a lot of things about software to get to that point.
      </Paragraph>

      <Paragraph>
        The next thing it does is it gives me endless things to work on. There is always a new feature for 
        the site. The site is never done. And even if the site is in a state of not needing work to be done, 
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
