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

        <Paragraph>
          I'm a former accountant turned full-stack developer. My accounting background helps more than you'd think—my information systems courses taught me relational database design and normalization in the context of how large enterprises run their ERP systems and manage financial data. Very helpful insights for full-stack development. I also learned data analysis and visualization, which is huge for so many applications and problem-solving tasks in programming.
        </Paragraph>

        <Paragraph>
          This page is about <em>how</em> I use these tools, not just what I have installed.
        </Paragraph>

        <Heading level={2}>Languages</Heading>
        
        <Paragraph>
          <strong>TypeScript</strong> - All in, full steam ahead. I used to think TypeScript was extra boilerplate only needed for large enterprises and team environments, but now my interfaces are great AI food and guardrails. Same goes for testing—used to be about boilerplate and protecting large production apps, now it's super useful for augmenting AI functionality.
        </Paragraph>

        <Paragraph>
          <strong>JavaScript</strong> - The foundation of everything I build.
        </Paragraph>

        <Paragraph>
          <strong>Python</strong> - I love Python! Just have no use for it since I do 100% JavaScript web dev right now. Even if I made desktop or mobile apps, I'd reach for React Native or Electron. If I ever need to do some serious data work or API design I will be using Python again though.
        </Paragraph>

        <Paragraph>
          <strong>HTML</strong> - I basically don't write HTML directly anymore—I make React pages and render markdown pages. I do use HTML elements in my React pages though! 
        </Paragraph>

        <Paragraph>
          <strong>CSS</strong> - I write plenty of CSS, just as CSS-in-JS and component-scoped CSS instead of anything that cascades (shudder).
        </Paragraph>

        <Paragraph>
          <strong>Shell</strong> - I use Shell every day for all kinds of stuff. But usually just for basic plumbing like installing packages, file operations, git operations, CLI tools. I don't find myself in the Shell trenches very often because AI can just tee me up for the command I need.
        </Paragraph>

        <Heading level={2}>Main Dev Tools</Heading>
        
        <Paragraph>
          <strong>React, Next.js</strong> - My full stack framework for building web applications.
        </Paragraph>
        
        <Paragraph>
          <strong>CSS-in-JS (Emotion)</strong> - How I handle styling.
        </Paragraph>
        
        <Paragraph>
          <strong>Node</strong> - Runtime environment.
        </Paragraph>
        
        <Paragraph>
          <strong>Vercel</strong> - CI/CD, hosting, and CDN. Switched to Vercel from Netlify mainly because of Next.js integration—they felt identical otherwise, but Vercel's Next.js support is seamless.
        </Paragraph>

        <Paragraph>
          <strong>Cloudflare</strong> - Registrar, DNS management, object storage, CDN.
        </Paragraph>
        
        <Paragraph>
          <strong>Git, GitHub</strong> - Version control and collaboration.
        </Paragraph>
        
        <Paragraph>
          <strong>GitHub Copilot, Claude Code</strong> - AI coding assistants integrated into VS Code. Claude Sonnet 4.5 for most general work, Claude Opus 4.5 for tough problems, and GPT-4o for natural language editing (no code generation).
        </Paragraph>
        
        <Paragraph>
          <strong>OpenAI API</strong> - For integrating AI capabilities directly into software applications.
        </Paragraph>
        
        <Paragraph>
          <strong>Claude, Gemini, ChatGPT</strong> - Honestly, the list of what I use these for goes on and on: brainstorming, writing, designing, learning, debugging, coding—you name it.
        </Paragraph>
        
        <Paragraph>
          <strong>VS Code</strong> - My IDE. I've been using it for years and I'm entrenched in the workflow. For me to switch tools, something has to be <em>very very good</em> to justify the disruption. (I tried Cursor and liked it, but haven't made the jump.)
        </Paragraph>
        
        <Paragraph>
          <strong>Chrome DevTools, React Developer Tools</strong> - Always open when I'm developing. I test on desktop and mobile during development.
        </Paragraph>
        
        <Paragraph>
          <strong>Lovable.dev, Bolt.new</strong> - Insanely good for rapid prototyping app ideas and UI. Amazing what these can generate. I don't ship their vibecoded output to production (I prefer to ship code I understand which may mean doing a rewrite), but I take inspiration and study the generated repos for new code ideas. I could write on and on how I study vibe coding apps, their system prompts, and their outputs. 
        </Paragraph>

        <Heading level={2}>Main Productivity &amp; Creative Tools</Heading>
        
        <Paragraph>
          For web development I often have to create assets like images, icons, diagrams, and mockups. I've edited photos and created graphics for years so I have a solid toolkit for that.
        </Paragraph>

        <Paragraph>
          <strong>Notion</strong> - My main hub for writing and notes. Fast for capturing lots of content, syncs across all devices.
        </Paragraph>

        <Paragraph>
          <strong>Affinity</strong> - My go-to for image and vector graphic work. I also use online SVG tools when I need quick edits.
        </Paragraph>

        <Paragraph>
          <strong>OBS</strong> - Recording demos of what I'm programming to display functionality, timelapse changes, and progress.
        </Paragraph>

        <Paragraph>
          <strong>Excel, Google Sheets</strong> - Mainly Google Sheets now since I don't have a Microsoft Office license. Surprisingly little use for spreadsheets these days given I'm a former accountant—most of my needs are met with Notion and custom coded tools. Current use case? Splitting expenses with my roommate.
        </Paragraph>

        <Paragraph>
          <strong>Custom Chrome Extension</strong> - I built <Link href="https://chromewebstore.google.com/detail/locus/mamfkhoggkjbacfkibdbcfmoonjbecmp?hl=en-US" target="_blank" rel="noopener noreferrer">Locus</Link> for bookmark launching and use it every day.
        </Paragraph>

        <Divider />

        <Heading level={2}>How I Actually Work</Heading>

        <Heading level={3}>My design philosophy</Heading>
        <Paragraph>
          Code first, design second. I prefer building functionality before choosing aesthetics—I don't like fighting with tools or creating hard-to-implement bespoke solutions just because they'd be slightly prettier.
        </Paragraph>

        <Paragraph>
          The reason: code generates new possibilities for what the design can be. You can't wireframe something like a generated or automated page!
        </Paragraph>

        <Paragraph>
          I've used Figma for visualizing and wireframing sites. As a solo dev who's a programmer first, I found it less helpful than expected. My preferred workflow is to vibecode a rough version of the feature or page, then iterate on the design in code. This way I can see how it actually looks and works in the real environment rather than a static mockup.
        </Paragraph>

        <Paragraph>
          <strong>I'm not an artist.</strong> About 90% of the time I'm foraging for something that meets my taste, then editing and iterating from there rather than deriving art from scratch. I just can't bring the image in my head into the real world without it taking 100x longer than it needs to. So instead I default to finding something I think is pretty and emulating it.
        </Paragraph>

        <Paragraph>
          Interestingly, by trying to copy someone else, that <em>becomes</em> my style—because I never copy it 1:1, it's always in my own way.
        </Paragraph>

        <Heading level={3}>When I need icons or graphics...</Heading>
        <Paragraph>
          AI generation first. Usually works! If I need tweaks, I'll use Affinity. I've also gotten much better at hunting for flexibly-licensed icons in open source repos, or I'll search for patterns and graphics online.
        </Paragraph>

        <Paragraph>
          I used to manually edit vector code in my IDE, but nowadays AI can generate what I need on the fly. Sometimes I'll use 3D tools, Canva, or AI image generators to create a specific visual, then emulate or trace it.
        </Paragraph>

        <Heading level={3}>Color palettes...</Heading>
        <Paragraph>
          I use tools like Coolors or just ask AI for color scheme suggestions.
        </Paragraph>

        <Heading level={3}>Photo editing these days...</Heading>
        <Paragraph>
          I do very little photo editing now. When I do, it's practical stuff: cropping, aligning, background removal, unnecessary detail removal, optimization, and fixing aspect ratios and pixel sizes.
        </Paragraph>

        <Heading level={3}>Starting a new web project...</Heading>
        <Paragraph>
          I open: VS Code, browser DevTools, dev server on both desktop and actual phone, the live site, my GitHub, Claude/ChatGPT webapp, and GitHub Copilot. Then I jump straight into code.
        </Paragraph>

        <Divider />

        <Heading level={2}>Other Dev Tools</Heading>
        <Paragraph>
          Mostly old experiments and learning projects that have been replaced by something better for me.
        </Paragraph>
        
        <Paragraph>
          <strong>Vite, Hugo, Jekyll, Eleventy</strong> - Static site generators from when I was learning about web dev and project structure. Before I went all-in on Next.js.
        </Paragraph>

        <Paragraph>
          <strong>Tailwind, DaisyUI</strong> - I'm enjoying CSS-in-JS now and haven't been using Tailwind unless it's the default for vibecoding. DaisyUI I don't use anymore—I'll usually make a custom component if I need it.
        </Paragraph>

        <Paragraph>
          <strong>Django, Flask</strong> - Python web frameworks from earlier projects.
        </Paragraph>

        <Paragraph>
          <strong>WordPress</strong> - Old blog tests from way back.
        </Paragraph>

        <Paragraph>
          <strong>Netlify</strong> - Replaced by Vercel (see Main Tools for why).
        </Paragraph>

        <Paragraph>
          <strong>Express</strong> - Node backend framework. I never made many things of substance with it. All Next.js API routes now.
        </Paragraph>

        <Paragraph>
          <strong>Hetzner</strong> - VPS I tried for things like a reverse proxy or dev server or VS Code server. Don't currently have a need for a VPS.
        </Paragraph>

        <Paragraph>
          <strong>AutoHotKey</strong> - Was automating computer use on Windows: text expansion, window control, tool launching, and text manipulation. AI now does all the text expansion and manipulation I need.
        </Paragraph>

        <Divider />

        <Heading level={2}>Other Productivity &amp; Creative Tools</Heading>
        <Paragraph>
          Mostly deprecated tools I don't use much anymore, replaced by something better for my workflow.
        </Paragraph>

        <Paragraph>
          <strong>Microsoft Office Suite</strong> - For work when required.
        </Paragraph>

        <Paragraph>
          <strong>Canva</strong> - Was good for logo design and photo editing. I use it less often now because Affinity handles most of what I need.
        </Paragraph>

        <Paragraph>
          <strong>Photoshop, Photopea, GIMP, Inkscape</strong> - Old photo and vector editing tools. I do very little of this work now, and when I do, it's simpler tasks that Affinity handles well. AI has also replaced a lot of my graphic creation needs (see "When I need icons or graphics" above).
        </Paragraph>

        <Paragraph>
          <strong>Obsidian</strong> - I admire it from afar—the hotkeys, settings, and aesthetic are amazing—but I don't actively use it. Notion handles everything I need.
        </Paragraph>
      </ContentWrapper>
    </Container>
  );
}
