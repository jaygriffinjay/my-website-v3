"use client";

/**
 * Client boundary wrapper for content components.
 * 
 * Establishes a client-side context so child components can use:
 * - Emotion css prop and styled components
 * - React hooks (useState, useEffect, etc.)
 * - Browser APIs
 * 
 * Parent Server Components can pre-render content, then this wrapper
 * enables client-side interactivity and styling after hydration.
 */
export function ContentWrapper({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return <>{children}</>;
}
