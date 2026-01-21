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
        code: ({ children, ...props }: any) => {
          // Block code has a className with content (like 'language-tsx')
          // Inline code will not have a className
          const isBlock = props.className && typeof props.className === 'string';
          if (!isBlock) {
            return <Code>{children}</Code>;
          }
          // Block code - extract language from className if present
          const language = props.className.replace('language-', '') || 'plaintext';
          return <CodeBlock language={language}>{String(children)}</CodeBlock>;
        },
        pre: ({ children }) => <>{children}</>, // Let code handle the pre
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
