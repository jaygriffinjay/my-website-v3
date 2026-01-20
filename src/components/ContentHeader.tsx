"use client";

import { css } from '@emotion/react';
import type { PostMeta } from '@/types/post';
import { formatPostDate } from '@/lib/date';

interface ContentHeaderProps {
  metadata: PostMeta;
}

const headerStyles = css({
  marginBottom: '2rem',
  paddingBottom: '1.5rem',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
});

const titleStyles = css({
  fontSize: '2.5rem',
  fontWeight: 700,
  marginBottom: '0.5rem',
  lineHeight: 1.2,
});

const categoryBadgeStyles = css({
  display: 'inline-block',
  padding: '0.375rem 1rem',
  fontSize: '0.75rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  borderRadius: '6px',
  marginBottom: '1rem',
});

const commitBadgeStyles = css({
  backgroundColor: '#fbbf24',
  color: '#1f2937',
});

const metaTextStyles = css({
  fontSize: '0.875rem',
  color: 'rgba(255, 255, 255, 0.6)',
  marginBottom: '1rem',
});

const badgeContainerStyles = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
  marginBottom: '1rem',
});

const tagsRowStyles = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
  alignItems: 'center',
  marginBottom: '1rem',
});

const tagsLabelStyles = css({
  fontSize: '0.875rem',
  color: 'rgba(255, 255, 255, 0.5)',
  marginRight: '0.25rem',
});

const badgeStyles = css({
  display: 'inline-block',
  padding: '0.25rem 0.75rem',
  fontSize: '0.875rem',
  fontWeight: 500,
  borderRadius: '12px',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  color: 'rgba(255, 255, 255, 0.7)',
});

export function ContentHeader({ metadata }: ContentHeaderProps) {
  const repoUrl = 'https://github.com/jaygriffinjay/my-website-v3';
  
  // Handle author as string or array
  const authorText = metadata.author 
    ? (Array.isArray(metadata.author) 
        ? metadata.author.join(', ')
        : metadata.author)
    : null;
  
  const authorStyles = css({
    position: 'relative',
    display: 'inline-block',
    ...(metadata.authorshipNote && {
      padding: '0.125rem 0.5rem',
      marginLeft: '-0.5rem',
      borderRadius: '12px',
      transition: 'background-color 0.2s ease',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      },
      '&:hover::after': {
        content: `"${metadata.authorshipNote.replace(/"/g, '\\"')}"`,
        position: 'absolute',
        bottom: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        marginBottom: '0.5rem',
        padding: '0.5rem 0.75rem',
        backgroundColor: 'rgba(255, 255, 255, 0.99)',
        color: '#000',
        fontSize: '0.75rem',
        borderRadius: '8px',
        width: '150px',
        whiteSpace: 'normal',
        pointerEvents: 'none',
        zIndex: 1000,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
      },
    }),
  });
  
  return (
    <header css={headerStyles}>
      {metadata.type === 'doc:commit' && (
        <div>
          <span css={[categoryBadgeStyles, commitBadgeStyles]}>Commit</span>
          {metadata.commitHash && (
            <a 
              href={`${repoUrl}/commit/${metadata.commitHash}`}
              target="_blank"
              rel="noopener noreferrer"
              css={{
                marginLeft: '0.75rem',
                fontSize: '0.75rem',
                color: 'rgba(255, 255, 255, 0.6)',
                textDecoration: 'none',
                '&:hover': {
                  color: 'rgba(255, 255, 255, 0.9)',
                  textDecoration: 'underline',
                }
              }}
            >
              View on GitHub →
            </a>
          )}
        </div>
      )}
      
      <h1 css={titleStyles}>{metadata.title}</h1>
      
      <div css={metaTextStyles}>
        {authorText && (
          <span css={authorStyles}>
            By {authorText} ·
          </span>
        )}
        <span>{formatPostDate(metadata.date)}</span>
        {metadata.updated && (
          <div>Last updated: {formatPostDate(metadata.updated)}</div>
        )}
      </div>
      
      <div css={badgeContainerStyles}>
        {metadata.type === 'doc' && <span css={badgeStyles}>docs</span>}
        
        {metadata.projectId && <span css={badgeStyles}>Project: {metadata.projectId}</span>}
        
        {metadata.feature && <span css={badgeStyles}>Feature: {metadata.feature}</span>}
      </div>
      
      {metadata.tags && metadata.tags.length > 0 && (
        <div css={tagsRowStyles}>
          <span css={tagsLabelStyles}>🏷️ Tags:</span>
          {metadata.tags.map((tag) => (
            <span key={tag} css={badgeStyles}>{tag}</span>
          ))}
        </div>
      )}
      
      {metadata.description && (
        <p css={{ marginTop: '1rem', fontSize: '1.125rem', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.5 }}>
          {metadata.description}
        </p>
      )}
    </header>
  );
}
