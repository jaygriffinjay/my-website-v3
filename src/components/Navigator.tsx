'use client';

import Link from 'next/link';
import { useState, useMemo, useEffect } from 'react';
import Fuse from 'fuse.js';
import type { RouteEntry } from '@/lib/routes';
import { useTheme } from '@/theme/theme';
import * as Popover from '@radix-ui/react-popover';

interface NavigatorProps {
  routes: RouteEntry[];
}

export default function Navigator({ routes }: NavigatorProps) {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState(false);

  const fuse = useMemo(() => {
    return new Fuse(routes, {
      keys: [
        { name: 'title', weight: 2 },
        { name: 'description', weight: 1 },
        { name: 'path', weight: 1 },
        { name: 'keywords', weight: 1.5 }
      ],
      threshold: 0.4,
      includeScore: true,
      ignoreLocation: true,
    });
  }, [routes]);

  const filteredRoutes = useMemo(() => {
    if (!searchQuery.trim()) return routes;

    const results = fuse.search(searchQuery);
    return results.map(result => result.item);
  }, [routes, searchQuery, fuse]);

  useEffect(() => {
    const handleScroll = () => {
      if (open) setOpen(false);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [open]);

  const triggerStyles = {
    all: 'unset' as const,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    marginRight: 4,
    borderRadius: theme.radii.medium,
    cursor: 'pointer',
    color: theme.colors.text,
    transition: 'background-color 0.15s ease',
    '&:hover': {
      backgroundColor: theme.colors.border,
    },
    '&:focus-visible': {
      outline: `2px solid ${theme.colors.primary}`,
      outlineOffset: 2,
    },
    WebkitTapHighlightColor: 'transparent',
  };

  const contentStyles = {
    width: '400px',
    maxHeight: '500px',
    backgroundColor: theme.colors.background,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: '12px',
    padding: '1rem',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.75rem',
    zIndex: 9999,
    '@media (max-width: 768px)': {
      width: '320px',
      maxHeight: '400px',
    },
  };

  const searchInputStyles = {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '1rem',
    outline: 'none',
    '&:focus': {
      borderColor: theme.colors.primary,
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
    '&::placeholder': {
      color: 'rgba(255, 255, 255, 0.4)',
    },
  };

  const resultsContainerStyles = {
    overflowY: 'auto' as const,
    maxHeight: '400px',
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      background: theme.colors.primary,
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: theme.colors.hover,
    },
  };

  const routeItemStyles = {
    display: 'block',
    padding: '0.75rem',
    borderRadius: '8px',
    textDecoration: 'none',
    marginBottom: '0.5rem',
    transition: 'background-color 0.2s ease',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
    '&:last-child': {
      marginBottom: 0,
    },
  };

  const routeTitleStyles = {
    color: '#fff',
    fontSize: '1rem',
    fontWeight: 600,
    marginBottom: '0.25rem',
  };

  const routeDescriptionStyles = {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '0.875rem',
    marginTop: '0.25rem',
    lineHeight: 1.4,
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger css={triggerStyles} aria-label="Toggle Navigator">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="10.5" cy="10.5" r="7" />
          <line x1="15.5" y1="15.5" x2="21" y2="21" />
        </svg>
      </Popover.Trigger>

      <Popover.Portal>
        {/* Prevent auto-focus on mobile to avoid keyboard popup, but allow on desktop for better UX */}
        <Popover.Content 
          css={contentStyles} 
          side="bottom" 
          align="end" 
          sideOffset={20}
          onOpenAutoFocus={(e) => {
            if (window.innerWidth <= 768) {
              e.preventDefault();
            }
          }}
        >
          <input
            type="text"
            placeholder="Search pages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            css={searchInputStyles}
            autoFocus={false}
          />
          <div css={resultsContainerStyles}>
            {filteredRoutes.length === 0 ? (
              <div style={{ color: 'rgba(255, 255, 255, 0.5)', padding: '1rem', textAlign: 'center' }}>
                No routes found
              </div>
            ) : (
              filteredRoutes.map((route) => (
                <Link
                  key={route.path}
                  href={route.path}
                  css={routeItemStyles}
                  onClick={() => setOpen(false)}
                >
                  <div css={routeTitleStyles}>{route.title}</div>
                  {route.description && (
                    <div css={routeDescriptionStyles}>{route.description}</div>
                  )}
                </Link>
              ))
            )}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
