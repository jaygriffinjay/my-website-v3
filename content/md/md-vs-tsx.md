# Content Architecture: TSX-First with MD Fallback

## Philosophy

**TSX is the first-class citizen.** Markdown is just an input format, not a working format.

We write 95% JSX. Content and logic are inherently coupled in this paradigm. Instead of fighting that reality, we embrace it.

## The System

### File Priority
1. Check for `.tsx` version → use if exists (preferred)
2. Fall back to `.md` → parse with react-markdown + custom components
3. No file → 404

### Directory Structure
```
/content/
  my-post.md       <- fallback, gets auto-rendered
  my-post.tsx      <- preferred, full control
/source/raw/assets/
  [markdown files live here for now]
```

### Rendering Strategy

MD files get parsed with custom component mapping:
```tsx
const components = {
  h1: MyH1Component,
  p: MyParagraph,
  code: MyCodeBlock,
  // etc
}

<ReactMarkdown components={components}>
  {mdContent}
</ReactMarkdown>
```

When we need custom logic, interactivity, or special components → create the TSX version.

## Why Not MDX?

MDX assumes **markdown-first, JSX-second**.

Our reality is **TSX-first, markdown-as-input**.

We don't want to make markdown do things it wasn't meant to do. We use markdown as raw content that gets promoted to first-class TSX when needed.

## Content Storage: In-Repo for Now

Currently: 4 MD files in `/source/raw/assets/`

**Why in-repo:**
- Version control for content + code together
- Simple deployment (everything in one place)
- No external dependencies, APIs, or auth
- Fast local development

**When to move out of repo:**
- Non-technical people need to edit (need a UI)
- Hundreds/thousands of files bloating the repo
- Build times suffering
- Multi-repo content sharing needed

We'll know when we hit those thresholds. Until then: keep it simple.

## Development Philosophy

### No Premature Factoring

**Create → Iterate → Improve → Factor when painful**

Don't abstract until:
- Pattern appears 3+ times
- Every change requires multiple edits
- The pain is *real* and *felt*

The code will tell you when it wants to be factored.

### Why This Works

Early factoring means guessing at patterns that don't exist yet. You don't know:
- What gets reused
- What changes together
- What the actual constraints are

Living with the "mess" for a bit means when you DO factor, the abstraction fits perfectly instead of being a generic guess.

## Implementation Notes

- Using react-markdown (or similar) for MD parsing
- Custom components map to all markdown elements
- TSX files have full access to all repo components, logic, types
- MD files are treated as content ingestion points (like copying a conversation into the repo)
- Everything renders through the same component system

## Future Considerations

- Build-time vs runtime file checking for TSX/MD priority
- Route generation based on available content files
- Potential content preview/dev tool for in-repo docs
- Migration path from MD → TSX when enhancement needed