import { Heading, Paragraph, List, ListItem, Code, Link, Container, Text } from '@/components/Primitives';
import { ContentWrapper } from '@/components/ContentWrapper';
import type { PostMeta } from '@/types/post';

export const routeMetadata: PostMeta = {
  title: 'Reader\'s Guide',
  slug: 'readers-guide',
  date: '2026-01-27T00:00:00Z',
  author: 'Jay Griffin',
  type: 'doc' as const,
  tags: ['meta', 'transparency', 'ai', 'disclaimers'],
  description: 'How to interpret content labels, understand workflow transparency, and what guarantees (or lack thereof) apply to content on this site.',
  path: '/readers-guide',
};

export default function ContentGuidePage() {
  return (
    <Container size="sm">
      <ContentWrapper>
        <Heading level={1}>Reader's Guide</Heading>

        <Paragraph>
          How to interpret content labels and what guarantees (or lack thereof) apply to content on this site.
        </Paragraph>
    
        
        <Heading level={3}>No Guarantee of Accuracy</Heading>
        <Paragraph>
          <strong>I do not guarantee accuracy, completeness, or up-to-date information</strong> on any content published here. Much of this content is:
        </Paragraph>
        <List>
          <ListItem>Generated as I'm actively working through problems</ListItem>
          <ListItem>Lightly edited or completely unedited AI output</ListItem>
          <ListItem>Exploratory thinking published as-is</ListItem>
          <ListItem>Snapshots of understanding at a point in time</ListItem>
          <ListItem>Subject to change without notice or correction</ListItem>
        </List>
        <Paragraph>
          <strong>This is a working notebook, not authoritative documentation.</strong> Treat it accordingly. Verify anything important before relying on it.
        </Paragraph>

        <Heading level={3}>Why Publish Unedited Work?</Heading>
        <Paragraph>
          This site is my personal operating system for knowledge work, published fully open source with rough edges intact.
        </Paragraph>
        <Paragraph>
          Core principles:
        </Paragraph>
        <List>
          <ListItem><strong>Iteration over polish</strong> - Ship fast and try things, refine later if needed</ListItem>
          <ListItem><strong>Public collaboration</strong> - Anyone can view source, open PRs, or discuss improvements on GitHub</ListItem>
          <ListItem><strong>Creator superpower</strong> - Getting feedback from strangers who care about your work is incredibly valuable</ListItem>
          <ListItem><strong>Git as memory</strong> - Version history shows how ideas evolve over time</ListItem>
          <ListItem><strong>Personal RAG system</strong> - Every page becomes AI-retrievable context for future work</ListItem>
          <ListItem><strong>Transparency by default</strong> - Wrong or outdated? That's visible in the history</ListItem>
        </List>
        <Paragraph>
          <strong>On collaboration:</strong> One of the best parts of working in public is that people can spot errors, suggest improvements, or extend ideas you care about. Some of the best insights come from people you'd never meet otherwise. This kind of crowdsourced improvement wouldn't happen in private.
        </Paragraph>
        <Paragraph>
          <strong>On AI:</strong> Publishing also compounds as an AI-augmented knowledge base. I regularly link my own pages into AI conversations for instant context injection. More writing = better retrieval = smarter assistance on future work.
        </Paragraph>

        <Heading level={2}>Why Radical Transparency?</Heading>
        <Paragraph>
          The content I've respected most came from creators who shared what everyone else held back:
        </Paragraph>
        <List>
          <ListItem>Personal finance blogs that shared exact net worth, income, and spending details</ListItem>
          <ListItem>Business blogs that revealed exact revenue, sale prices, and decision-making processes</ListItem>
          <ListItem>Dev blogs where all the work happened in public—commits, errors, refactors visible to everyone</ListItem>
        </List>
        <Paragraph>
          That radical openness earned my respect. It was the content I <em>actually wanted to see</em>—not polished marketing, but real details and honest process.
        </Paragraph>
        <Paragraph>
          <strong>So this site publishes what I wish existed.</strong> Not a tactical growth strategy—just creating content I'd respect if someone else made it. Working in public because that's what I valued most in others.
        </Paragraph>

        <Heading level={2}>Content Categories & Workflow Transparency</Heading>
        <Paragraph>
          To help you quickly understand what you're reading, content is labeled with workflow transparency indicators. These aren't about credit—they're about setting expectations for texture, reliability, and what skills were involved.
        </Paragraph>

        <Heading level={3}>🤖 100% AI-Generated</Heading>
        <List>
          <ListItem><strong>Author field:</strong> Model name listed (e.g., "Claude Sonnet 4.5") - stylistic transparency, not authorship credit</ListItem>
          <ListItem><strong>Process:</strong> AI created this based on my prompt. I approved it for publication but didn't edit the content.</ListItem>
          <ListItem><strong>What this means:</strong> Expect smooth AI texture—balanced, diplomatic, but with occasional weird artifacts. I judged it worth sharing as-is.</ListItem>
          <ListItem><strong>Accuracy:</strong> May contain errors. AI-generated content can be confidently wrong about facts, dates, or technical details. Verify before relying on it.</ListItem>
          <ListItem><strong>Use case:</strong> Exploratory content, brainstorming dumps, feature specs, documentation I needed quickly</ListItem>
        </List>

        <Heading level={3}>🔧 AI-Assisted (&lt;100% Human)</Heading>
        <List>
          <ListItem><strong>Author field:</strong> Jay Griffin, model name listed (sometimes with authorship note explaining AI involvement)</ListItem>
          <ListItem><strong>Process:</strong> AI generated most content. I made editorial decisions, removed weak sections, added my own words, restructured, or heavily edited.</ListItem>
          <ListItem><strong>What this means:</strong> Hybrid texture. You'll feel the seams—AI flow interrupted by genuine human voice and judgment.</ListItem>
          <ListItem><strong>Accuracy:</strong> Better than 100% AI, but still no guarantee. I exercised judgment on structure and quality, not necessarily fact-checking every detail.</ListItem>
          <ListItem><strong>Use case:</strong> Most blog posts, docs, feature specs, technical writing where I need volume + quality</ListItem>
        </List>

        <Heading level={3}>✍️ 100% Human-Written</Heading>
        <List>
          <ListItem><strong>Author field:</strong> Jay Griffin</ListItem>
          <ListItem><strong>Process:</strong> I wrote this without AI assistance beyond basic tools (spell-check, grammar suggestions).</ListItem>
          <ListItem><strong>What this means:</strong> My natural writing and editing reflecting my own thoughts and ideas.</ListItem>
          <ListItem><strong>Accuracy:</strong> Still no guarantee, but reflects my direct understanding without AI intermediary.</ListItem>
          <ListItem><strong>Use case:</strong> Personal reflections, opinions where voice matters, content where AI texture would feel wrong</ListItem>
        </List>

        <Heading level={2}>About AI "Authorship"</Heading>
        <Paragraph>
          <strong>Important clarification:</strong> When AI generates content 100%, listing the model name (e.g., "Claude Sonnet 4.5") in the author field is a stylistic transparency choice that serves as a nod to the model providers, not actual authorship credit. AI cannot author content until AGI is achieved or some other AI breakthrough makes me develop empathy for it.
        </Paragraph>
        <Paragraph>
          I am always the author/publisher responsible for everything on this site, regardless of the creation process. The labels are informational signals to help you understand:
        </Paragraph>
        <List>
          <ListItem><strong>Texture:</strong> How smooth/human/hybrid the writing will feel</ListItem>
          <ListItem><strong>Reliability:</strong> How much verification rigor to expect</ListItem>
          <ListItem><strong>Skills demonstrated:</strong> Orchestration and judgment vs manual writing</ListItem>
          <ListItem><strong>Reading mode:</strong> Treat as exploratory vs authoritative</ListItem>
        </List>
        <Paragraph>
          If I publish it, I own it—whether I wrote every word or prompted AI and approved the result. That accountability is what makes AI assistance legitimate when used responsibly.
        </Paragraph>

        <Heading level={2}>What Makes AI Usage Legitimate</Heading>
        <Paragraph>
          Using AI responsibly requires judgment to know what's wrong, what's right, and what's missing. That judgment comes from domain knowledge you can't shortcut.
        </Paragraph>
        <Paragraph>
          When I use AI assistance, you should assume I applied critical thinking and discerned that some AI choices were wrong, some were right, and I only kept the right ones. This includes considering options other than what AI presented first.
        </Paragraph>
        <Paragraph>
          <strong>The label doesn't determine quality.</strong> AI-assisted work can be excellent if the judgment and orchestration were good. 100% human work can be mediocre if the thinking was lazy. The label just tells you what process was involved.
        </Paragraph>

        <Heading level={2}>Context-Specific Standards</Heading>
        <Paragraph>
          Different content types have different accuracy expectations:
        </Paragraph>

        <Heading level={3}>High-Stakes: Verify Everything</Heading>
        <List>
          <ListItem><strong>Professional advice</strong> - Legal and financial filings</ListItem>
          <ListItem><strong>Technical documentation</strong> - Code you'll deploy, configs you'll use</ListItem>
          <ListItem><strong>Research/journalism</strong> - Factual claims people will rely on</ListItem>
        </List>
        <Paragraph>
          <strong>Standard:</strong> AI or not, you're responsible for verification. The label doesn't absolve you.
        </Paragraph>

        <Heading level={3}>Exploratory: No Guarantees</Heading>
        <List>
          <ListItem><strong>Feature specs</strong> - Brainstorming, not final design</ListItem>
          <ListItem><strong>Todo pages</strong> - Planning documents, subject to change</ListItem>
          <ListItem><strong>Opinion/creative</strong> - Ideas, not facts</ListItem>
          <ListItem><strong>Code examples</strong> - Illustrative, test before using</ListItem>
        </List>
        <Paragraph>
          <strong>Standard:</strong> Published for my own use and thinking-out-loud. Useful to others if you verify and adapt.
        </Paragraph>

        <Heading level={3}>Personal: Subjective by Nature</Heading>
        <List>
          <ListItem><strong>Reflections</strong> - My experiences and interpretations</ListItem>
          <ListItem><strong>Project summaries</strong> - How I see my own work</ListItem>
          <ListItem><strong>Workflow notes</strong> - What works for me</ListItem>
        </List>
        <Paragraph>
          <strong>Standard:</strong> Accuracy matters less than authenticity. AI assistance doesn't undermine personal narrative.
        </Paragraph>

        <Heading level={2}>Licensing & Usage</Heading>
        <Paragraph>
          Unless otherwise noted, content on this site is shared under MIT License principles:
        </Paragraph>
        <List>
          <ListItem><strong>Use at your own risk</strong> - No warranties or guarantees</ListItem>
          <ListItem><strong>No liability</strong> - If you rely on incorrect information, that's on you</ListItem>
          <ListItem><strong>Verify before using</strong> - Especially for code, configs, or factual claims</ListItem>
          <ListItem><strong>Attribution appreciated but not required</strong> - Link back if you want, not mandatory</ListItem>
        </List>
        <Paragraph>
          The workflow transparency labels combined with MIT-style licensing set clear expectations: This is shared work, not authoritative truth. Test it yourself.
        </Paragraph>

        <Heading level={2}>Why This Approach Works</Heading>
        <Paragraph>
          <strong>Transparency over perfection.</strong> I'd rather:
        </Paragraph>
        <List>
          <ListItem>Ship 100 exploratory pages with clear labels than 10 "perfect" pages</ListItem>
          <ListItem>Show the messy process than pretend everything is polished</ListItem>
          <ListItem>Let you decide what to trust than gatekeep behind false authority</ListItem>
          <ListItem>Iterate publicly than hide work until it's "ready"</ListItem>
        </List>
        <Paragraph>
          The labels respect your intelligence. You can judge what's worth your attention based on context, not assumptions about my process.
        </Paragraph>

        <Heading level={2}>When to Trust This Content</Heading>
        <Paragraph>
          <strong>Trust the thinking, not the facts.</strong> This site demonstrates:
        </Paragraph>
        <List>
          <ListItem>Systems thinking and architecture decisions</ListItem>
          <ListItem>Orchestration skills and AI leverage</ListItem>
          <ListItem>Willingness to experiment, iterate, and publish rough drafts</ListItem>
        </List>
        <Paragraph>
          <strong>Don't trust blindly:</strong>
        </Paragraph>
        <List>
          <ListItem>Specific facts without verification</ListItem>
          <ListItem>Code without testing</ListItem>
          <ListItem>Dates or numbers (AI-generated content especially prone to errors here)</ListItem>
          <ListItem>Claims about external systems or APIs (may be outdated)</ListItem>
        </List>
        <Paragraph>
          This is my notebook, not your instruction manual. Use it as inspiration, not gospel.
        </Paragraph>

        <Heading level={2}>Questions or Concerns</Heading>
        <Paragraph>
          If content here is wrong or misleading and you relied on it, I'm sorry. That's the risk of consuming unedited work-in-progress. The transparency is meant to help you avoid that.
        </Paragraph>
        <Paragraph>
          If you have questions about a specific page's creation process or want more detail on workflow, check the git history or assume the worst (100% unedited AI dump). I'm not trying to hide anything—I'm just iterating and refining selectively.
        </Paragraph>
        <Paragraph>
          <strong>Bottom line:</strong> This site is built for me first, shared for others second. The labels help you decide if what I'm sharing is worth your time. Use your judgment. Verify before relying. Enjoy the messy process.
        </Paragraph>
      </ContentWrapper>
    </Container>
  );
}
