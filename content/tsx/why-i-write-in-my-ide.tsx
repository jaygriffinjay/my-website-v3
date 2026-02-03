import type { PostMeta } from '@/types/post';
import { Heading, Paragraph, List, ListItem, Link, Code } from '@/components/Primitives';
import { CodeBlock } from '@/components/CodeBlock/CodeBlock';

export const metadata: PostMeta = {
  title: 'Why I Write Everything in My IDE Now',
  slug: 'why-i-write-in-my-ide',
  date: '2026-02-02T00:00:00Z',
  author: ['Jay Griffin', 'Claude Sonnet 4.5'],
  authorshipNote: 'AI-Assisted - Jay\'s workflow insights, Claude structured the explanation',
  description: 'AI coding assistants changed how I create content - repo-wide context, multi-file operations, and instant publishing make traditional writing tools obsolete for my workflow',
  tags: ['ai', 'writing', 'workflow', 'dev', 'productivity', 'ide', 'content-creation'],
  path: '/posts/why-i-write-in-my-ide',
};

export default function WhyIWriteInMyIDE() {
  return (
    <>

      <Paragraph>
        I refuse to write content in anything but my IDE anymore. Not because I'm a developer trying to be edgy—because 
        AI coding assistants fundamentally changed what's possible when creating content.
      </Paragraph>

      <Heading level={2}>The Real Innovation: Velocity</Heading>

      <Paragraph>
        The actual innovation isn't "AI can write." It's the <strong>prompt → approve/deny → ship loop</strong>. 
        When AI handles all the low-level synthesis work, you can go from idea to published content in minutes instead of hours.
      </Paragraph>

      <Paragraph>
        This loop exists in most AI apps now. What makes coding assistants different is <strong>scale and context</strong>. 
        I can pull from any file in the repo for context. I can fetch from any URL with tool use. I can write to multiple 
        pages and files simultaneously. I can write to 1 page, 10 pages, 100—doesn't matter. The AI has full repo context 
        and can create, edit, and synthesize across the entire project.
      </Paragraph>

      <Paragraph>
        Go try to do this in Notion, Obsidian, or Google Docs. You can't. That's the leverage difference.
      </Paragraph>

      <Heading level={2}>What Traditional Writing Tools Can't Do</Heading>

      <Heading level={3}>Repo-Wide Context</Heading>

      <Paragraph>
        When I'm writing an article about a component I built, the AI can read the actual component code, the tests, 
        the related components, the documentation—everything. It knows the project structure, the conventions, the design patterns.
      </Paragraph>

      <Paragraph>
        In Notion or Google Docs? I'd have to manually copy-paste context, hope I included the right pieces, and constantly 
        switch between tools.
      </Paragraph>

      <Heading level={3}>Multi-File Operations</Heading>

      <Paragraph>
        I can generate 10 related articles in one conversation. The AI creates the files, adds proper metadata, handles 
        cross-linking, ensures consistent terminology, and even updates the navigation if needed.
      </Paragraph>

      <Paragraph>
        In traditional tools, that's 10 separate documents, manual linking, manual organization, and hoping you remembered 
        to use the same terms across all of them.
      </Paragraph>

      <Heading level={3}>URL Context Integration</Heading>

      <Paragraph>
        Need to reference something from the web? The AI can fetch it, extract the relevant information, and synthesize 
        it into the article. No switching tabs, no manual copying, no context loss.
      </Paragraph>

      <Heading level={3}>Instant Publishing</Heading>

      <Paragraph>
        My IDE is also my deployment pipeline. Edit → save → git push → deployed. The content I'm writing IS the production 
        content. There's no export step, no conversion, no "now copy this to the CMS."
      </Paragraph>

      <Heading level={2}>The Scale Advantage</Heading>

      <Paragraph>
        When you eliminate friction, you change what's worth doing. It's now worth it to:
      </Paragraph>

      <List>
        <ListItem>Document every feature as I build it</ListItem>
        <ListItem>Write detailed explanations of debugging sessions</ListItem>
        <ListItem>Create comprehensive guides for tools I use</ListItem>
        <ListItem>Generate related articles from a single conversation</ListItem>
        <ListItem>Maintain up-to-date documentation without it feeling like overhead</ListItem>
      </List>

      <Paragraph>
        The activation energy is so low that documentation becomes a natural part of development, not a separate chore.
      </Paragraph>

      <Heading level={2}>The Curation Problem</Heading>

      <Paragraph>
        When you can generate this much content, the bottleneck shifts from creation to curation. Not everything needs 
        to be published. Not everything is worth the same attention.
      </Paragraph>

      <Paragraph>
        This is where transparency becomes important. When readers encounter AI-synthesized content, they want to know 
        why you thought it was worth creating. That's where human context matters—voice notes, author commentary, curation 
        decisions. (See <Link href="/docs/voice-note-feature">VoiceNote Component</Link> for how I'm handling this.)
      </Paragraph>

      <Heading level={2}>What This Enables</Heading>

      <Heading level={3}>Ship Daily</Heading>

      <Paragraph>
        I can realistically publish something every day I code. Even small features or debugging sessions become publishable 
        content because the synthesis work is handled by AI.
      </Paragraph>

      <Heading level={3}>Build in Public</Heading>

      <Paragraph>
        Documentation isn't an afterthought—it's generated as part of the development process. My commit history and my 
        content archive are synchronized.
      </Paragraph>

      <Heading level={3}>Knowledge Compounding</Heading>

      <Paragraph>
        Every article references previous work. The AI can pull from the entire corpus when writing new content. 
        Knowledge builds on itself instead of existing in isolated documents.
      </Paragraph>

      <Heading level={2}>The Workflow</Heading>

      <CodeBlock language="markdown">
{`Me: "Write an article about the Timeline component I just built. 
     Include the architecture, the bugs I fixed, and why I chose SVG."

AI: [reads Timeline.tsx, reads related components, reads git history]
    [generates comprehensive article with code examples]
    [creates content/tsx/building-timeline-component.tsx]
    [adds proper metadata and tags]

Me: [reviews, approves, makes minor edits]

git add . && git commit -m "Add Timeline component article" && git push

Done. Published.`}
      </CodeBlock>

      <Paragraph>
        Start to finish: 5-10 minutes. The same workflow in a traditional writing tool would take hours—gathering context, 
        formatting code, organizing sections, exporting, uploading.
      </Paragraph>

      <Heading level={2}>Why This Matters</Heading>

      <Paragraph>
        Most developers aren't documenting their work not because they don't want to, but because the friction is too high. 
        When documentation requires context switching, manual formatting, and separate publishing steps, it doesn't happen.
      </Paragraph>

      <Paragraph>
        AI coding assistants eliminate that friction. Not by "writing for you," but by handling the synthesis and formatting 
        while you focus on curation and direction.
      </Paragraph>

      <Paragraph>
        The result: more documentation, better knowledge sharing, and a more connected development process.
      </Paragraph>

      <Heading level={2}>Anthropic Figured It Out</Heading>

      <Paragraph>
        Anthropic clearly noticed that developers had something special going on. Coding assistants weren't just helping people code faster—they were enabling entirely new workflows.
      </Paragraph>

      <Paragraph>
        So they built <Link href="https://claude.com/product/cowork">Claude Cowork</Link>: an attempt to bring this paradigm to general audiences. Multi-file context, project-wide 
        understanding, integrated file operations—all the capabilities that developers have been using for content creation, 
        now packaged for non-technical users.
      </Paragraph>

      <Paragraph>
        The bet: developers accidentally discovered the future of knowledge work. Not because developers are special, 
        but because coding assistants happened to solve the fundamental problems first: context management, multi-document 
        operations, and precision editing of both code and content using natural language.
      </Paragraph>

      <Paragraph>
        They realized the secret sauce wasn't coding—it was the <strong>infrastructure for working with structured information 
        at scale</strong>. Developers just got there first because our work happens in file systems, git repos, and IDEs 
        that already had the right primitives.
      </Paragraph>

      <Heading level={2}>OpenAI Launches Codex App (Feb 2, 2026)</Heading>

      <Paragraph>
        Today, OpenAI announced the <Link href="https://openai.com/index/introducing-the-codex-app/">Codex desktop app</Link>—their 
        answer to Claude Cowork. The pitch? "Codex is designed to close the gap by making it easier to direct, supervise, 
        and apply the full intelligence of our models to real work."
      </Paragraph>

      <Paragraph>
        They added skills for document creation: PDF, spreadsheet, and docx files. Image generation. Deployment automation. 
        Linear integration. The exact same pattern—take the coding agent infrastructure and apply it to everything else.
      </Paragraph>

      <Paragraph>
        This is validation that the insight is real: <strong>the best interface for AI-assisted knowledge work looks like 
        a coding environment</strong>. Not because you're writing code, but because the primitives (file operations, version 
        control, multi-document editing, context management) are exactly what you need for working with information at scale.
      </Paragraph>

      <Paragraph>
        Both companies saw developers having "aha" moments—not just coding faster, but using these tools to write, document, 
        create, and think. Now they're racing to productize it.
      </Paragraph>

      <Heading level={2}>The Meta Point</Heading>

      <Paragraph>
        This article itself is an example of the workflow. I had a conversation about voice notes, realized I was actually 
        talking about two different topics, and within minutes had this article created, organized, and ready to publish.
      </Paragraph>
    </>
  );
}
