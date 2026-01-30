'use client';

import Link from 'next/link';
import { css, keyframes } from '@emotion/react';
import { useRef, useState } from 'react';
import { Sekuya } from 'next/font/google';
import Navigator from './Navigator';
import { NavMenu } from './NavMenu';
import type { RouteEntry } from '@/lib/routes';
import { useTheme } from '@/theme/theme';

const sekuya = Sekuya({ subsets: ['latin'], weight: ['400'] });

const particleFloat = keyframes({
  '0%': {
    opacity: 1,
    transform: 'translate(0, 0) scale(1)',
  },
  '100%': {
    opacity: 0,
    transform: 'translate(var(--tx), var(--ty)) scale(0)',
  },
});

const navBarStyles = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1rem',
  padding: '1.5rem 2rem 1.5rem 1rem',
  zIndex: 1000,
  '@media (max-width: 768px)': {
    gap: '0.5rem',
    padding: '1rem 1rem 1rem 0.75rem',
  },
});

const titleContainerStyles = css({
  position: 'relative',
  overflow: 'visible',
});

const titleStyles = css({
  fontSize: '2.5rem',
  fontWeight: 700,
  letterSpacing: '-0.02em',
  color: '#fff',
  position: 'relative',
  padding: '0.375rem 1.5rem',
  textDecoration: 'none',
  transition: 'color 0.3s ease',
  display: 'inline-block',
  borderRadius: '999px',
  zIndex: 1,
  lineHeight: 1.2,
  fontFamily: sekuya.style.fontFamily,
  whiteSpace: 'nowrap',
  '&:hover': {
    background: 'linear-gradient(135deg, #00d4ff 0%, #1e3a8a 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  '@media (max-width: 768px)': {
    fontSize: 'clamp(1.25rem, 6vw, 2.5rem)',
    padding: '0.25rem clamp(0.5rem, 3vw, 1.5rem)',
  },
});

const particleStyles = css({
  position: 'absolute',
  width: '3px',
  height: '3px',
  borderRadius: '50%',
  background: '#00d4ff',
  pointerEvents: 'none',
  animation: `${particleFloat} 1.5s ease-out forwards`,
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
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; tx: number; ty: number }>>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const particleIdRef = useRef(0);

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    
    intervalRef.current = setInterval(() => {
      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;
      const angle = Math.random() * Math.PI * 2;
      const distance = 40 + Math.random() * 40;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;

      const particle = {
        id: particleIdRef.current++,
        x,
        y,
        tx,
        ty,
      };

      setParticles(prev => [...prev, particle]);

      // Remove particle after animation
      setTimeout(() => {
        setParticles(prev => prev.filter(p => p.id !== particle.id));
      }, 1500);
    }, 150);
  };

  const handleMouseLeave = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <nav css={navBarStyles}>
      <NavMenu />
      <div css={titleContainerStyles}>
        <Link
          href="/"
          css={titleStyles}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Jay Griffin
        </Link>
        {particles.map(particle => (
          <div
            key={particle.id}
            css={particleStyles}
            style={{
              left: particle.x,
              top: particle.y,
              '--tx': `${particle.tx}px`,
              '--ty': `${particle.ty}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>
      <Navigator routes={routes} />
    </nav>
  );
}