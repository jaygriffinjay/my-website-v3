'use client';

import Link from 'next/link';
import { css, keyframes } from '@emotion/react';
import { useRef, useState, useEffect } from 'react';
import { Sekuya } from 'next/font/google';
import Navigator from './Navigator';
import type { RouteEntry } from '@/lib/routes';

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
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  textDecoration: 'none',
  transition: 'background-color 0.3s ease, color 0.3s ease',
  fontSize: '1.5rem',
  cursor: 'pointer',
  position: 'relative',
  border: 'none',
  background: 'transparent',
  padding: 0,
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    color: '#00d4ff',
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
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; tx: number; ty: number }>>([]);
  const [isNavigatorOpen, setIsNavigatorOpen] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const particleIdRef = useRef(0);
  const navigatorRef = useRef<HTMLDivElement>(null);

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

  // Close navigator on click outside
  useEffect(() => {
    if (!isNavigatorOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (navigatorRef.current && !navigatorRef.current.contains(event.target as Node)) {
        setIsNavigatorOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsNavigatorOpen(false);
      }
    };

    const handleScroll = () => {
      setIsNavigatorOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isNavigatorOpen]);

  return (
    <nav css={navBarStyles}>
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
      <div ref={navigatorRef} css={{ position: 'relative' }}>
        <button
          css={navigatorIconStyles}
          onClick={() => setIsNavigatorOpen(!isNavigatorOpen)}
          title="Navigator"
          aria-label="Toggle Navigator"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
        {isNavigatorOpen && (
          <Navigator routes={routes} onClose={() => setIsNavigatorOpen(false)} />
        )}
      </div>
    </nav>
  );
}
