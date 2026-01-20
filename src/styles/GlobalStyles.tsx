'use client';

import { Global } from '@emotion/react';
import { useTheme } from '../theme/theme';

export function GlobalStyles() {
  const { theme } = useTheme();
  
  return (
    <Global
      styles={{
        // CSS Reset
        '*': {
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
        },
        
        // Root styles
        html: {
          height: '100%',
          background: '#1a1a24',
        },
        body: {
          height: '100%',
          fontFamily: theme.fonts.body,
          fontSize: theme.fontSizes.base,
          lineHeight: 1.5,
          color: theme.colors.text,
          background: '#1a1a24',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
      }}
    />
  );
}