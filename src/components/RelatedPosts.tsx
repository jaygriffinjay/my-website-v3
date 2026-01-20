'use client';

import Link from 'next/link';
import styled from '@emotion/styled';
import { Heading, List, ListItem } from '@/components/Primitives';
import type { Post } from '@/types/post';

const RelatedPostsContainer = styled.div({
  marginTop: '4rem',
  paddingTop: '2rem',
  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
});

const RelatedPostLink = styled(Link)({
  color: '#60a5fa',
  textDecoration: 'none',
  fontSize: '1.125rem',
  transition: 'all 0.2s ease',
  '&:hover': {
    color: '#93c5fd',
    transform: 'translateX(4px)',
  },
});

interface RelatedPostsProps {
  slugs: string[];
  allPosts: Post[];
}

export default function RelatedPosts({ slugs, allPosts }: RelatedPostsProps) {
  // Look up the full post data for each slug
  const relatedPosts = slugs
    .map(slug => allPosts.find(post => post.metadata.slug === slug))
    .filter((post): post is Post => post !== undefined);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <RelatedPostsContainer>
      <Heading level={2}>Related Posts</Heading>
      <List css={{ 
        listStyle: 'none', 
        padding: 0,
        margin: '1rem 0 0 0',
      }}>
        {relatedPosts.map((post) => {
          const href = post.metadata.type === 'doc:commit' 
            ? `/docs/commits/${post.metadata.slug}`
            : post.metadata.type === 'doc'
            ? `/docs/${post.metadata.slug}`
            : `/posts/${post.metadata.slug}`;

          return (
            <ListItem key={post.metadata.slug} css={{ marginBottom: '0.75rem' }}>
              <RelatedPostLink href={href}>
                {post.metadata.title}
              </RelatedPostLink>
              {post.metadata.description && (
                <div css={{ 
                  color: 'rgba(255, 255, 255, 0.6)', 
                  fontSize: '0.95rem',
                  marginTop: '0.25rem',
                }}>
                  {post.metadata.description}
                </div>
              )}
            </ListItem>
          );
        })}
      </List>
    </RelatedPostsContainer>
  );
}
