import { Heading, Paragraph, List, ListItem, Link, Code } from '@/components/Primitives';
import { CodeBlock } from '@/components/CodeBlock/CodeBlock';
import type { PostMeta } from '@/types/post';

export const metadata: PostMeta = {
  title: 'Structured Outputs: AI as JSON API for Decisionmaking',
  slug: 'structured-outputs',
  date: '2026-01-27T00:00:00Z',
  author: ['Jay Griffin', 'Claude Sonnet 4.5'],
  authorshipNote: '🔧 AI-Assisted - Jay\'s explanation, Claude wrote it',
  type: 'post',
  description: 'Separating probabilistic thinking from deterministic execution',
  tags: ['ai', 'structured-outputs', 'json-schema', 'architecture', 'llm'],
};

export default function StructuredOutputs() {
  return (
    <>
      <Heading level={2}>The Pattern</Heading>
      <Paragraph>
        Instead of letting AI generate whatever it wants (freeform text, code, mixed formats), 
        you constrain it to return <strong>valid JSON matching a predefined schema</strong>.
      </Paragraph>

      <Paragraph>
        Then your deterministic code parses that JSON and executes the appropriate actions. This is what OpenAI calls "structured outputs"

      </Paragraph>

      <Heading level={2}>Why It Works</Heading>
      
      <Heading level={3}>Separation of Concerns</Heading>
      <List>
        <ListItem><strong>AI does probabilistic thinking</strong> - Understanding intent, making decisions, reasoning about what should happen</ListItem>
        <ListItem><strong>Code does deterministic execution</strong> - Parsing JSON, updating files, running commands, enforcing constraints</ListItem>
      </List>

      <Paragraph>
        AI is unreliable at precise syntax at scale but excellent at precision semantic understanding. 
        Code is terrible at understanding intent but perfect at following rules.
      </Paragraph>

      <Paragraph>
        Structured outputs let each do what it's good at.
      </Paragraph>

      <Heading level={3}>Predictable Failures</Heading>
      <Paragraph>
        When AI returns freeform text, failures are messy: hallucinated code, syntax errors, 
        missing edge cases, broken formatting. Every failure mode is different.
      </Paragraph>

      <Paragraph>
        With structured outputs, there are only two failure modes:
      </Paragraph>
      <List ordered>
        <ListItem><strong>Invalid JSON</strong> - Easy to detect, easy to retry</ListItem>
        <ListItem><strong>Wrong semantic decision</strong> - AI understood the format but chose the wrong action</ListItem>
      </List>

      <Paragraph>
        Both are recoverable. Invalid JSON gets caught immediately. Wrong decisions are visible 
        in the structured data and can be fixed with better prompts or manual overrides.
      </Paragraph>

      <Heading level={2}>Real-World Example</Heading>
      
      <Heading level={3}>Without Structured Outputs</Heading>
      <Paragraph>
        Prompt: "Create a calendar event for lunch with Sarah tomorrow at noon"
      </Paragraph>

      <Paragraph>
        AI returns freeform text:
      </Paragraph>
      <CodeBlock language="text">
{`I'll create a calendar event for you:

Event: Lunch with Sarah
Date: Tomorrow at 12:00 PM
Location: TBD

Would you like me to set a reminder?`}
      </CodeBlock>

      <Paragraph>
        Now you need to parse natural language, extract the data, guess at timezone, 
        handle the question about reminders, convert "tomorrow" to an actual date...
      </Paragraph>

      <Heading level={3}>With Structured Outputs</Heading>
      <Paragraph>
        Same prompt, but AI returns JSON:
      </Paragraph>
      <CodeBlock language="json">
{`{
  "action": "create_event",
  "event": {
    "title": "Lunch with Sarah",
    "start": "2026-01-28T12:00:00Z",
    "duration_minutes": 60,
    "attendees": ["sarah@example.com"]
  },
  "confirmation": "Created lunch event for tomorrow at noon"
}`}
      </CodeBlock>

      <Paragraph>
        Your code parses this trivially:
      </Paragraph>
      <CodeBlock language="typescript">
{`const response = await ai.chat(prompt, { schema: calendarEventSchema });
const action = response.action;

if (action === 'create_event') {
  await calendar.createEvent(response.event);
}`}
      </CodeBlock>

      <Paragraph>
        No guessing, no parsing natural language, no edge cases. Just data in, actions out.
      </Paragraph>

      <Heading level={2}>The AI as API Mental Model</Heading>
      <Paragraph>
        When you frame it as "AI as API", the pattern becomes obvious:
      </Paragraph>
      <List>
        <ListItem><strong>Input</strong>: Natural language (flexible, human-friendly)</ListItem>
        <ListItem><strong>Processing</strong>: AI reasoning (probabilistic, semantic)</ListItem>
        <ListItem><strong>Output</strong>: Structured JSON (predictable, machine-friendly)</ListItem>
        <ListItem><strong>Execution</strong>: Deterministic code (reliable, testable)</ListItem>
      </List>

      <Paragraph>
        You wouldn't call a REST API and expect it to return freeform text that you parse manually. 
        You expect JSON matching a schema. AI should work the same way.
      </Paragraph>

      <Heading level={2}>Benefits at Scale</Heading>
      
      <Heading level={3}>Composability</Heading>
      <Paragraph>
        Once AI returns structured data, you can pipe it to other systems:
      </Paragraph>
      <List>
        <ListItem>Store it in a database</ListItem>
        <ListItem>Send it to another API</ListItem>
        <ListItem>Transform it with standard JSON tools</ListItem>
        <ListItem>Validate it against schemas</ListItem>
        <ListItem>Cache it for replay/debugging</ListItem>
      </List>

      <Heading level={3}>Reliability</Heading>
      <Paragraph>
        Deterministic execution means you can test and verify behavior:
      </Paragraph>
      <List>
        <ListItem>Write unit tests against the JSON schema</ListItem>
        <ListItem>Validate constraints before execution</ListItem>
        <ListItem>Roll back changes if validation fails</ListItem>
        <ListItem>Audit all actions through structured logs</ListItem>
      </List>

      <Heading level={3}>Iteration Speed</Heading>
      <Paragraph>
        When AI returns structured data, debugging is straightforward:
      </Paragraph>
      <List>
        <ListItem>Inspect the JSON to see exactly what AI decided</ListItem>
        <ListItem>Modify prompts to change AI's decisions</ListItem>
        <ListItem>Override specific fields if needed</ListItem>
        <ListItem>Replay the same JSON to reproduce issues</ListItem>
      </List>

      <Heading level={2}>Implementation Notes</Heading>
      
      <Heading level={3}>Schema Definition</Heading>
      <Paragraph>
        Define schemas using TypeScript types or JSON Schema:
      </Paragraph>
      <CodeBlock language="typescript">
{`interface CalendarEvent {
  action: 'create_event' | 'update_event' | 'delete_event';
  event: {
    title: string;
    start: string; // ISO 8601
    duration_minutes: number;
    attendees?: string[];
  };
  confirmation: string;
}`}
      </CodeBlock>

      <Heading level={3}>Prompt Engineering</Heading>
      <Paragraph>
        Include the schema in your system prompt:
      </Paragraph>
      <CodeBlock language="text">
{`You are a calendar assistant. Always respond with valid JSON matching this schema:

{
  "action": "create_event" | "update_event" | "delete_event",
  "event": {
    "title": string,
    "start": ISO 8601 date,
    "duration_minutes": number,
    "attendees": [emails]
  },
  "confirmation": string
}

Do not include any text outside the JSON.`}
      </CodeBlock>

      <Heading level={3}>Validation</Heading>
      <Paragraph>
        Always validate before execution:
      </Paragraph>
      <CodeBlock language="typescript">
{`const response = await ai.chat(prompt);
const parsed = JSON.parse(response);

// Validate against schema
if (!isValidCalendarEvent(parsed)) {
  throw new Error('Invalid response from AI');
}

// Execute only if valid
await executeCalendarAction(parsed);`}
      </CodeBlock>

      <Heading level={2}>When Not to Use This</Heading>
      <Paragraph>
        Structured outputs aren't always the answer:
      </Paragraph>
      <List>
        <ListItem><strong>Creative content generation</strong> - When you want natural prose, not data</ListItem>
        <ListItem><strong>Exploratory conversations</strong> - When schema would constrain thinking</ListItem>
        <ListItem><strong>One-off tasks</strong> - Overhead of defining schemas isn't worth it</ListItem>
      </List>

      <Paragraph>
        But for building reliable AI-powered systems that integrate with code, structured outputs are essential.
      </Paragraph>

      <Heading level={2}>The Bigger Picture</Heading>
      <Paragraph>
        Structured outputs are part of a larger philosophy: <strong>use AI for what it's good at, 
        use code for what it's good at</strong>.
      </Paragraph>

      <Paragraph>
        AI excels at understanding messy human intent and making semantic decisions. 
        Code excels at precise execution and enforcing constraints.
      </Paragraph>

      <Paragraph>
        The structured outputs pattern puts both in their ideal roles. That's why it works.
      </Paragraph>

      <Paragraph>
        See also: <Link href="/posts/work-at-the-speed-of-thought">Work at the Speed of Thought</Link> for how 
        this fits into the broader workflow optimization pattern.
      </Paragraph>
    </>
  );
}
