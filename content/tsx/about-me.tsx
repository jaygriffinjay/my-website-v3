import { Heading, Paragraph } from '@/components/Primitives';
import type { PostMeta } from '@/types/post';

export const metadata: PostMeta = {
  title: 'About Me',
  slug: 'about-me',
  date: '2026-01-21T00:00:00Z',
  author: ['Jay Griffin'],
  description: '',
};

const AboutMe = () => {
  return (
    <>
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

      <Paragraph style={{ textAlign: 'center', marginBottom: '2rem' }}>
        Welcome to my website where I do my work and publish it too. I'm a software developer 
        currently making mostly TypeScript applications with React and Next.js.
      </Paragraph>

      <Heading level={2}>Languages</Heading>
      <Paragraph>
        TypeScript, JavaScript, Python, Shell, HTML, CSS
      </Paragraph>

      <Heading level={2}>Current Dev Tools</Heading>
      <Paragraph>
        <strong>React, Next.js</strong> - Framework/Library
      </Paragraph>
      <Paragraph>
        <strong>CSS-in-JS (Emotion)</strong> - Styling
      </Paragraph>
      <Paragraph>
        <strong>Node</strong> - Runtime
      </Paragraph>
      <Paragraph>
        <strong>Vite</strong> - Build Tool
      </Paragraph>
      <Paragraph>
        <strong>Vercel, Cloudflare</strong> - CI/CD & Hosting
      </Paragraph>
      <Paragraph>
        <strong>Git, GitHub</strong> - Version Control and Collaboration
      </Paragraph>
      <Paragraph>
        <strong>GitHub Copilot, Claude Code</strong> - AI Assistance
      </Paragraph>
      <Paragraph>
        <strong>VS Code</strong> - Code Editor
      </Paragraph>
      <Paragraph>
        <strong>Chrome DevTools, React Developer Tools</strong> - Browser Dev Tools
      </Paragraph>
      <Paragraph>
        <strong>Lovable.dev, Bolt.new</strong> - Rapid Prototyping & UI Generation
      </Paragraph>
      <Heading level={2}>Previous Dev Tools</Heading>
      <Paragraph>
        Hugo, Jekyll, Eleventy, Tailwind, DaisyUI, Django, Flask, WordPress, Netlify, 
        Express, Hetzner, AutoHotKey
      </Paragraph>

      <Heading level={2}>Current Productivity & Creative Tools</Heading>
      <Paragraph>
        Notion, Affinity, OBS, Excel, Google Sheets, and a custom Chrome extension 
        I built for bookmark launching that I use every single day.
      </Paragraph>

      <Heading level={2}>Previous Productivity & Creative Tools</Heading>
      <Paragraph>
        Microsoft Office Suite for work, Photoshop, Photopea, GIMP, Inkscape, Obsidian
      </Paragraph>
    </>
  );
};

export default AboutMe;
