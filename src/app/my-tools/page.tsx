'use client';

import { Heading, Paragraph, Container, Divider } from '@/components/Primitives';
import { ContentWrapper } from '@/components/ContentWrapper';
import { ToolCard } from '@/components/ToolCard';
import type { PostMeta } from '@/types/post';
import styled from '@emotion/styled';

const ColoredHeading = styled.h2`
  background: linear-gradient(180deg, hsl(210, 100%, 60%), hsl(210, 100%, 40%));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: var(--font-sekuya);
  font-size: 2rem;
  font-weight: 400;
  line-height: 1.2;
  margin-top: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const gridContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '2rem',
  margin: '2rem 0'
};

export const routeMetadata: PostMeta = {
  title: 'My Tools Test',
  slug: 'my-tools-test',
  date: '2026-02-03T00:00:00Z',
  author: ['Jay Griffin'],
  description: 'Testing logo layout for tools page',
  tags: ['test'],
  type: 'doc',
  path: '/my-tools/test',
};

export default function MyToolsTestPage() {
  return (
    <Container size="sm">
      <ContentWrapper>
        <div style={{ textAlign: 'center' }}>

          <ColoredHeading>Software I'm Following</ColoredHeading>

          <div style={{ margin: '3rem 0' }}>
            <Paragraph>
              These are the tools I'm actively watching in the AI coding space. Cursor is very cool and I've used it, but I haven't made the jump from VS Code yet. Claude Code looks absolutely epic for customizing agents. The GitHub Copilot SDK sounds promising for building custom agents too. Claude Cowork could make AI coding accessible to normies. Codex—OpenAI is scrambling to catch up in a space they practically invented. Exo is a newer project for clustering devices together to run AI models distributed—interesting concept but still pretty experimental.
            </Paragraph>
          </div>

          <div style={gridContainerStyle}>
            <ToolCard logo="/tool-logos/cursor.svg" title="Cursor" description="Very cool" invert />
            <ToolCard logo="/tool-logos/claudecode.svg" title="Claude Code" description="Absolutely epic" />
            <ToolCard logo="/tool-logos/githubcopilotsdk.svg" title="GitHub Copilot SDK" description="Sounds great" />
            <ToolCard logo="/tool-logos/claude.svg" title="Claude Cowork" description="For normies" />
            <ToolCard logo="/tool-logos/codex.svg?v=2" title="Codex" description="OpenAI scrambling" />
            <ToolCard logo="/tool-logos/exo.svg" title="Exo" description="Cluster devices for distributed AI" />
          </div>

          <Divider />

          <ColoredHeading>Software I Plan to Use (But Haven't Found Time)</ColoredHeading>

          <div style={{ margin: '3rem 0' }}>
            <Paragraph>
              I'm excited about these tools but haven't carved out time to properly explore them. LangChain and LangSmith look powerful for building AI applications and agent workflows.
            </Paragraph>
          </div>

          <div style={gridContainerStyle}>
            <ToolCard logo="/tool-logos/langchain.svg" title="LangChain" description="AI chains" invert />
            <ToolCard logo="/tool-logos/langsmith.svg" title="LangSmith" description="Monitoring and debugging chains" invert />
          </div>

          <Divider />

          <ColoredHeading>Homelab & Self-Hosting (Want to Use)</ColoredHeading>

          <div style={{ margin: '3rem 0' }}>
            <Paragraph>
              I want to build out a proper homelab setup. Ollama and Open WebUI would let me run language models locally instead of relying on cloud APIs. Proxmox for virtualization to run multiple services on dedicated hardware. For storage, I'm considering TrueNAS for ZFS-based enterprise features, Unraid for its flexibility, or OpenMediaVault for a lightweight Debian-based solution. Prometheus and Grafana would handle monitoring and metrics visualization. Home Assistant would tie everything together with home automation. Hetzner's affordable VPS would work well as a cloud component that integrates with local homelab infrastructure.
            </Paragraph>
          </div>

          <div style={gridContainerStyle}>
            <ToolCard logo="/tool-logos/ollama.svg" title="Ollama" description="Run llms locally" invert />
            <ToolCard logo="/tool-logos/openwebui.svg" title="Open WebUI" description="Self hosted chatgpt ui" invert />
            <ToolCard logo="/tool-logos/proxmox.svg" title="Proxmox" description="Homelab virtualization" />
            <ToolCard logo="/tool-logos/grafana.svg" title="Grafana" description="Monitoring dashboards" />
            <ToolCard logo="/tool-logos/hetzner.svg" title="Hetzner" description="Cheap vps" />
            <ToolCard logo="/tool-logos/truenas.svg" title="TrueNAS" description="Zfs-based nas solution" />
            <ToolCard logo="/tool-logos/homeassistant.svg" title="Home Assistant" description="Home automation platform" />
            <ToolCard logo="/tool-logos/prometheus.svg" title="Prometheus" description="Metrics and alerting" />
            <ToolCard logo="/tool-logos/unraid.svg" title="Unraid" description="Nas and virtualization os" />
            <ToolCard logo="/tool-logos/openmediavault.svg" title="OpenMediaVault" description="Debian-based nas solution" />
          </div>

          <Divider />

          <ColoredHeading>Languages</ColoredHeading>

          <div style={{ margin: '3rem 0' }}>
            <Paragraph>
              I'm all-in on TypeScript now—my interfaces are great AI food and guardrails. JavaScript is the foundation of everything I build. I love Python but have no use for it since I do 100% JavaScript web dev right now. I basically don't write HTML directly anymore—I make React pages and render markdown pages. Shell I use every day for basic plumbing—installing packages, file operations, git operations, CLI tools.
            </Paragraph>
          </div>

          <div style={gridContainerStyle}>
            <ToolCard logo="/tool-logos/TypeScript.svg" title="TypeScript" description="All in, full steam ahead" />
            <ToolCard logo="/tool-logos/JavaScript.svg" title="JavaScript" description="The foundation" />
            <ToolCard logo="/tool-logos/python.svg" title="Python" description="Love it, not currently using" />
            <ToolCard logo="/tool-logos/html.svg" title="HTML" description="Tim Berners is a real one" />
            <ToolCard logo="/tool-logos/css.svg" title="CSS" description="Css-in-js good" />
            <ToolCard logo="/tool-logos/shell.svg" title="Shell" description="Programming vegetables" />
          </div>

          <Divider />

          <ColoredHeading>Core Dev Tools</ColoredHeading>

          <div style={{ margin: '3rem 0' }}>
            <Paragraph>
              This is my daily toolkit. React and TypeScript are what I'm writing most of the day. Next.js makes for a great webdev experience. Vite is my build tool when I'm not using Next. Emotion handles CSS-in-JS. Vercel deploys everything smoothly with better Next.js integration than Netlify. Cloudflare is my registrar, DNS management, object storage, and CDN. Git and GitHub keep my code safe. GitHub Copilot is currently my AI coding assistant of choice (Claude Sonnet 4.5 for general work, Claude Opus 4.5 for tough problems, GPT-4o for natural language editing). VS Code is where I live. Chrome DevTools is where I go when my CSS breaks, which is often. Jaygriff.com is pretty helpful, highly recommend.
            </Paragraph>
          </div>

          <div style={gridContainerStyle}>
            <ToolCard logo="/tool-logos/react.svg" title="React" description="Components <3" />
            <ToolCard logo="/tool-logos/nextjs.svg" title="Next.js" description="React cloud wizardry" />
            <ToolCard logo="/tool-logos/vite.svg" title="Vite" description="Build tool" />
            <ToolCard logo="/tool-logos/emotion.png" title="Emotion" description="Css-in-js" />
            <ToolCard logo="/tool-logos/vercel.svg" title="Vercel" description="A very good triangle" />
            <ToolCard logo="/tool-logos/cloudflare.svg" title="Cloudflare" description="A very good cloud" />
            <ToolCard logo="/tool-logos/git.svg" title="Git" description="Version control" />
            <ToolCard logo="/tool-logos/github.svg" title="GitHub" description="Some cool code on here" />
            <ToolCard logo="/tool-logos/githubcopilot.svg" title="GitHub Copilot" description="How the sausage is made" />
            <ToolCard logo="/tool-logos/vscode.svg" title="VS Code" description="My IDE" />
            <ToolCard logo="/tool-logos/chromedevtools.svg" title="Chrome DevTools" description="My CSS broke again" />
            <ToolCard logo="/tool-logos/favicon.svg" title="jaygriff.com" description="Pretty good imo" />
          </div>

          <Divider />

          <ColoredHeading>Chatbots</ColoredHeading>

          <div style={{ margin: '3rem 0' }}>
            <Paragraph>
              The list of what I use these for goes on and on: brainstorming, writing, designing, learning, debugging, coding—you name it. ChatGPT started it all, though OpenAI changes the interface seemingly every day. Claude from Anthropic is incredibly helpful and has become my go-to for most tasks. Gemini is a solid all-rounder when I need a different perspective.
            </Paragraph>
          </div>

          <div style={gridContainerStyle}>
            <ToolCard logo="/tool-logos/openai.svg" title="ChatGPT" description="Openai changes it every day" invert />
            <ToolCard logo="/tool-logos/claude.svg" title="Claude" description="Thanks Anthropic very cool" />
            <ToolCard logo="/tool-logos/gemini.svg" title="Gemini" description="Pretty good all rounder" />
          </div>

          <Divider />

          <ColoredHeading>Vibecoding</ColoredHeading>

          <div style={{ margin: '3rem 0' }}>
            <Paragraph>
              Insanely good for rapid prototyping app ideas and UI. Amazing what these can generate. I don't ship their vibecoded output to production—I prefer to ship code I understand which may mean doing a rewrite—but I take inspiration and study the generated repos for new code ideas. I could write on and on how I study vibe coding apps, their system prompts, and their outputs.
            </Paragraph>
          </div>

          <div style={gridContainerStyle}>
            <ToolCard logo="/tool-logos/lovable.svg" title="Lovable.dev" description="Rapid prototyping" />
            <ToolCard logo="/tool-logos/bolt.svg" title="Bolt.new" description="UI generation" />
          </div>

          <Divider />

          <ColoredHeading>Productivity</ColoredHeading>

          <div style={{ margin: '3rem 0' }}>
            <Paragraph>
              Notion is my main hub for writing and notes—fast for capturing lots of content, syncs across all devices. I admire Obsidian from afar (the hotkeys, settings, and aesthetic are amazing) but I don't actively use it. Surprisingly little use for spreadsheets these days given I'm a former accountant—most of my needs are met with Notion and custom coded tools. Current use case? Splitting expenses with my roommate using Google Sheets. Excel is powerful dark magic that I respect but don't fully master. Google Sheets with AppScript lets me put entire JavaScript programs in cells, which is both terrifying and exactly what I need. Office 365 is for work when required. Locus is a custom Chrome extension I built for bookmark launching—I use it every day.
            </Paragraph>
          </div>

          <div style={gridContainerStyle}>
            <ToolCard logo="/tool-logos/notion.svg" title="Notion" description="Main hub for writing" />
            <ToolCard logo="/tool-logos/obsidian.svg" title="Obsidian" description="Admire from afar" />
            <ToolCard logo="/tool-logos/excel.svg" title="Excel" description="Do not cite the deep magic to me, witch" />
            <ToolCard logo="/tool-logos/sheets.svg" title="Google Sheets" description="Apps Script pretty cool" />
            <ToolCard logo="/tool-logos/office365.svg" title="Office Suite" description="For work if need be" />
            <ToolCard logo="/tool-logos/locus.svg" title="Locus" description="My Chrome extension" />
          </div>

          <Divider />

          <ColoredHeading>Photo & Image Editing</ColoredHeading>

          <div style={{ margin: '3rem 0' }}>
            <Paragraph>
              Affinity is my go-to for image and vector graphic work—professional-grade design tools without the Adobe subscription. I also use online SVG tools when I need quick edits. I used Canva heavily before but use it less often now because Affinity handles most of what I need. I do very little photo editing these days—when I do, it's practical stuff: cropping, aligning, background removal, unnecessary detail removal, optimization, and fixing aspect ratios and pixel sizes.
            </Paragraph>
          </div>

          <div style={gridContainerStyle}>
            <ToolCard logo="/tool-logos/affinity.svg" title="Affinity" description="A dream come true" />
            <ToolCard logo="/tool-logos/canva.svg" title="Canva" description="Use less often now" />
          </div>

          <Divider />

          <ColoredHeading>Video Recording</ColoredHeading>

          <div style={{ margin: '3rem 0' }}>
            <Paragraph>
              Recording demos of what I'm programming to display functionality, timelapse changes, and progress. It's powerful, free, and handles everything I need for creating technical content.
            </Paragraph>
          </div>

          <div style={gridContainerStyle}>
            <ToolCard logo="/tool-logos/obs.svg" title="OBS" description="Recording demos" />
          </div>

          <Divider />

          <ColoredHeading>Design & Color Tools</ColoredHeading>

          <div style={{ margin: '3rem 0' }}>
            <Paragraph>
              I've used Figma for visualizing and wireframing sites. As a solo dev who's a programmer first, I found it less helpful than expected. I prefer vibecoding a rough version of the feature or page, then iterating on the design in code. Coolors helps me generate and explore color palettes, though I often just ask AI for color scheme suggestions.
            </Paragraph>
          </div>

          <div style={gridContainerStyle}>
            <ToolCard logo="/tool-logos/figma.svg" title="Figma" description="I am not an artist" />
            <ToolCard logo="/tool-logos/coolors.svg" title="Coolors" description="Color palettes" />
          </div>

          <Divider />

          <ColoredHeading>OS Automation</ColoredHeading>

          <div style={{ margin: '3rem 0' }}>
            <Paragraph>
              Hammerspoon lets me automate macOS with Lua scripts—creating custom keyboard shortcuts and window management. AutoHotKey was for automating computer use on Windows: text expansion, window control, tool launching, and text manipulation. AI now does all the text expansion and manipulation I need.
            </Paragraph>
          </div>

          <div style={gridContainerStyle}>
            <ToolCard logo="/tool-logos/hammerspoon.svg" title="Hammerspoon" description="MacOS automation" />
            <ToolCard logo="/tool-logos/autohotkey.png" title="AutoHotKey" description="Windows automation" />
          </div>

          <Divider />

          <ColoredHeading>CSS Frameworks (Superseded)</ColoredHeading>

          <div style={{ margin: '3rem 0' }}>
            <Paragraph>
              I'm enjoying CSS-in-JS now and haven't been using Tailwind unless it's the default for vibecoding. DaisyUI provided nice component defaults, but I don't use it anymore—I'll usually make a custom component if I need it. More control, cleaner code, better understanding of what's happening under the hood.
            </Paragraph>
          </div>

          <div style={gridContainerStyle}>
            <ToolCard logo="/tool-logos/tailwind.svg" title="Tailwind" description="UTILITY FIRST!" />
            <ToolCard logo="/tool-logos/daisyui.svg" title="DaisyUI" description="I roll my own components now" />
          </div>

          <Divider />

          <ColoredHeading>Web Frameworks (Superseded)</ColoredHeading>

          <div style={{ margin: '3rem 0' }}>
            <Paragraph>
              Django and Flask were my Python web frameworks from earlier projects. Express.js—I never made many things of substance with it. All Next.js API routes now. WordPress was for old blog tests from way back—my nemesis. I've moved on to Next.js and haven't looked back.
            </Paragraph>
          </div>

          <div style={gridContainerStyle}>
            <ToolCard logo="/tool-logos/django.svg" title="Django" description="Python web framework" />
            <ToolCard logo="/tool-logos/flask.svg" title="Flask" description="Earlier projects" />
            <ToolCard logo="/tool-logos/express.svg" title="Express" description="Hard" invert />
            <ToolCard logo="/tool-logos/wordpress.svg" title="WordPress" description="My nemesis" />
          </div>

          <Divider />

          <ColoredHeading>Static Site Generators (Superseded)</ColoredHeading>

          <div style={{ margin: '3rem 0' }}>
            <Paragraph>
              From when I was learning about web dev and project structure—before I went all-in on Next.js. Hugo is blazing fast and great for static sites, but the Go templating language was a pain. Jekyll got me started with static sites but feels dated now. Next.js handles everything these tools did and more.
            </Paragraph>
          </div>

          <div style={gridContainerStyle}>
            <ToolCard logo="/tool-logos/hugo.svg" title="Hugo" description="Awesome except for the scripting" />
            <ToolCard logo="/tool-logos/jekyll.svg" title="Jekyll" description="Superseded" />
          </div>

          <Divider />

          <ColoredHeading>Hosting & Infrastructure (Superseded)</ColoredHeading>

          <div style={{ margin: '3rem 0' }}>
            <Paragraph>
              Netlify was my hosting platform of choice for static sites and serverless functions. Switched to Vercel from Netlify mainly because of Next.js integration—they felt identical otherwise, but Vercel's Next.js support is seamless.
            </Paragraph>
          </div>

          <div style={gridContainerStyle}>
            <ToolCard logo="/tool-logos/netlify.svg" title="Netlify" description="Replaced by Vercel" />
          </div>

          <Divider />

          <ColoredHeading>Tools Vanquished by Affinity</ColoredHeading>

          <div style={{ margin: '3rem 0' }}>
            <Paragraph>
              Old photo and vector editing tools. I do very little of this work now, and when I do, it's simpler tasks that Affinity handles well. AI has also replaced a lot of my graphic creation needs. Photoshop was too expensive with its subscription model. Photopea was cool as a web-based alternative, but Affinity wins. Inkscape served me well for vector work until Affinity Designer came along. GIMP was free, but you really do get what you pay for. Affinity conquered them all.
            </Paragraph>
          </div>

          <div style={gridContainerStyle}>
            <ToolCard logo="/tool-logos/photoshop.svg" title="Photoshop" description="Expensive" />
            <ToolCard logo="/tool-logos/photopea.svg" title="Photopea" description="Pretty cool but Affinity wins" />
            <ToolCard logo="/tool-logos/inkscape.svg" title="Inkscape" description="Replaced by Affinity" />
            <ToolCard logo="/tool-logos/gimp.svg" title="GIMP" description="Cheap but you get what you pay for" />
          </div>

        <Divider />

        </div>
      </ContentWrapper>
    </Container>
  );
}
