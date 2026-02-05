# My Tools

I've tried a lot of tools over the years and settled on what actually works for me. But I'm always trying new things because software continues to get better!

I'm a former accountant turned full-stack developer. My accounting background helps more than you'd think—my information systems courses taught me relational database design and normalization in the context of how large enterprises run their ERP systems and manage financial data. Very helpful insights for full-stack development. I also learned data analysis and visualization, which is huge for so many applications and problem-solving tasks in programming.

This page is about *how* I use these tools, not just what I have installed.

## Languages

**TypeScript** - All in, full steam ahead. I used to think TypeScript was extra boilerplate only needed for large enterprises and team environments, but now my interfaces are great AI food and guardrails. Same goes for testing—used to be about boilerplate and protecting large production apps, now it's super useful for augmenting AI functionality.

**JavaScript** - The foundation of everything I build.

**Python** - I love Python! Just have no use for it in my current workflow since I do 100% JavaScript web dev right now. Even if I made desktop or mobile apps, I'd reach for React Native or Electron.

**HTML** - I basically don't write HTML directly anymore—I make React pages and render markdown pages. I do use HTML elements in my React pages though! 

**CSS** - I write plenty of CSS, just as CSS-in-JS and component-scoped CSS instead of anything that cascades (shudder).

**Shell** - I use Shell every day for all kinds of stuff. But usually just for basic plumbing like installing packages, file operations, git operations, CLI tools. I don't find myself in the Shell trenches very often because AI can just tee me up for the command I need. 

## Main Dev Tools

**React, Next.js** - My full stack framework for building web applications. Switched to Vercel from Netlify mainly because of Next.js integration—they felt identical otherwise, but Vercel's Next.js support is seamless.

**CSS-in-JS (Emotion)** - How I handle styling.

**Node** - Runtime environment.

**Vercel** - CI/CD, hosting, and CDN. See above for why I picked this over Netlify.

**Cloudflare** - Registrar, DNS management, object storage, CDN.

**Git, GitHub** - Version control and collaboration. Ideas now go straight into my site repos as docs—that's where they start and live.

**GitHub Copilot, Claude Code** - AI coding assistants integrated into VS Code. Claude Sonnet 4.5 for most general work, Claude Opus 4.5 for tough problems, and GPT-4o for natural language editing (no code generation).

**OpenAI API** - For integrating AI capabilities directly into software applications.

**Claude, ChatGPT** - For general questions and code snippets using daily free tier. Honestly, the list of what I use these for goes on: brainstorming, writing, designing, learning, debugging, coding—you name it.

**VS Code** - My IDE. I've been using it for years and I'm entrenched in the workflow. For me to switch tools, something has to be *very very good* to justify the disruption. (I tried Cursor and liked it, but haven't made the jump yet.)

**Chrome DevTools, React Developer Tools** - Always open when I'm developing. I test on both desktop and real devices during development, not just at the end.

**Lovable.dev, Bolt.new** - Insanely good for rapid prototyping app ideas and UI. Amazing what these can generate. I don't ship their vibecoded output to production, but I take inspiration and study the generated repos for new code ideas.

## Main Productivity & Creative Tools

For web development I often have to create assets like images, icons, diagrams, and mockups. I've edited photos and created graphics for years so I have a solid toolkit for that.

**Notion** - My main hub for writing and notes. Fast for capturing lots of content, syncs across all devices.

**Affinity** - My go-to for final SVG tweaks. Sometimes I'll even use 3D tools, Canva, or AI image generators to create a specific visual, then emulate it in SVG here. I also use online SVG tools when I need quick edits.

**OBS** - Recording demos of what I'm programming to display functionality, timelapse changes, and progress.

**Excel, Google Sheets** - Mainly Google Sheets now since I don't have a Microsoft Office license. Surprisingly little use for spreadsheets these days given I'm a former accountant—most of my needs are met with Notion and custom coded tools. Current use case? Splitting expenses with my roommate.

**Custom Chrome Extension** - I built [Locus](https://chromewebstore.google.com/detail/locus/mamfkhoggkjbacfkibdbcfmoonjbecmp?hl=en-US) for bookmark launching and use it every day.

## How I Actually Work

### My design philosophy
Code first, design second. I prefer building functionality before choosing aesthetics—I don't like fighting with tools or creating hard-to-implement bespoke solutions just because they'd be slightly prettier.

The reason: code generates new possibilities for what the design can be. You can't wireframe something like a generated or automated page!

I tried Figma for visualizing an ecommerce site. As a solo dev who's a programmer first, I found it less helpful than expected. For big features, I'll brainstorm and outline a spec. For small features, I iterate immediately in code.

**I'm not an artist.** About 90% of the time I'm foraging for something that meets my taste, then editing and iterating from there rather than deriving art from scratch. I just can't bring the image in my head into the real world without it taking 100x longer than it needs to. So instead I default to finding something I think is pretty and copying it or emulating it.

Interestingly, by trying to copy someone else, that *becomes* my style—because I never copy it 1:1, it's always in my own way.

### When I need an SVG icon...
AI generation first. Usually works! If I need tweaks, I'll use Affinity. I've also gotten much better at hunting for flexibly-licensed icons in open source repos. I forage for SVGs and SVG patterns online when I want something cool.

I used to use Inkscape and online SVG tools, editing the code directly in my IDE. But nowadays AI coding assistants can create an icon on the fly, which is faster. Sometimes I'll even use 3D tools, Canva, or AI image generators to create a specific visual, then emulate it in SVG.

### Color palettes...
I use tools like Coolors or just ask AI for color scheme suggestions.

### Photo editing these days...
I do very little photo editing now. When I do, it's practical stuff: cropping, aligning, background removal, unnecessary detail removal, optimization, and fixing aspect ratios and pixel sizes.

### Starting a new web project...
I open: VS Code, browser DevTools, dev server on both desktop and actual phone, the live site, my GitHub, Claude/ChatGPT webapp, and GitHub Copilot. Then I jump straight into code.

## Other Dev Tools

Mostly old experiments and learning projects that have been replaced by something better for me.

**Vite, Hugo, Jekyll, Eleventy** - Static site generators from when I was learning about web dev and project structure. Before I went all-in on Next.js.

**Tailwind, DaisyUI** - I'm enjoying CSS-in-JS now and haven't been using Tailwind unless it's the default for vibecoding. DaisyUI I don't use anymore—I'll usually make a custom component if I need it.

**Django, Flask** - Python web frameworks from earlier projects.

**WordPress** - Old blog tests from way back.

**Netlify** - Replaced by Vercel (see Main Tools for why).

**Express** - Node backend framework. I never made many things of substance with it. All Next.js API routes now.

**Hetzner** - VPS I tried for things like reverse proxy. Don't currently have a need for a VPS.

**AutoHotKey** - Was automating computer use on Windows: text expansion, window control, tool launching, and text manipulation. AI now does all the text expansion and manipulation I need.

## Other Productivity & Creative Tools

Mostly deprecated tools I don't use much anymore, replaced by something better for my workflow.

**Microsoft Office Suite** - For work when required.

**Canva** - Was good for SVG iteration, logo design, and photo editing. I use it less often now because Affinity handles most of what I need.

**Photoshop, Photopea, GIMP, Inkscape** - Old photo and vector editing tools. I do very little of this work now, and when I do, it's simpler tasks that Affinity handles well. AI has also replaced a lot of my SVG creation needs (see "When I need an SVG icon" above).

**Obsidian** - I admire it from afar—the hotkeys, settings, and aesthetic are amazing—but I don't actively use it. Notion handles everything I need.
