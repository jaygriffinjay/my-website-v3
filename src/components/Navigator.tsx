'use client';

import Link from 'next/link';
import { css } from '@emotion/react';
import { useState, useMemo } from 'react';
import type { RouteEntry } from '@/lib/routes';

const navigatorStyles = css({
  position: 'absolute',
  top: 'calc(100% + 8px)',
  right: 0,
  width: '400px',
  maxHeight: '500px',
  backgroundColor: 'rgba(20, 20, 30, 0.95)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '12px',
  padding: '1rem',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
  zIndex: 9999,
});

const searchInputStyles = css({
  width: '100%',
  padding: '0.75rem',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '1rem',
  outline: 'none',
  '&:focus': {
    borderColor: '#00d4ff',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  '&::placeholder': {
    color: 'rgba(255, 255, 255, 0.4)',
  },
});

const resultsContainerStyles = css({
  overflowY: 'auto',
  maxHeight: '400px',
});

const routeItemStyles = css({
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
});

const routeTitleStyles = css({
  color: '#fff',
  fontSize: '1rem',
  fontWeight: 600,
  marginBottom: '0.25rem',
});

const routePathStyles = css({
  fontSize: '0.875rem',
  color: 'rgba(255, 255, 255, 0.5)',
  fontFamily: 'monospace',
});

const routeDescriptionStyles = css({
  color: 'rgba(255, 255, 255, 0.7)',
  fontSize: '0.875rem',
  marginTop: '0.25rem',
  lineHeight: 1.4,
});

interface NavigatorProps {
  routes: RouteEntry[];
  onClose: () => void;
}

export default function Navigator({ routes, onClose }: NavigatorProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRoutes = useMemo(() => {
    if (!searchQuery.trim()) return routes;

    const query = searchQuery.toLowerCase();
    return routes.filter((route) => {
      const titleMatch = route.title.toLowerCase().includes(query);
      const pathMatch = route.path.toLowerCase().includes(query);
      const descriptionMatch = route.description?.toLowerCase().includes(query);
      const keywordMatch = route.keywords?.some((keyword) =>
        keyword.toLowerCase().includes(query)
      );

      return titleMatch || pathMatch || descriptionMatch || keywordMatch;
    });
  }, [routes, searchQuery]);

  return (
    <div css={navigatorStyles}>
      <input
        type="text"
        placeholder="Search routes..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        css={searchInputStyles}
        autoFocus
      />
      <div css={resultsContainerStyles}>
        {filteredRoutes.length === 0 ? (
          <div css={{ color: 'rgba(255, 255, 255, 0.5)', padding: '1rem', textAlign: 'center' }}>
            No routes found
          </div>
        ) : (
          filteredRoutes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              css={routeItemStyles}
              onClick={onClose}
            >
              <div css={routeTitleStyles}>{route.title}</div>
              {route.description && (
                <div css={routeDescriptionStyles}>{route.description}</div>
              )}
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
