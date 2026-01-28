'use client';

import { useTheme } from '@/theme/theme';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Link from 'next/link';

function HamburgerIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

export function NavMenu() {
  const { theme } = useTheme();

  const triggerStyles = {
    all: 'unset' as const,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
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
  };

  const contentStyles = {
    minWidth: 200,
    backgroundColor: theme.colors.background,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radii.medium,
    padding: 6,
    boxShadow: '0 10px 38px -10px rgba(0, 0, 0, 0.35), 0 10px 20px -15px rgba(0, 0, 0, 0.2)',
    zIndex: 50,
  };

  const itemStyles = {
    all: 'unset' as const,
    display: 'flex',
    alignItems: 'center',
    padding: '10px 12px',
    borderRadius: theme.radii.small,
    cursor: 'pointer',
    userSelect: 'none' as const,
    color: theme.colors.text,
    fontSize: theme.fontSizes.base,
    transition: 'background-color 0.15s ease',
    '&:hover': {
      backgroundColor: theme.colors.border,
    },
    '&:focus': {
      backgroundColor: theme.colors.border,
    },
  };

  const separatorStyles = {
    height: 1,
    backgroundColor: theme.colors.border,
    margin: '6px 0',
  };

  const labelStyles = {
    padding: '6px 12px',
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text,
    fontWeight: 500,
    opacity: 0.7,
  };

  const isDev = process.env.NODE_ENV === 'development';

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger css={triggerStyles}>
        <HamburgerIcon />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content css={contentStyles} align="start" sideOffset={5}>
          <DropdownMenu.Item css={itemStyles} asChild>
            <Link href="/">Home</Link>
          </DropdownMenu.Item>
          
          <DropdownMenu.Item css={itemStyles} asChild>
            <Link href="/about-me">About Me</Link>
          </DropdownMenu.Item>
          
          <DropdownMenu.Item css={itemStyles} asChild>
            <Link href="/about-this-site">About This Site</Link>
          </DropdownMenu.Item>
          
          <DropdownMenu.Item css={itemStyles} asChild>
            <Link href="/features">Features</Link>
          </DropdownMenu.Item>
          
          <DropdownMenu.Item css={itemStyles} asChild>
            <Link href="/roadmap">Roadmap</Link>
          </DropdownMenu.Item>
          
          <DropdownMenu.Item css={itemStyles} asChild>
            <Link href="/content-guide">Content Guide</Link>
          </DropdownMenu.Item>
          
          <DropdownMenu.Item css={itemStyles} asChild>
            <Link href="/privacy-policy">Privacy Policy</Link>
          </DropdownMenu.Item>

          {isDev && (
            <>
              <DropdownMenu.Separator css={separatorStyles} />
              <DropdownMenu.Label css={labelStyles}>Dev Tools</DropdownMenu.Label>
              <DropdownMenu.Item css={itemStyles} asChild>
                <Link href="/theme-editor">Theme Editor</Link>
              </DropdownMenu.Item>
            </>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
