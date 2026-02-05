'use client';

import Link from 'next/link';
import { css } from '@emotion/react';
import Navigator from './Navigator';
import { NavMenu } from './NavMenu';
import type { RouteEntry } from '@/lib/routes';
import { useTheme } from '@/theme/theme';

const navBarStyles = css({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.15rem 0.75rem',
  minHeight: '60px',
  backgroundColor: '#1a1a24',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)',
  zIndex: 1000,
});

const containerStyles = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  maxWidth: '640px',
  padding: '0 24px 0 0',
});

const rightControlsStyles = css({
  display: 'flex',
  alignItems: 'center',
  gap: '0.25rem',
  flex: '0 0 auto',
});

const titleStyles = css({
  fontSize: '40px',
  fontWeight: 700,
  letterSpacing: '-0.02em',
  color: '#fff',
  position: 'relative',
  padding: '3px 24px',
  textDecoration: 'none',
  transition: 'color 0.3s ease',
  display: 'inline-block',
  borderRadius: '999px',
  lineHeight: 1.2,
  fontFamily: 'var(--font-sekuya)',
  whiteSpace: 'nowrap',
  '&:hover': {
    background: 'linear-gradient(135deg, #00d4ff 0%, #1e3a8a 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  '@media (max-width: 550px)': {
    fontSize: '28px',
  },
});

const navigatorIconStyles = css({
  width: '40px',
  height: '40px',
  borderRadius: '8px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  cursor: 'pointer',
  border: 'none',
  background: 'transparent',
  padding: 0,
  transition: 'background-color 0.15s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  '@media (max-width: 768px)': {
    width: '36px',
    height: '36px',
    fontSize: '1.125rem',
  },
});

interface NavBarProps {
  routes: RouteEntry[];
}

export default function NavBar({ routes }: NavBarProps) {
  const { theme } = useTheme();

  return (
    <nav css={navBarStyles}>
      <div css={containerStyles}>
        <Link href="/" css={titleStyles}>
          Jay Griffin
        </Link>
        <div css={rightControlsStyles}>
          <NavMenu />
          <Navigator routes={routes} />
        </div>
      </div>
    </nav>
  );
}