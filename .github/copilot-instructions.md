3# Copilot Instructions for `my-website-v3`

Welcome to the `my-website-v3` codebase! This document provides essential guidance for AI coding agents to be productive in this project. It outlines the architecture, workflows, conventions, and integration points specific to this repository.

---

## Project Overview

This is a modern web application built with **Next.js** and **TypeScript**. The project uses **Emotion** for styling and follows a modular architecture to separate concerns. Key directories include:

- `src/app/`: Contains Next.js app-specific files, including pages and layout components.
- `src/components/`: Reusable UI components.
- `src/styles/`: Global styles and theme definitions.
- `src/theme/`: Theme configuration and data.

### Key Features
- **Theme Editor**: A dedicated page (`src/app/theme-editor/`) for editing and previewing themes.
- **Code Block Component**: A styled code block component (`src/components/CodeBlock/`) for syntax highlighting.

---

## Developer Workflows

### Building and Running
- **Development Server**: Run `npm run dev` to start the Next.js development server.
- **Production Build**: Use `npm run build` to create a production build, and `npm start` to serve it.

### Testing
- No explicit test setup is detected. Add tests in the `__tests__` directory or integrate a testing framework like Jest.

### Debugging
- Use Next.js's built-in debugging tools and React DevTools for component inspection.

---

## Project-Specific Conventions

### File Organization
- **Component Structure**: Each component resides in its own directory with separate files for logic (`.tsx`) and styles (`.styles.ts`).
  - Example: `src/components/CodeBlock/`
- **Theme Management**: Themes are defined in `src/theme/themeData.ts` and applied using `src/app/emotion-provider.tsx`.

### Styling
- **Emotion**: Use Emotion's `css` and `styled` utilities for styling. Global styles are defined in `src/styles/GlobalStyles.tsx`.

### TypeScript
- Strict typing is enforced. Ensure all components and functions are properly typed.

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

---

## Examples

### Creating a New Component
1. Create a new directory under `src/components/`.
2. Add a `.tsx` file for the component logic and a `.styles.ts` file for styles.
3. Export the component from an `index.ts` file.

### Adding a New Page
1. Create a new directory under `src/app/`.
2. Add a `page.tsx` file for the page logic.
3. Update the layout or theme provider if necessary.

---

For further details, refer to the source files mentioned above. If you encounter any issues or need clarification, feel free to ask!