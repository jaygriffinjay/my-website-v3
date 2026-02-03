import { Heading, Paragraph, List, ListItem, Link, Code } from '@/components/Primitives';
import { CodeBlock } from '@/components/CodeBlock/CodeBlock';
import type { PostMeta } from '@/types/post';

export const metadata: PostMeta = {
  title: 'Audio as Optional Prop: Adding Human Commentary to AI Content',
  slug: 'audio-primitive',
  date: '2026-01-29T00:00:00Z',
  updated: '2026-02-02T00:00:00Z',
  author: ['Jay Griffin', 'Claude Sonnet 4.5'],
  authorshipNote: '🔧 AI-Assisted - Jay\'s design evolution, Claude documented the spec',
  type: 'doc',
  description: 'Feature spec for audio as optional prop on content primitives - attach human commentary to any component',
  tags: ['feature-spec', 'audio', 'ai-content', 'primitives', 'design-systems', 'transparency'],
};

export default function AudioPrimitive() {
  return (
    <>
      <Heading level={2}>The Problem</Heading>

      <Paragraph>
        I'm generating a lot of AI-assisted content now—articles, documentation, feature specs—all written in my IDE 
        with AI coding assistants. (See <Link href="/posts/why-i-write-in-my-ide">Why I Write Everything in My IDE Now</Link> for the full workflow.)
      </Paragraph>

      <Paragraph>
        The velocity is amazing, but it creates a new problem: readers encounter AI-synthesized content and may want to know 
        <strong> why I thought it was worth creating</strong>. Audio commentary can help with this—adding human context, reasoning, 
        and transparency without slowing down the creation loop.
      </Paragraph>

      <Heading level={2}>Evolution: From VoiceNote Component to Audio as Optional Prop</Heading>

      <Paragraph>
        Initially, I imagined a standalone <Code>VoiceNote</Code> component—a special callout box with audio player and transcript. 
        Like a blockquote but with voice.
      </Paragraph>

      <Paragraph>
        But then I realized: <strong>audio isn't a content type, it's metadata</strong>. I don't want to insert special 
        "voice note boxes" that interrupt the flow. I want to attach audio to the content that already exists.
      </Paragraph>

      <List>
        <ListItem><Code>&lt;CodeBlock audio="..."&gt;</Code> - "Here's what this code does"</ListItem>
        <ListItem><Code>&lt;Heading audio="..."&gt;</Code> - "Here's what this section is about"</ListItem>
      </List>

      <Paragraph>
        This is better because:
      </Paragraph>

      <List>
        <ListItem><strong>Semantic integrity</strong> - Headings stay headings, code stays code</ListItem>
        <ListItem><strong>Natural breakpoints</strong> - Audio at headings acts like chapter markers</ListItem>
        <ListItem><strong>No flow interruption</strong> - Audio enhances existing content, doesn't fragment it</ListItem>
        <ListItem><strong>Composable</strong> - Any component can have audio, not just special "voice note" components</ListItem>
      </List>

      <Paragraph>
        So this spec evolved from "VoiceNote component" to "audio as optional prop."
      </Paragraph>

      <Heading level={2}>What Audio Commentary Provides</Heading>

      <Paragraph>
        Transparency and context:
      </Paragraph>

      <List>
        <ListItem><strong>Process visibility</strong> - "Here's why I curated this"</ListItem>
        <ListItem><strong>Human reasoning</strong> - "Why this matters to me"</ListItem>
        <ListItem><strong>Decision context</strong> - "What made this worth shipping"</ListItem>
      </List>

      <Paragraph>
        <strong>It's not about explaining the text. It's about explaining why the text exists and why it matters.</strong>
      </Paragraph>

      <Heading level={2}>Why This Is Different</Heading>

      <Paragraph>
        Current content formats force you to choose:
      </Paragraph>

      <List>
        <ListItem><strong>Blogs</strong> - Static text only, one voice throughout</ListItem>
        <ListItem><strong>Video essays</strong> - Full commitment to video format, can't skim</ListItem>
        <ListItem><strong>Podcasts</strong> - Audio-only, completely separate from written content</ListItem>
      </List>

      <Paragraph>
        <strong>Audio is hybrid:</strong> AI-generated comprehensive text + inline human reasoning attached to specific content. Best of both:
      </Paragraph>

      <List>
        <ListItem>Readers get comprehensive, well-synthesized content</ListItem>
        <ListItem>AI does the synthesis, human shares the reasoning and curation</ListItem>
        <ListItem>Perfect transparency workflow - clearly marked AI synthesis vs human reasoning</ListItem>
      </List>

      <Heading level={2}>The Workflow Evolution</Heading>

      <Heading level={3}>Phase 1: Basic Implementation</Heading>
      <List>
        <ListItem>Add audio props to CodeBlock and Heading components</ListItem>
        <ListItem>Create basic AudioPlayer component</ListItem>
        <ListItem>Record on phone, transcribe with Whisper, add audio prop manually</ListItem>
        <ListItem>Works but has friction</ListItem>
      </List>

      <Heading level={3}>Phase 2: Friction Elimination</Heading>
      <List>
        <ListItem>Always-hot mic setup at desk</ListItem>
        <ListItem>System-wide hotkey (e.g., <Code>Cmd+Shift+V</Code>) triggers recording</ListItem>
        <ListItem>Auto-transcribes, auto-titles, drops in <Code>/content/audio/inbox/</Code></ListItem>
        <ListItem>VSCode command to insert audio prop from inbox into current component</ListItem>
        <ListItem>Reduces "I should record this" → actually recording from 10% to 90%</ListItem>
      </List>

      <Heading level={3}>Phase 3: Multi-Modal Composition</Heading>
      <List>
        <ListItem>Audio + code (explain why code is ugly)</ListItem>
        <ListItem>Audio + images (context for screenshots)</ListItem>
        <ListItem>Audio + debug visualizations (thought vs reality)</ListItem>
        <ListItem>Multiple audio clips per page for different sections</ListItem>
        <ListItem>Threading for longer explanations across components</ListItem>
      </List>

      <Heading level={3}>Phase 4: Content Modes</Heading>
      <List>
        <ListItem><strong>Read Mode</strong> - Text only, no audio</ListItem>
        <ListItem><strong>Commentary Mode</strong> - All audio players visible</ListItem>
        <ListItem><strong>Audio Tour Mode</strong> - Auto-plays audio as you scroll</ListItem>
        <ListItem>Lets different users consume content their way</ListItem>
      </List>

      <Heading level={2}>The "Director's Commentary" Track</Heading>

      <Paragraph>
        Every article could have a toggle at the top to switch between consumption modes:
      </Paragraph>

      <List>
        <ListItem><strong>[📄 Read Mode]</strong> - Just the text, no audio</ListItem>
        <ListItem><strong>[🎙️ Commentary Mode]</strong> - Shows all audio players</ListItem>
        <ListItem><strong>[▶️ Audio Tour Mode]</strong> - Auto-plays audio as you scroll past components</ListItem>
      </List>

      <Paragraph>
        This lets different users consume the content differently:
      </Paragraph>

      <List>
        <ListItem><strong>Speed readers:</strong> Text only</ListItem>
        <ListItem><strong>Deep learners:</strong> Commentary mode</ListItem>
        <ListItem><strong>Multitaskers:</strong> Audio tour (listen while doing dishes)</ListItem>
      </List>

      <Heading level={2}>Component Specification</Heading>

      <Heading level={3}>Audio on CodeBlock</Heading>

      <CodeBlock language="tsx">
{`<CodeBlock 
  language="typescript" 
  audio="/audio/why-this-code.mp3"
  audioDuration="0:45"
>
  {codeString}
</CodeBlock>`}
      </CodeBlock>

      <Paragraph>
        Audio player appears inline with the code block. When played, provides context about implementation decisions, 
        trade-offs, or "why this code is ugly but necessary."
      </Paragraph>

      <Heading level={3}>Audio on Heading</Heading>

      <CodeBlock language="tsx">
{`<Heading 
  level={2} 
  audio="/audio/section-intro.mp3"
  audioDuration="1:20"
>
  The Core Architecture
</Heading>`}
      </CodeBlock>

      <Paragraph>
        Audio player appears next to or below heading. Acts as a chapter marker—"here's what this section is about and 
        why it matters."
      </Paragraph>

      <Heading level={3}>Shared Audio Props</Heading>

      <CodeBlock language="typescript">
{`interface AudioProps {
  audio?: string;           // Path to audio file (mp3/wav/etc)
  audioDuration?: string;   // Display duration (e.g., "0:45", "2:30")
  audioWaveform?: string;   // Optional: Path to waveform image/data
  audioTranscript?: string; // Optional: Full transcript text
}`}
      </CodeBlock>

      <Paragraph>
        These props get added to existing primitives (CodeBlock, Heading). When present, the component renders an inline 
        audio player.
      </Paragraph>

      <Paragraph>
        <strong>Note on audioDuration:</strong> The browser can read duration from the audio file itself once it loads. 
        <Code>audioDuration</Code> is just an optimization for displaying the duration immediately on initial render (SSR) 
        and preventing layout shift. It's entirely optional—you can omit it and let the player figure it out after the 
        audio loads.
      </Paragraph>

      <Heading level={3}>Visual Design</Heading>

      <Paragraph>
        Audio player should be minimal and integrated with existing component styling:
      </Paragraph>

      <List>
        <ListItem><strong>Icon indicator</strong> - 🎙️ or speaker icon to signal audio is available</ListItem>
        <ListItem><strong>Inline player</strong> - Appears within or adjacent to component, not as separate callout</ListItem>
        <ListItem><strong>Minimal controls</strong> - Play/pause, progress bar, speed control, duration</ListItem>
        <ListItem><strong>Theme integration</strong> - Uses existing theme colors and styling</ListItem>
        <ListItem><strong>Transcript toggle</strong> - Optional: show/hide full transcript text</ListItem>
      </List>

      <Heading level={3}>Audio Player Features</Heading>

      <List>
        <ListItem><strong>Play/Pause button</strong> - Primary control</ListItem>
        <ListItem><strong>Progress bar</strong> - Show position in audio, allow seeking</ListItem>
        <ListItem><strong>Playback speed</strong> - 0.5x, 0.75x, 1x, 1.25x, 1.5x, 2x</ListItem>
        <ListItem><strong>Duration display</strong> - Show total time and current position</ListItem>
        <ListItem><strong>Optional waveform visualization</strong> - If available, show audio waveform</ListItem>
        <ListItem><strong>Keyboard controls</strong> - Space to play/pause, arrow keys to seek</ListItem>
      </List>

      <Heading level={2}>Usage Examples</Heading>

      <Heading level={3}>Audio + Code</Heading>

      <CodeBlock language="tsx">
{`<CodeBlock 
  language="typescript" 
  audio="/audio/why-i-hate-this-code.mp3"
>
  // The ugly code in question
  function messyButNecessary() {
    // Yeah so this function is ugly as heck, 
    // but here's why I had to do it this way...
  }
</CodeBlock>`}
      </CodeBlock>

      <Heading level={3}>Audio + Section Heading</Heading>

      <CodeBlock language="tsx">
{`<Heading 
  level={2} 
  audio="/audio/the-key-insight.mp3"
  audioDuration="1:15"
>
  The Key Innovation
</Heading>

<Paragraph>
  [AI-generated explanation of the innovation...]
</Paragraph>`}
      </CodeBlock>

      <Paragraph>
        Audio provides: "This is where it clicked for me. I was stuck thinking about "X"
        but it's actually "Y". That reframe changed everything."
      </Paragraph>

      <Heading level={2}>Implementation Details</Heading>

      <Paragraph>
        Three pieces to make this work:
      </Paragraph>

      <Heading level={3}>1. Shared AudioPlayer Component</Heading>

      <Paragraph>
        A reusable <Code>&lt;AudioPlayer&gt;</Code> component that handles all playback logic:
      </Paragraph>

      <List>
        <ListItem>Play/pause state management</ListItem>
        <ListItem>Progress bar with seeking</ListItem>
        <ListItem>Playback speed controls (0.5x, 1x, 1.5x, 2x)</ListItem>
        <ListItem>Duration display and current time</ListItem>
        <ListItem>Keyboard shortcuts (space for play/pause, arrows for seek)</ListItem>
        <ListItem>Optional transcript toggle</ListItem>
      </List>

      <CodeBlock language="typescript">
{`interface AudioPlayerProps {
  src: string;              // Path to audio file
  duration?: string;        // Display duration
  waveform?: string;        // Optional waveform visualization
  transcript?: string;      // Optional transcript text
}`}
      </CodeBlock>

      <Heading level={3}>2. Optional Audio Props on Primitives</Heading>

      <Paragraph>
        Each primitive (CodeBlock, Heading, etc.) gets extended with optional audio props:
      </Paragraph>

      <CodeBlock language="typescript">
{`interface AudioProps {
  audio?: string;           // Path to audio file
  audioDuration?: string;   // Display duration
  audioWaveform?: string;   // Optional waveform
  audioTranscript?: string; // Optional transcript
}

// CodeBlock extends its existing props
interface CodeBlockProps extends AudioProps {
  language: string;
  children: string;
  // ...existing props
}

// Heading extends its existing props
interface HeadingProps extends AudioProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  // ...existing props
}`}
      </CodeBlock>

      <Heading level={3}>3. Integration Per Component</Heading>

      <Paragraph>
        Each primitive decides where to render the AudioPlayer:
      </Paragraph>

      <CodeBlock language="tsx">
{`// CodeBlock renders audio player at bottom
export function CodeBlock({
  audio,
  audioDuration,
  audioTranscript,
  language,
  children,
}: CodeBlockProps) {
  return (
    <div>
      <pre><code>{children}</code></pre>
      {audio && (
        <AudioPlayer 
          src={audio} 
          duration={audioDuration}
          transcript={audioTranscript}
        />
      )}
    </div>
  );
}

// Heading renders audio player inline after text
export function Heading({
  audio,
  audioDuration,
  level,
  children,
}: HeadingProps) {
  const Tag = \`h\${level}\` as keyof JSX.IntrinsicElements;
  return (
    <div>
      <Tag>{children}</Tag>
      {audio && (
        <AudioPlayer 
          src={audio} 
          duration={audioDuration}
        />
      )}
    </div>
  );
}`}
      </CodeBlock>

      <Paragraph>
        The positioning is the only custom part—CodeBlock might put it at the bottom, Heading might put it inline. 
        The playback logic is entirely handled by the shared AudioPlayer.
      </Paragraph>

      <Heading level={3}>Phase 1: Add Audio Props to Primitives</Heading>

      <List>
        <ListItem>Create shared AudioPlayer component in <Code>src/components/AudioPlayer/</Code></ListItem>
        <ListItem>Add optional audio props to CodeBlock component</ListItem>
        <ListItem>Add optional audio props to Heading primitive</ListItem>
        <ListItem>HTML5 audio element with custom controls</ListItem>
        <ListItem>Theme-integrated styling (use theme colors, spacing, radii)</ListItem>
        <ListItem>Responsive design for mobile</ListItem>
      </List>

      <Heading level={3}>Phase 2: Always-On Recording Workflow</Heading>

      <Paragraph>
        The killer feature that makes audio commentary actually usable at scale:
      </Paragraph>

      <List>
        <ListItem><strong>Global hotkey</strong> - <Code>Cmd+Shift+V</Code> triggers recording from anywhere</ListItem>
        <ListItem><strong>Auto-transcription</strong> - Whisper runs in background, generates transcript</ListItem>
        <ListItem><strong>Smart titling</strong> - AI generates preliminary title from first 10 words</ListItem>
        <ListItem><strong>Inbox staging</strong> - Saves to <Code>/content/voice-notes/inbox/</Code></ListItem>
        <ListItem><strong>File management</strong> - Moves audio to <Code>/public/audio/</Code> with proper naming</ListItem>
        <ListItem><strong>AI categorization</strong> - Optional suggestion of which article it relates to</ListItem>
      </List>

      <Paragraph>
        <strong>Friction elimination:</strong> Current workflow is Think → Open app → Record → Save → Transcribe → File → Insert. 
        Target workflow is Think → Hit hotkey → Talk → Done. The difference between "I should record this" and actually 
        recording it is literally one keypress.
      </Paragraph>

      <Heading level={3}>Phase 3: Enhanced Features</Heading>

      <List>
        <ListItem>Waveform generation and visualization</ListItem>
        <ListItem>Auto-sync text highlighting as audio plays</ListItem>
        <ListItem>Timestamps for jumping to specific sections</ListItem>
        <ListItem>Download transcript option</ListItem>
        <ListItem>Share audio clip functionality</ListItem>
      </List>

      <Heading level={2}>Use Cases</Heading>

      <Heading level={3}>1. AI-Generated Document Commentary</Heading>

      <Paragraph>
        <strong>Scenario:</strong> You generate a comprehensive 5,000-word document with AI about your Timeline component architecture. 
        You add audio at key sections to guide readers through your thinking.
      </Paragraph>

      <CodeBlock language="tsx">
{`<Heading level={2} audio="/audio/aha-moment.mp3">
  The Key Innovation
</Heading>

<Paragraph>
  [AI-generated explanation of the Timeline component...]
</Paragraph>

<Paragraph>
  Audio provides: "This is where it clicked for me. I was stuck thinking 
  about this as a layout problem, but it's actually a data structure problem. 
  That reframe changed everything."
</Paragraph>`}
      </CodeBlock>

      <Heading level={3}>2. Tutorial Walkthroughs</Heading>

      <Paragraph>
        <strong>Scenario:</strong> Technical tutorial with code examples. Audio on CodeBlocks explains "why" decisions 
        were made, not just "what" the code does.
      </Paragraph>

      <Heading level={3}>3. Roadmap Context</Heading>

      <Paragraph>
        <strong>Scenario:</strong> Feature roadmap document. Audio on headings adds personal context about priorities, 
        trade-offs, and decision-making process.
      </Paragraph>

      <Heading level={3}>4. Content Curation</Heading>

      <Paragraph>
        <strong>Scenario:</strong> AI synthesizes research from multiple sources. Audio commentary adds "this source 
        is particularly valuable because..." or "notice how these three ideas connect..."
      </Paragraph>

      <Heading level={2}>Technical Considerations</Heading>

      <Heading level={3}>Audio Format & Compression</Heading>

      <List>
        <ListItem><strong>Format:</strong> MP3 (best browser compatibility) or WebM (smaller file sizes)</ListItem>
        <ListItem><strong>Bitrate:</strong> 64kbps for voice is sufficient (significantly smaller than music)</ListItem>
        <ListItem><strong>Mono vs Stereo:</strong> Mono for voice (half the file size)</ListItem>
        <ListItem><strong>Target size:</strong> 30-60 seconds = ~250-500KB, 2-3 minutes = ~1-1.5MB</ListItem>
      </List>

      <Heading level={3}>Accessibility</Heading>

      <List>
        <ListItem>Transcript text is always visible (audio enhancement, not replacement)</ListItem>
        <ListItem>Full keyboard navigation support</ListItem>
        <ListItem>ARIA labels for screen readers</ListItem>
        <ListItem>Visual indicators when audio is playing</ListItem>
        <ListItem>Prefer reduced motion: disable animations</ListItem>
      </List>

      <Heading level={3}>Performance</Heading>

      <List>
        <ListItem>Lazy load audio files (don't preload until user interaction)</ListItem>
        <ListItem>Cache audio files in browser</ListItem>
        <ListItem>Show loading state when fetching audio</ListItem>
        <ListItem>Progressive loading for longer audio clips</ListItem>
      </List>

      <Heading level={3}>Mobile Experience</Heading>

      <List>
        <ListItem>Larger touch targets for controls</ListItem>
        <ListItem>Simplified UI on small screens</ListItem>
        <ListItem>Handle background audio (continue playing when scrolling)</ListItem>
        <ListItem>Respect system audio settings and volume</ListItem>
      </List>

      <Heading level={2}>Content Workflow</Heading>

      <Heading level={3}>Step 1: Generate Base Content</Heading>

      <Paragraph>
        Use AI to create comprehensive document on topic. Let it be thorough - that's what it's good at.
      </Paragraph>

      <Heading level={3}>Step 2: Identify Commentary Points</Heading>

      <Paragraph>
        Read through and mark spots where you want to add your reasoning:
      </Paragraph>

      <List>
        <ListItem>"Here's why this idea matters to me"</ListItem>
        <ListItem>"This is the moment it clicked - let me explain"</ListItem>
        <ListItem>"Why I decided to include this / why I curated this"</ListItem>
        <ListItem>"The real-world reason this exists"</ListItem>
        <ListItem>"What made this worth documenting and shipping"</ListItem>
      </List>

      <Heading level={3}>Step 3: Record Audio Commentary</Heading>

      <List>
        <ListItem>Open voice memos on phone or use desktop recorder</ListItem>
        <ListItem>Record spontaneously (conversational, not scripted)</ListItem>
        <ListItem>Keep it short: 30-90 seconds per clip</ListItem>
        <ListItem>Name files descriptively: <Code>schema-insight.mp3</Code>, <Code>aha-moment.mp3</Code></ListItem>
      </List>

      <Heading level={3}>Step 4: Transcribe & Add Audio Prop</Heading>

      <List>
        <ListItem>Run Whisper locally: <Code>whisper audio.mp3 --model base</Code></ListItem>
        <ListItem>Copy transcript text (optional, for accessibility)</ListItem>
        <ListItem>Add audio prop to relevant component (CodeBlock or Heading)</ListItem>
        <ListItem>Light editing of transcript for readability if included</ListItem>
      </List>

      <Heading level={3}>Step 5: Review & Publish</Heading>

      <Paragraph>
        Listen to each audio clip in context. Does it flow? Does it add value? Adjust placement or re-record if needed.
      </Paragraph>

      <Heading level={2}>Success Metrics</Heading>

      <Paragraph>
        How do we know this feature is working?
      </Paragraph>

      <List>
        <ListItem><strong>Engagement:</strong> Do people actually play the audio? Track play rates.</ListItem>
        <ListItem><strong>Completion:</strong> Do they listen all the way through? Track completion rates.</ListItem>
        <ListItem><strong>Time on page:</strong> Does voice commentary increase time spent on content?</ListItem>
        <ListItem><strong>Feedback:</strong> Direct comments about audio commentary - helpful or distracting?</ListItem>
        <ListItem><strong>Personal satisfaction:</strong> Does this make AI-generated content feel more authentic and valuable?</ListItem>
      </List>

      <Heading level={2}>Open Questions</Heading>

      <List>
        <ListItem>How many audio clips per page before it becomes overwhelming?</ListItem>
        <ListItem>Should we show a "total audio commentary time" at the top of articles?</ListItem>
        <ListItem>How do we handle audio in article excerpts/previews?</ListItem>
        <ListItem>Should threading support automatic numbering ("Part 1 of 3")?</ListItem>
        <ListItem>Can audio commentary be searched/indexed for discovery?</ListItem>
        <ListItem>What's the right UX for audio tour mode auto-play behavior?</ListItem>
      </List>

        <Heading level={2}>Ideal Future State</Heading>
      <List>
        <ListItem>Composable across all content types</ListItem>
        <ListItem>Zero-friction capture workflow</ListItem>
        <ListItem>AI handles synthesis, human adds the "why"</ListItem>
        <ListItem>Built into the development environment itself</ListItem>
      </List>

      <Heading level={2}>Next Steps</Heading>

      <List ordered>
        <ListItem>Build basic AudioPlayer component (MVP - just play/pause + progress bar)</ListItem>
        <ListItem>Add audio props to CodeBlock and Heading primitives</ListItem>
        <ListItem>Test in one document (maybe this spec or a technical article)</ListItem>
        <ListItem>Record 2-3 test audio clips and add them to components</ListItem>
        <ListItem>Get feedback (does this feel natural? does it add value?)</ListItem>
        <ListItem>Iterate on design and UX based on real usage</ListItem>
        <ListItem>Add enhanced features (waveform, transcript toggle, etc.)</ListItem>
        <ListItem>Document the workflow for future content creation</ListItem>
        <ListItem>Write blog post about the pattern and open source it</ListItem>
      </List>
    </>
  );
}

