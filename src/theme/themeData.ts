// ============================================================================
// THEME DATA - Edit this file to customize your theme
// ============================================================================

// ============================================================================
// TYPES
// ============================================================================

export interface ThemeConfig {
  // Colors
  primaryHue: number;        // 0-360
  primarySaturation: number; // 0-100
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  hoverColor: string;
  
  // Typography
  baseFontSize: number;      // 12-20
  fontFamily: string;
  
  // Spacing
  spacingUnit: number;       // 2-12
  
  // Border Radius
  radiusScale: number;       // 0-100
  
  // Shadows
  shadowColor: string;
  shadowIntensity: number;   // 0-1 (opacity)
}

export interface AppTheme {
  colors: {
    primary: string;
    background: string;
    text: string;
    border: string;
    hover: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  radii: {
    small: string;
    medium: string;
    large: string;
    full: string;
  };
  fontSizes: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    xxl: string;
    xxxl: string;
  };
  fonts: {
    body: string;
    heading: string;
    mono: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
}

// ============================================================================
// DEFAULT CONFIG
// ============================================================================

export const defaultConfig: ThemeConfig = {
  // Colors
  primaryHue: 220,
  primarySaturation: 80,
  backgroundColor: '#1a1a1a',
  textColor: '#cccccc',
  borderColor: '#333333',
  hoverColor: '#2a2a2a',
  
  // Typography
  baseFontSize: 16,
  fontFamily: 'system-ui, -apple-system, sans-serif',
  
  // Spacing
  spacingUnit: 4,
  
  // Border Radius
  radiusScale: 8,
  
  // Shadows
  shadowColor: '#000000',
  shadowIntensity: 0.1,
};

// ============================================================================
// THEME GENERATOR
// ============================================================================

export function generateTheme(config: ThemeConfig): AppTheme {
  const { 
    primaryHue, 
    primarySaturation, 
    spacingUnit, 
    baseFontSize, 
    radiusScale,
    fontFamily,
    shadowColor,
    shadowIntensity,
  } = config;
  
  // Helper to create rgba shadow
  const shadow = (blur: number, spread: number = 0) => {
    // Convert hex to rgb for rgba
    const hex = shadowColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `0 2px ${blur}px ${spread}px rgba(${r}, ${g}, ${b}, ${shadowIntensity})`;
  };
  
  return {
    colors: {
      primary: `hsl(${primaryHue}, ${primarySaturation}%, 50%)`,
      background: config.backgroundColor,
      text: config.textColor,
      border: config.borderColor,
      hover: config.hoverColor,
    },
    spacing: {
      xs: `${spacingUnit}px`,
      sm: `${spacingUnit * 2}px`,
      md: `${spacingUnit * 4}px`,
      lg: `${spacingUnit * 6}px`,
      xl: `${spacingUnit * 8}px`,
    },
    radii: {
      small: `${radiusScale * 0.5}px`,
      medium: `${radiusScale}px`,
      large: `${radiusScale * 2}px`,
      full: '9999px',
    },
    fontSizes: {
      xs: `${baseFontSize * 0.75}px`,
      sm: `${baseFontSize * 0.875}px`,
      base: `${baseFontSize}px`,
      lg: `${baseFontSize * 1.125}px`,
      xl: `${baseFontSize * 1.25}px`,
      xxl: `${baseFontSize * 1.5}px`,
      xxxl: `${baseFontSize * 2}px`,
    },
    fonts: {
      body: fontFamily,
      heading: fontFamily,
      mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    },
    shadows: {
      sm: shadow(4),
      md: shadow(8, 2),
      lg: shadow(16, 4),
    },
  };
}
