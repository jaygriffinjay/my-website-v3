'use client';

import styled from '@emotion/styled';
import NextLink from 'next/link';
import type { ReactNode, AnchorHTMLAttributes } from 'react';

// ============================================================================
// CONTENT PRIMITIVES - The "Markdown Philosophy" as Components
// ============================================================================
// These 8-10 components handle 95% of content needs with full type safety,
// theme integration, and React composition power.
// ============================================================================

// ============================================================================
// 1. HEADINGS
// ============================================================================

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: ReactNode;
  id?: string;  // For anchor links
}

const headingStyles = () => `
  font-family: ${(props: any) => props.theme.fonts.heading};
  color: ${(props: any) => props.theme.colors.text};
  font-weight: 700;
  line-height: 1.2;
`;

const H1 = styled.h1`
  ${headingStyles()}
  font-size: ${props => props.theme.fontSizes.xxxl};
  margin-top: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
`;
const H2 = styled.h2`
  ${headingStyles()}
  font-size: ${props => props.theme.fontSizes.xxl};
  margin-top: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
`;
const H3 = styled.h3`
  ${headingStyles()}
  font-size: ${props => props.theme.fontSizes.xl};
  margin-top: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
`;
const H4 = styled.h4`
  ${headingStyles()}
  font-size: ${props => props.theme.fontSizes.lg};
  margin-top: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
`;
const H5 = styled.h5`${headingStyles()} font-size: ${props => props.theme.fontSizes.base};`;
const H6 = styled.h6`${headingStyles()} font-size: ${props => props.theme.fontSizes.sm};`;

export function Heading({ level, children, id }: HeadingProps) {
  const Component = [H1, H2, H3, H4, H5, H6][level - 1];
  return <Component id={id}>{children}</Component>;
}

// ============================================================================
// 2. PARAGRAPHS & TEXT
// ============================================================================

export const Paragraph = styled.p`
  font-family: ${props => props.theme.fonts.body};
  font-size: ${props => props.theme.fontSizes.base};
  color: ${props => props.theme.colors.text};
  line-height: 1.6;
  margin-bottom: ${props => props.theme.spacing.md};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

interface TextProps {
  variant?: 'body' | 'caption' | 'small';
  children: ReactNode;
}

const textVariants = {
  body: (props: any) => props.theme.fontSizes.base,
  caption: (props: any) => props.theme.fontSizes.sm,
  small: (props: any) => props.theme.fontSizes.xs,
};

export const Text = styled.span<{ variant?: 'body' | 'caption' | 'small' }>`
  font-family: ${props => props.theme.fonts.body};
  font-size: ${props => textVariants[props.variant || 'body']};
  color: ${props => props.theme.colors.text};
  line-height: 1.5;
`;

// ============================================================================
// 3. LISTS
// ============================================================================

interface ListProps {
  ordered?: boolean;
  children: ReactNode;
}

const Ul = styled.ul`
  font-family: ${props => props.theme.fonts.body};
  font-size: ${props => props.theme.fontSizes.base};
  color: ${props => props.theme.colors.text};
  line-height: 1.6;
  margin-bottom: ${props => props.theme.spacing.md};
  padding-left: ${props => props.theme.spacing.xl};
  list-style-type: disc;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Ol = styled.ol`
  font-family: ${props => props.theme.fonts.body};
  font-size: ${props => props.theme.fontSizes.base};
  color: ${props => props.theme.colors.text};
  line-height: 1.6;
  margin-bottom: ${props => props.theme.spacing.md};
  padding-left: ${props => props.theme.spacing.xl};
  list-style-type: decimal;

  &:last-child {
    margin-bottom: 0;
  }
`;

export function List({ ordered, children }: ListProps) {
  const Component = ordered ? Ol : Ul;
  return <Component>{children}</Component>;
}

export const ListItem = styled.li`
  margin-bottom: ${props => props.theme.spacing.xs};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

// ============================================================================
// 4. LINKS
// ============================================================================

const linkStyles = (props: any) => `
  color: ${props.theme.colors.primary};
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s;
  
  &:hover {
    border-bottom-color: ${props.theme.colors.primary};
  }
  
  &:visited {
    color: ${props.theme.colors.primary};
  }
`;

const StyledAnchor = styled.a`${linkStyles}`;
const StyledNextLink = styled(NextLink)`${linkStyles}`;

interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string;
  children: ReactNode;
}

export function Link({ href, children, ...props }: LinkProps) {
  // Check if external link (http/https or mailto/tel)
  const isExternal = href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:');
  
  if (isExternal) {
    return (
      <StyledAnchor href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </StyledAnchor>
    );
  }
  
  // Internal link - use Next.js Link for SPA navigation
  return (
    <StyledNextLink href={href} {...props}>
      {children}
    </StyledNextLink>
  );
}

// ============================================================================
// 5. INLINE CODE
// ============================================================================

export const Code = styled.code`
  font-family: ${props => props.theme.fonts.mono};
  font-size: 0.9em;
  background: ${props => props.theme.colors.hover};
  border-left: 2px solid ${props => props.theme.colors.primary}33;
  border-radius: ${props => props.theme.radii.small};
  padding: 0.15em 0.4em 0.15em 0.35em;
  color: ${props => props.theme.colors.primary};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
`;



// ============================================================================
// 7. BLOCKQUOTE
// ============================================================================

export const Blockquote = styled.blockquote`
  margin: ${props => props.theme.spacing.lg} 0;
  padding-left: ${props => props.theme.spacing.md};
  border-left: 4px solid hsl(210, 100%, 25%);
  color: ${props => props.theme.colors.text};
  font-style: italic;
  
  p {
    margin-bottom: ${props => props.theme.spacing.sm};
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

// ============================================================================
// 8. CALLOUT (Bonus for docs)
// ============================================================================

interface CalloutProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  children: ReactNode;
}

const calloutColors = {
  info: { bg: '#e3f2fd', border: '#2196f3' },
  success: { bg: '#e8f5e9', border: '#4caf50' },
  warning: { bg: '#fff3e0', border: '#ff9800' },
  error: { bg: '#ffebee', border: '#f44336' },
};

export const Callout = styled.div<{ type?: 'info' | 'success' | 'warning' | 'error' }>`
  margin: ${props => props.theme.spacing.lg} 0;
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.radii.medium};
  border-left: 4px solid ${props => {
    const type = props.type || 'info';
    return calloutColors[type].border;
  }};
  background: ${props => props.theme.colors.hover};
  
  p:last-child {
    margin-bottom: 0;
  }
`;

// ============================================================================
// 9. DIVIDER
// ============================================================================

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin: ${props => props.theme.spacing.md} 0;
`;

// ============================================================================
// 10. TABLE
// ============================================================================

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: ${props => props.theme.spacing.lg} 0;
  font-family: ${props => props.theme.fonts.body};
  font-size: ${props => props.theme.fontSizes.base};
  color: ${props => props.theme.colors.text};
`;

export const Thead = styled.thead`
  border-bottom: 4px solid rgba(255, 255, 255, 0.1);
`;

export const Tbody = styled.tbody``;

export const Tr = styled.tr`
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  &:last-child {
    border-bottom: none;
  }
`;

export const Th = styled.th`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  text-align: left;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
`;

export const Td = styled.td`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  vertical-align: top;
`;

// ============================================================================
// 11. LAYOUT HELPERS
// ============================================================================

interface StackProps {
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  children: ReactNode;
}

export const Stack = styled.div<{ spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' }>`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[props.spacing || 'md']};
`;

export const Inline = styled.div<{ spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' }>`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing[props.spacing || 'sm']};
  align-items: center;
`;

// ============================================================================
// 12. BOX - Universal Container
// ============================================================================

interface BoxProps {
  p?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';  // padding
  px?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; // padding horizontal
  py?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; // padding vertical
  m?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';  // margin
  mx?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; // margin horizontal
  my?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; // margin vertical
  bg?: string; // background color (can use theme colors)
  children: ReactNode;
}

export const Box = styled.div<BoxProps>`
  ${props => props.p && `padding: ${props.theme.spacing[props.p]}`};
  ${props => props.px && `padding-left: ${props.theme.spacing[props.px]}; padding-right: ${props.theme.spacing[props.px]}`};
  ${props => props.py && `padding-top: ${props.theme.spacing[props.py]}; padding-bottom: ${props.theme.spacing[props.py]}`};
  ${props => props.m && `margin: ${props.theme.spacing[props.m]}`};
  ${props => props.mx && `margin-left: ${props.theme.spacing[props.mx]}; margin-right: ${props.theme.spacing[props.mx]}`};
  ${props => props.my && `margin-top: ${props.theme.spacing[props.my]}; margin-bottom: ${props.theme.spacing[props.my]}`};
  ${props => props.bg && `background-color: ${props.bg}`};
`;

// ============================================================================
// 13. CONTAINER - Centered Max-Width
// ============================================================================

interface ContainerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  children: ReactNode;
}

const containerSizes = {
  sm: '640px',
  md: '800px',
  lg: '1000px',
  xl: '1200px',
  full: '100%',
};

export const Container = styled.div<{ size?: 'sm' | 'md' | 'lg' | 'xl' | 'full' }>`
  width: 100%;
  max-width: ${props => containerSizes[props.size || 'lg']};
  margin-left: auto;
  margin-right: auto;
  margin-top: 4rem;
  margin-bottom: 24rem;
  padding: 0 ${props => props.theme.spacing.lg};
`;

// ============================================================================
// 14. FLEX - Explicit Flexbox Control
// ============================================================================

interface FlexProps {
  direction?: 'row' | 'column';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  wrap?: boolean;
  children: ReactNode;
}

const justifyMap = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
};

const alignMap = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
  baseline: 'baseline',
};

export const Flex = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  justify-content: ${props => justifyMap[props.justify || 'start']};
  align-items: ${props => alignMap[props.align || 'start']};
  gap: ${props => props.theme.spacing[props.gap || 'md']};
  flex-wrap: ${props => props.wrap ? 'wrap' : 'nowrap'};
`;

// ============================================================================
// EXPORTS
// ============================================================================

// Export everything for easy importing
export {
  // Already exported above, just for clarity:
  // Heading, Paragraph, Text, List, ListItem, Link,
  // Code, CodeBlock, Blockquote, Callout, Divider,
  // Stack, Inline, Box, Container, Flex
};
