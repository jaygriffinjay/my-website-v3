'use client';

import Link from 'next/link';
import styled from '@emotion/styled';
import { useState } from 'react';
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

type SortMode = 'recent' | 'updated';

export function HomePage({ allContent }: HomePageProps) {
  const [sortMode, setSortMode] = useState<SortMode>('recent');

  /**
   * Get the most recent date for an item.
   * For "Recently Updated" mode: if item has `updated` field, return the most recent date from that array.
   * Otherwise fall back to the creation date.
   * This allows prioritizing actively worked-on content.
   */
  const getMostRecentDate = (item: Post): Date => {
    if (item.metadata.updated) {
      // Handle both single date and array of dates
      const updatedDates = Array.isArray(item.metadata.updated) 
        ? item.metadata.updated 
        : [item.metadata.updated];
      // Get the most recent update
      const mostRecent = updatedDates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0];
      return new Date(mostRecent);
    }
    return new Date(item.metadata.date);
  };

  /**
   * Sort content based on selected mode:
   * - 'recent': Sort by creation date (newest first)
   * - 'updated': Sort by most recent date (creation or last update, whichever is newer)
   */
  const sorted = [...allContent].sort((a, b) => {
    if (sortMode === 'updated') {
      return getMostRecentDate(b).getTime() - getMostRecentDate(a).getTime();
    }
    // Default: sort by creation date only
    return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime();
  });

  /**
   * Group sorted content by date for display.
   * In 'updated' mode, items are grouped by their most recent date (update or creation).
   * In 'recent' mode, items are grouped by their creation date.
   * This creates the date heading sections in the UI.
   */
  const contentByDate = sorted.reduce((acc, item) => {
    const displayDate = sortMode === 'updated' ? getMostRecentDate(item) : new Date(item.metadata.date);
    const date = displayDate.toLocaleDateString('en-US', {
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
      {/* 
        Sort Mode Toggle
        Two-button segmented control for switching between sort modes.
        Active button has highlighted background and border.
      */}
      <div css={{ 
        display: 'flex', 
        gap: '0.5rem', 
        marginBottom: '2rem',
        padding: '0.5rem',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '12px',
      }}>
        {/* Posts (Most Recent) - Sort by creation date */}
        <button
          onClick={() => setSortMode('recent')}
          css={{
            flex: 1,
            padding: '0.75rem 1rem',
            backgroundColor: sortMode === 'recent' ? 'rgba(96, 165, 250, 0.2)' : 'transparent',
            color: sortMode === 'recent' ? '#93c5fd' : 'rgba(255, 255, 255, 0.6)',
            border: sortMode === 'recent' ? '1px solid rgba(96, 165, 250, 0.3)' : '1px solid transparent',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: 600,
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: sortMode === 'recent' ? 'rgba(96, 165, 250, 0.25)' : 'rgba(255, 255, 255, 0.05)',
              color: sortMode === 'recent' ? '#93c5fd' : 'rgba(255, 255, 255, 0.8)',
            },
          }}
        >
          Posts
        </button>
        {/* Recently Updated - Sort by most recent date (creation or update) */}
        <button
          onClick={() => setSortMode('updated')}
          css={{
            flex: 1,
            padding: '0.75rem 1rem',
            backgroundColor: sortMode === 'updated' ? 'rgba(96, 165, 250, 0.2)' : 'transparent',
            color: sortMode === 'updated' ? '#93c5fd' : 'rgba(255, 255, 255, 0.6)',
            border: sortMode === 'updated' ? '1px solid rgba(96, 165, 250, 0.3)' : '1px solid transparent',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: 600,
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: sortMode === 'updated' ? 'rgba(96, 165, 250, 0.25)' : 'rgba(255, 255, 255, 0.05)',
              color: sortMode === 'updated' ? '#93c5fd' : 'rgba(255, 255, 255, 0.8)',
            },
          }}
        >
          Recently Updated
        </button>
      </div>

      {/* 
        Content List
        Grouped by date with gradient date headings and link items.
        Each date section contains all content from that day.
      */}
      {Object.entries(contentByDate).map(([date, items]) => (
        <div key={date} css={{ marginBottom: '2rem' }}>
          <DateHeading>{date}</DateHeading>
          <List css={{ 
            listStyle: 'none', 
            padding: 0,
            margin: '0.5rem 0 0 0',
          }}>
            {items.map((item) => {
              // Determine correct route for this content type
              // App routes have explicit paths, others need to be constructed
              const href = item.metadata.path || (
                item.metadata.type === 'doc:commit' 
                  ? `/docs/commits/${item.metadata.slug}`
                  : item.metadata.type === 'doc'
                  ? `/docs/${item.metadata.slug}`
                  : `/posts/${item.metadata.slug}`
              );
              
              // Generate unique key to avoid collisions between posts/docs with same slug
              const uniqueKey = item.metadata.path || `${item.metadata.type || 'post'}-${item.metadata.slug}`;
              
              return (
                <ListItem key={uniqueKey} css={{ marginBottom: '0.5rem' }}>
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
