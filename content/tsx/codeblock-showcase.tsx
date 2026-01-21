import { Heading, Paragraph } from '@/components/Primitives';
import { CodeBlock } from '@/components/CodeBlock/CodeBlock';
import type { PostMeta } from '@/types/post';

export const metadata: PostMeta = {
  title: 'CodeBlock Component Showcase',
  date: '2026-01-21',
  slug: 'codeblock-showcase',
  tags: ['dev', 'components'],
  description: 'Testing and showcasing all CodeBlock component configurations',
};

export default function CodeBlockShowcase() {
  return (
    <>
      <Heading level={1}>CodeBlock Component Showcase</Heading>
      <Paragraph>
        Testing all possible CodeBlock configurations with the new filename and icon features.
      </Paragraph>

      <Heading level={2}>TypeScript Files</Heading>
      <CodeBlock language="ts" filename="example.ts">
        {`interface User {
  id: string;
  name: string;
  email: string;
}

function getUser(id: string): User {
  return { id, name: 'John', email: 'john@example.com' };
}`}
      </CodeBlock>

      <Heading level={2}>TSX/React Files</Heading>
      <CodeBlock language="tsx" filename="Button.tsx">
        {`export function Button({ children, onClick }: ButtonProps) {
  return (
    <button onClick={onClick} className="btn">
      {children}
    </button>
  );
}`}
      </CodeBlock>

      <Heading level={2}>JavaScript Files</Heading>
      <CodeBlock language="js" filename="utils.js">
        {`function formatDate(date) {
  return new Intl.DateTimeFormat('en-US').format(date);
}

module.exports = { formatDate };`}
      </CodeBlock>

      <Heading level={2}>JSX Files</Heading>
      <CodeBlock language="jsx" filename="Card.jsx">
        {`export function Card({ title, content }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
}`}
      </CodeBlock>

      <Heading level={2}>CSS Files</Heading>
      <CodeBlock language="css" filename="styles.css">
        {`.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
}`}
      </CodeBlock>

      <Heading level={2}>HTML Files</Heading>
      <CodeBlock language="markup" filename="index.html">
        {`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Example Page</title>
</head>
<body>
  <h1>Hello World</h1>
</body>
</html>`}
      </CodeBlock>

      <Heading level={2}>Without Filename (Language Fallback)</Heading>
      <CodeBlock language="ts">
        {`// No filename prop, should show "typescript"
const greeting: string = 'Hello, World!';
console.log(greeting);`}
      </CodeBlock>

      <Heading level={2}>Without Header</Heading>
      <CodeBlock language="js" showHeader={false}>
        {`// Header hidden completely
const result = 42;`}
      </CodeBlock>

      <Heading level={2}>Edge Cases</Heading>
      <Paragraph>No language specified:</Paragraph>
      <CodeBlock>
        {`Plain text code block
Should show "text" in header`}
      </CodeBlock>

      <Paragraph>Unknown file extension:</Paragraph>
      <CodeBlock filename="readme.txt">
        {`Text file with no icon
Should show filename without icon`}
      </CodeBlock>
    </>
  );
}
