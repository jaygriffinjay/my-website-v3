import { Heading, Paragraph } from '@/components/Primitives';
import { CodeBlock } from '@/components/CodeBlock/CodeBlock';
import type { PostMeta } from '@/types/post';

export const metadata: PostMeta = {
  title: 'CodeBlock Component Showcase',
  slug: 'codeblock-showcase',
  date: '2026-01-21T00:00:00Z',
  description: 'Testing and showcasing all CodeBlock component configurations including bash/shell support',
  tags: ['dev', 'components', 'testing'],
  type: 'post',
  author: ['Jay Griffin'],
  updated: '2026-02-02T00:00:00Z',
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

      <Heading level={2}>Bash/Shell Scripts</Heading>
      <Paragraph>Using language="bash":</Paragraph>
      <CodeBlock language="bash" filename="deploy.sh">
        {`#!/bin/bash

# Deploy script
echo "Starting deployment..."

npm install
npm run build

if [ $? -eq 0 ]; then
  echo "Build successful!"
  npm start
else
  echo "Build failed!"
  exit 1
fi`}
      </CodeBlock>

      <Paragraph>Using language="shell":</Paragraph>
      <CodeBlock language="shell">
        {`# Common shell commands
git add .
git commit -m "feat: add new feature"
git push origin main

# Environment setup
export NODE_ENV=production
export PORT=3000`}
      </CodeBlock>

      <Paragraph>Using language="sh":</Paragraph>
      <CodeBlock language="sh" filename="setup.sh">
        {`#!/bin/sh
# Minimal POSIX shell script
cd /usr/local/bin
ln -s /opt/app/cli ./app
chmod +x ./app`}
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

      <Paragraph>Long bash command (word wrapping test):</Paragraph>
      <CodeBlock language="bash">
        {`# Really long commands
docker run -d --name my-container --restart unless-stopped -p 8080:8080 -v /host/path:/container/path -e DATABASE_URL=postgresql://user:password@localhost:5432/dbname my-image:latest

# Piped commands
cat /var/log/syslog | grep -i error | awk '{print $1, $2, $3}' | sort | uniq -c | sort -rn | head -20`}
      </CodeBlock>
    </>
  );
}
