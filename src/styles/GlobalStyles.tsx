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
        'html, body': {
          fontFamily: theme.fonts.body,
          fontSize: theme.fontSizes.base,
          lineHeight: 1.5,
          color: theme.colors.text,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
      }}
    />
  );
}