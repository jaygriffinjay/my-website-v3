'use client';

/** @jsxImportSource @emotion/react */
import { useRef, useEffect, useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-bash';
import {
  codeBlockTheme,
  headerStyles,
  copyButtonStyles,
  copiedButtonStyles,
} from './CodeBlock.styles';

interface CodeBlockProps {
  language?: string;
  children: string;
  showLineNumbers?: boolean; // Currently not implemented
  showHeader?: boolean; // Show language label and copy button
  filename?: string; // Optional filename to display in header
}

// Icon configuration with per-icon adjustments for pixel-perfect alignment
interface IconConfig {
  filename: string;
  adjustY?: number; // Vertical offset in pixels
  adjustX?: number; // Horizontal offset in pixels
  filter?: string;   // CSS filter (e.g., for inverting colors)
}

const iconConfigs: Record<string, IconConfig> = {
  'ts': { filename: 'typescript' },
  'typescript': { filename: 'typescript' },
  'tsx': { filename: 'react' },
  'js': { filename: 'javascript' },
  'javascript': { filename: 'javascript' },
  'jsx': { filename: 'react' },
  'css': { filename: 'css' },
  'html': { filename: 'html' },
  'markup': { filename: 'html' },
  'xml': { filename: 'xml' },
  'bash': { filename: 'shell' },
  'shell': { filename: 'shell' },
  'sh': { filename: 'shell' },
  'default': { filename: 'default', filter: 'brightness(0) invert(1)' },
};

// Get file icon config based on extension
function getIconConfig(filename: string | undefined, language: string | undefined): IconConfig {
  // If filename provided, use its extension
  if (filename) {
    const extension = filename.split('.').pop()?.toLowerCase();
    return (extension && iconConfigs[extension]) ? iconConfigs[extension] : iconConfigs['default'];
  }
  
  // Otherwise fall back to language prop
  if (language && iconConfigs[language]) {
    return iconConfigs[language];
  }
  
  return iconConfigs['default'];
}

// Get display filename or extension
function getDisplayName(filename: string | undefined, language: string | undefined): string | undefined {
  if (filename) return filename;
  
  // Map language to extension for display
  const languageToExtension: Record<string, string> = {
    'ts': '.ts',
    'typescript': '.ts',
    'tsx': '.tsx',
    'js': '.js',
    'javascript': '.js',
    'jsx': '.jsx',
    'css': '.css',
    'html': '.html',
    'markup': '.html',
    'xml': '.xml',
    'bash': '.sh',
    'shell': '.sh',
    'sh': '.sh',
    'text': '.txt',
    'plaintext': '.txt',
    'markdown': '.md',
    'json': '.json',
  };
  
  return language ? languageToExtension[language] : undefined;
}

// Ensure Prism.js highlights the code correctly
export function CodeBlock({ language, children, showHeader = true, filename }: CodeBlockProps) {
  const codeRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  
  const iconConfig = getIconConfig(filename, language);
  const displayName = getDisplayName(filename, language);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [children, language]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const iconSrc = `/file-icons/${iconConfig.filename}.svg`;
  const iconStyle: React.CSSProperties = {
    ...(iconConfig.filter && { filter: iconConfig.filter }),
    ...(iconConfig.adjustY && { transform: `translateY(${iconConfig.adjustY}px)` }),
    ...(iconConfig.adjustX && { marginLeft: `${iconConfig.adjustX}px` }),
  };

  return (
    <div css={codeBlockTheme}>
      {showHeader && (
        <div css={headerStyles}>
          <span style={{ display: 'flex', alignItems: 'center', marginLeft: '-4px' }}>
            <span style={{ 
              width: '32px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <img 
                src={iconSrc} 
                alt="" 
                width="28" 
                height="28" 
                style={iconStyle}
              />
            </span>
            {displayName && (
              <span style={{ 
                color: '#d4d4d4', 
                fontSize: '13px', 
                marginTop: '2px',
                opacity: 0.9
              }}>{displayName}</span>
            )}
          </span>
          <button
            css={copyButtonStyles}
            onClick={handleCopy}
            aria-label="Copy code"
            title={copied ? 'Copied!' : 'Copy code'}
          >
            {copied ? (
              <svg viewBox="0 0 16 16" fill="currentColor">
                <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
              </svg>
            ) : (
              <svg viewBox="0 0 16 16" fill="currentColor">
                <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z" />
                <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z" />
              </svg>
            )}
          </button>
        </div>
      )}
      <pre className={`language-${language || 'text'}`} tabIndex={0}>
        <code ref={codeRef} className={`language-${language || 'text'}`}>
          {children}
        </code>
      </pre>
    </div>
  );
}