---json
{
  "title": "Update Authorship Metadata Across All Posts",
  "slug": "todo-update-authorship-metadata",
  "date": "2026-01-23T12:30:00Z",
  "author": "Jay Griffin",
  "type": "doc",
  "tags": ["todo", "metadata", "authorship", "bulk-edit", "transparency"]
}
---

## Problem

Current posts inconsistently handle authorship and workflow transparency metadata.

**Framework from [AI Workflow Transparency](/posts/ai-workflow-transparency):**
- **AI is not an author** - it's a tool, lacks autonomy and accountability
- **You're the author when:** You identified the problem, directed the process, made editorial decisions, and are accountable for publishing
- **Workflow transparency ≠ co-authorship** - disclose process, don't credit AI as author

**Current state:** Posts have varying approaches:
- Some: `author: 'Jay Griffin, Claude Sonnet 4.5'` (incorrect - treats AI as co-author)
- Some: `authorshipNote: 'Claude wrote this based on Jay's direction...'` (good workflow transparency)
- Some: Inconsistent or missing workflow notes

**Desired state:** 
- `author: 'Jay Griffin'` (always, for AI-assisted work where you made editorial decisions)
- `authorshipNote` should indicate **workflow transparency**, not authorship credit
- Consistent labeling approach across all content

## Affected Files

All content files that currently credit AI as co-author:

### TSX Files in `content/tsx/`:
- `about-this-site.tsx`
- `about-authorship.tsx`
- `feature-spec-private-content.tsx`
- Potentially others (need to grep for `'Claude Sonnet'` or similar)

### Markdown Files in `content/md/`:
- Check all files with `author` field containing AI references

### Pattern to Find Them:
```bash
# Find all files mentioning Claude as author
grep -r "Claude Sonnet" content/

# Find all files with authorshipNote field
grep -r "authorshipNote" content/
```

## Metadata Changes Required

### Incorrect (AI as co-author):
```typescript
export const metadata = {
  title: 'Some Post',
  slug: 'some-post',
  author: 'Jay Griffin, Claude Sonnet 4.5', // ❌ AI can't be author
  authorshipNote: 'Claude wrote this...',
  // ...
};
```

### Correct (Workflow transparency via note):
```typescript
export const metadata = {
  title: 'Some Post',
  slug: 'some-post',
  author: 'Jay Griffin', // ✅ You made editorial decisions and are accountable
  authorshipNote: 'AI-assisted. Generated with Claude, edited and approved.', // ✅ Workflow disclosure
  // ...
};
```

### Minimal (No workflow note):
```typescript
export const metadata = {
  title: 'Some Post',
  slug: 'some-post',
  author: 'Jay Griffin',
  // No authorshipNote - assumes general framework applies
  // ...
};
```

### For 100% AI-generated content (rare):
```typescript
export const metadata = {
  title: 'Some Post',
  slug: 'some-post',
  // No author field - you're the publisher/curator, not author
  authorshipNote: 'AI-generated. Approved for publication.',
  // ...
};
```

## Implementation Steps

### Manual Approach (Current):
1. Use grep to find all files with AI author credits
2. Open each file individually
3. Update `author` field to `'Jay Griffin'`
4. Remove or update `authorshipNote` field
5. Commit changes

**Problem:** This is tedious, error-prone, and exactly the kind of bulk operation that should be automated.

### With Metadata Editor (Future):
1. Query: "Show all posts where author contains 'Claude'"
2. Bulk edit: Set `author = 'Jay Griffin'` for all results
3. Bulk edit: Remove `authorshipNote` field (or set to standard value)
4. Review changes in diff
5. Commit

## Special Cases

### `about-authorship.tsx`
This post **explains the authorship framework**, so it should demonstrate it correctly:
```typescript
author: 'Jay Griffin', // You made editorial decisions and are accountable
authorshipNote: 'AI-assisted. Appropriately meta for a post about AI authorship.',
```

### Feature specs and brainstorming docs
Posts like `feature-spec-private-content.tsx` where AI generates extensive exploration:
```typescript
author: 'Jay Griffin', // You directed the spec and approved it
authorshipNote: 'AI-assisted. Spec brainstormed with Claude based on requirements.',
```

### Commit summaries
Posts in `docs/commits/` directory that document work:
```typescript
author: 'Jay Griffin',
authorshipNote: 'AI-assisted. Summarized from git history and conversation.',
```

### General content posts
Most blog posts and docs where you provided direction and editing:
```typescript
author: 'Jay Griffin',
authorshipNote: 'AI-assisted.', // Minimal disclosure, framework documented elsewhere
// or omit authorshipNote entirely if general framework is documented on site
```

## Decision Points

1. **Standardized workflow note or varied?**
   - Standard: Simple "AI-assisted." on most posts
   - Varied: Context-specific notes where process details matter
   - Recommendation: **Standard minimal note**, with detail only where relevant

2. **Keep authorshipNote field at all, or rely on site-wide framework?**
   - Keep: Per-post transparency, visible in metadata
   - Site framework: Define disclosure categories once (like in ai-workflow-transparency.md), label posts accordingly
   - Recommendation: **Site framework eventually**, but authorshipNote works now

3. **Fix everything at once or phase it in?**
   - All at once: Consistent immediately, but tedious manually
   - Phased: Fix high-visibility posts now, bulk-edit the rest with metadata editor later

## Why This Matters

This bulk metadata update is a **perfect use case for the metadata editor** that's planned. It demonstrates:
- Need for queryable metadata (find all posts with X)
- Need for bulk operations (update many posts at once)
- Need for preview/diff before committing changes

Doing this manually now is painful, but that pain validates building the tool.

## Related

- [Feature Spec: Metadata Editor](#) (not yet created)
- [AI Workflow Transparency](ai-workflow-transparency.md)
- [About Authorship](about-authorship.tsx)