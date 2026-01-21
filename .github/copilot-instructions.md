3# Copilot Instructions for `jaygriff`

Welcome to the `jaygriff` codebase! This document provides essential guidance for AI coding agents to be productive in this project. It outlines the architecture, workflows, conventions, and integration points specific to this repository.

---

## Project Overview

This is a modern web application built with **Next.js** and **TypeScript**. The project uses **Emotion** for styling and follows a modular architecture to separate concerns. Key directories include:

- `src/app/`: Contains Next.js app-specific files.
- `src/components/`: Reusable UI components.
- `src/styles/`: Global styles and theme definitions.
- `src/theme/`: Theme configuration and data.
- `content/tsx/`: TSX content files (posts, docs) that are dynamically imported and rendered.
- `content/md/`: Markdown content files.

### Key Features
- **Content System**: File-based content in `content/tsx/` and `content/md/` directories, discovered via `src/lib/posts.ts`.
- **Primitive Components**: Constraint-based design system with all primitives exported from `src/components/Primitives.tsx`. Use these as building blocks instead of creating one-off components.
- **Code Block Component**: A styled code block component (`src/components/CodeBlock/`)

### Component Import Rules (CRITICAL)
When creating content files in `content/tsx/`:

**CORRECT imports:**
```typescript
import { Heading, Paragraph, List, ListItem } from '@/components/Primitives';
import { CodeBlock } from '@/components/CodeBlock/CodeBlock';
```

**WRONG - DO NOT DO THIS:**
```typescript
import { Heading, Paragraph, CodeBlock } from '@/components/Primitives'; // CodeBlock is NOT in Primitives
```

**Key rule:** CodeBlock lives in its own directory and MUST be imported separately from `@/components/CodeBlock/CodeBlock`. All other UI components (Heading, Paragraph, List, ListItem) come from `@/components/Primitives`.

---

## Developer Workflows

### Building and Running
- **Development Server**: Run `npm run dev` to start the Next.js development server.
- **Production Build**: Use `npm run build` to create a production build, and `npm start` to serve it.

### Testing
- No explicit test setup.

### Debugging
- Use Next.js's built-in debugging tools and React DevTools for component inspection.
---

## Project-Specific Conventions

### File Organization
- **Component Structure**: Each component resides in its own directory with separate files for logic (`.tsx`) and styles (`.styles.ts`).
  - Example: `src/components/CodeBlock/`
- **Content Structure**: Content files live in `content/tsx/` (TSX components) and `content/md/` (Markdown files).
  - Use `@content/*` path alias for imports (maps to `./content/*`)
  - Content discovery handled by `getAllPosts()` and `getAllDocs()` in `src/lib/posts.ts`
  - **Always check `src/types/post.ts` for the `PostMeta` interface when adding or modifying content metadata fields**
- **Theme Management**: Themes are defined in `src/theme/themeData.ts` and applied using `src/app/emotion-provider.tsx`.

### Styling
- **Emotion**: Use Emotion's `css` and `styled` utilities for styling. Global styles are defined in `src/styles/GlobalStyles.tsx`.

### TypeScript
- Strict typing is enforced. Ensure all components and functions are properly typed.
- **Path Aliases**: 
  - `@/*` maps to `./src/*`
  - `@content/*` maps to `./content/*`

---

## Integration Points

### External Dependencies
- **Emotion**: For CSS-in-JS styling.
- **Next.js**: For server-side rendering and routing.

### Cross-Component Communication
- **Theme Context**: Managed via `src/app/emotion-provider.tsx` to provide consistent theming across the app.

---

## Directives for AI Agents

- **Do Not Invent Components**: Avoid creating new components unless explicitly instructed to do so. Focus on reusing and extending existing components wherever possible.
- **Follow Existing Patterns**: Adhere to the established file structure, naming conventions, and coding styles present in the codebase.
- **Rich Metadata for Content Pages**: When generating content files in `content/tsx/`, you are typically the first author. Add thoughtful, rich metadata to the `PostMeta` export:
  - Use descriptive, accurate `title` values
  - Add relevant `tags` array (e.g., `['dev', 'components']`, `['design', 'ux']`, `['git', 'workflow']`)
  - Write clear `description` strings that explain the content's purpose
  - Include proper `date` in ISO 8601 format (e.g., '2026-01-21T10:30:00Z')
  - Ensure `slug` is kebab-case and matches the filename
  - Add any other optional fields from `src/types/post.ts` that are relevant
  - This metadata will eventually drive the site's organization and routing system, so be intentional about it