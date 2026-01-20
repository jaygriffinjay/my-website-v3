'use client';

import Link from 'next/link';
import styled from '@emotion/styled';
import { Container, List, ListItem } from '@/components/Primitives';
import type { Post } from '@/types/post';

interface HomePageProps {
  allContent: Post[];
}

const DateHeading = styled.h2({
  background: 'linear-gradient(135deg, #00d4ff 0%, #1e3a8a 100%)',
  backgroundSize: '120% 120%',
  display: 'inline-block',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  fontSize: '1.5rem',
  fontWeight: 700,
  marginTop: '1rem',
  marginBottom: '0.75rem',
});

export function HomePage({ allContent }: HomePageProps) {
  // Sort by date (newest first)
  const sorted = [...allContent]
    .sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime());

  // Group by date
  const contentByDate = sorted.reduce((acc, item) => {
    const date = new Date(item.metadata.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    });
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {} as Record<string, Post[]>);

  return (
    <Container size="sm" css={{ 
      marginTop: '4rem',
      maxWidth: '600px',
      marginLeft: 'auto',
      marginRight: 'auto',
    }}>
      {Object.entries(contentByDate).map(([date, items]) => (
        <div key={date} css={{ marginBottom: '2rem' }}>
          <DateHeading>{date}</DateHeading>
          <List css={{ 
            listStyle: 'none', 
            padding: 0,
            margin: '0.5rem 0 0 0',
          }}>
            {items.map((item) => {
              const href = item.metadata.type === 'doc:commit' 
                ? `/docs/commits/${item.metadata.slug}`
                : item.metadata.type === 'doc'
                ? `/docs/${item.metadata.slug}`
                : `/posts/${item.metadata.slug}`;
              
              return (
                <ListItem key={item.metadata.slug} css={{ marginBottom: '0.5rem' }}>
                  <Link 
                    href={href}
                    css={{ 
                      color: '#60a5fa',
                      textDecoration: 'none',
                      fontSize: '1.125rem',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#93c5fd';
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#60a5fa';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    {item.metadata.title}
                  </Link>
                </ListItem>
              );
            })}
          </List>
        </div>
      ))}
    </Container>
  );
}
