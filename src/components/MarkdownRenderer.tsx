'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Heading, Paragraph, List, ListItem, Code, Divider, Blockquote } from '@/components/Primitives';
import { CodeBlock } from '@/components/CodeBlock/CodeBlock';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => <Heading level={1}>{children}</Heading>,
        h2: ({ children }) => <Heading level={2}>{children}</Heading>,
        h3: ({ children }) => <Heading level={3}>{children}</Heading>,
        h4: ({ children }) => <Heading level={4}>{children}</Heading>,
        p: ({ children }) => <Paragraph>{children}</Paragraph>,
        blockquote: ({ children }) => <Blockquote>{children}</Blockquote>,
        hr: () => <Divider />,
        ul: ({ children }) => <List>{children}</List>,
        ol: ({ children }) => <List ordered>{children}</List>,
        li: ({ children }) => <ListItem>{children}</ListItem>,
        // Block code: pre wraps code blocks, extract content and render CodeBlock
        pre: ({ children }: any) => {
          const codeProps = children?.props;
          const language = codeProps?.className?.replace('language-', '') || 'plaintext';
          const code = codeProps?.children || '';
          return <CodeBlock language={language}>{String(code)}</CodeBlock>;
        },
        // Inline code: single backticks only
        code: ({ children }) => <Code>{children}</Code>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
