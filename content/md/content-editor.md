---json
{
  "title": "Feature Spec: Dev-Mode WYSIWYG Content Editor",
  "slug": "content-editor",
  "date": "2026-01-27T00:00:00Z",
  "author": "Claude Sonnet 4.5",
  "authorshipNote": "🤖 AI-generated",
  "type": "doc",
  "description": "A development-only inline content editor for markdown files that enables quick content updates without manually editing files in an IDE.",
  "tags": ["feature-spec", "dev-tools", "content", "editor"],
  "status": "Planning"
}
---

# Feature Spec: Dev-Mode WYSIWYG Content Editor

## Overview

A development-only inline content editor that allows direct editing of markdown files through the browser interface. This feature enables quick content updates without manually editing files in an IDE, significantly improving content workflow efficiency.

---

## Problem Statement

### Current Workflow Pain Points

With 30+ content pages, the current editing workflow is inefficient:

1. Open IDE
2. Navigate to correct file in `/src/pages/`
3. Make content changes
4. Save file
5. Wait for hot reload
6. Review changes
7. Commit to git

**For simple edits** (typo fixes, content updates, metadata changes), this is 5+ steps and 2-3 minutes per edit.

**At scale** (30+ pages, frequent updates), this becomes a major bottleneck.

### Success Criteria

After implementation:
- Edit any markdown page inline in < 30 seconds
- No IDE required for content-only changes
- Changes written directly to files (git-trackable)
- Zero database complexity
- Works only in development (safety first)

---

## Architecture

### System Components

```
┌─────────────────────────────────────────────────────┐
│                    Browser UI                        │
│  ┌──────────────────────────────────────────────┐  │
│  │  Edit Button (dev only)                      │  │
│  │  Content Editable Area                       │  │
│  │  Metadata Form                               │  │
│  │  Save/Cancel Controls                        │  │
│  └──────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
                         │
                         │ POST /api/dev/save-content
                         ▼
┌─────────────────────────────────────────────────────┐
│              Next.js API Route                       │
│  ┌──────────────────────────────────────────────┐  │
│  │  1. Verify dev environment                   │  │
│  │  2. Validate filepath                        │  │
│  │  3. Parse/update frontmatter                 │  │
│  │  4. Write to filesystem                      │  │
│  │  5. Return success/error                     │  │
│  └──────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
                         │
                         │ fs.writeFileSync()
                         ▼
┌─────────────────────────────────────────────────────┐
│              Filesystem                              │
│  /src/pages/posts/my-post.md                        │
│  /src/pages/docs/my-doc.md                          │
└─────────────────────────────────────────────────────┘
```

### Technology Stack

- **Frontend:** React, contentEditable or TipTap/Slate
- **Backend:** Next.js API routes, Node.js `fs` module
- **Parsing:** gray-matter for frontmatter parsing
- **State Management:** React useState (no complex state needed)

---

## Detailed Implementation Plan

### Phase 1: Edit Mode Toggle

**Goal:** Add a floating edit button that toggles edit mode on/off.

**UI Components:**

```tsx
// EditModeButton.tsx
interface EditModeButtonProps {
  isEditMode: boolean;
  onToggle: () => void;
}

// Renders:
// - Floating button in top-right corner
// - Only visible when process.env.NODE_ENV === 'development'
// - Shows "Edit" when not in edit mode
// - Shows "Cancel" when in edit mode
```

**Styling:**
- Fixed position: `top: 20px, right: 20px`
- z-index: 9999 (above all content)
- Distinct color to indicate dev tooling (maybe orange/yellow)
- Small, non-intrusive

**State Management:**
```tsx
const [isEditMode, setIsEditMode] = useState(false);
const [hasChanges, setHasChanges] = useState(false);

// Warn on exit if unsaved changes
useEffect(() => {
  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    if (hasChanges) {
      e.preventDefault();
      e.returnValue = '';
    }
  };
  window.addEventListener('beforeunload', handleBeforeUnload);
  return () => window.removeEventListener('beforeunload', handleBeforeUnload);
}, [hasChanges]);
```

**Implementation Steps:**
1. Create `EditModeButton` component
2. Add to layout/page wrapper (check `NODE_ENV`)
3. Wire up toggle state
4. Style appropriately

---

### Phase 2: Content Editing

**Goal:** Make page content editable when in edit mode.

**Approach Options:**

#### Option A: contentEditable (Simple)
- Wrap content in `<div contentEditable={isEditMode}>`
- Capture changes with `onInput` or `onChange`
- Pros: Zero dependencies, simple implementation
- Cons: Limited formatting toolbar, harder to manage complex editing

#### Option B: TipTap (Recommended)
- React wrapper for ProseMirror
- Rich editing experience
- Markdown shortcuts built-in
- Pros: Professional editing UX, extensible
- Cons: Additional dependency (~200kb)

#### Option C: Slate
- Fully customizable
- More control over rendering
- Pros: Maximum flexibility
- Cons: More complex to set up

**Recommended:** Start with contentEditable, upgrade to TipTap if needed.

**Implementation:**

```tsx
// ContentEditor.tsx
interface ContentEditorProps {
  initialContent: string;
  isEditMode: boolean;
  onChange: (content: string) => void;
}

const ContentEditor: React.FC<ContentEditorProps> = ({
  initialContent,
  isEditMode,
  onChange,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleInput = () => {
    if (contentRef.current) {
      const newContent = contentRef.current.innerText;
      onChange(newContent);
    }
  };

  return (
    <div
      ref={contentRef}
      contentEditable={isEditMode}
      onInput={handleInput}
      suppressContentEditableWarning
      style={{
        outline: isEditMode ? '2px solid orange' : 'none',
        padding: isEditMode ? '10px' : '0',
      }}
      dangerouslySetInnerHTML={{ __html: initialContent }}
    />
  );
};
```

**Visual Indicators:**
- Border/outline when in edit mode
- Background color change (subtle)
- Cursor change to text cursor
- Maybe a "Editing..." badge

**Time Estimate:** 1-2 hours

---

### Phase 3: Save API Endpoint

**Goal:** Create API route to save edited content back to markdown files.

**Endpoint:** `POST /api/dev/save-content`

**Request Body:**
```typescript
interface SaveContentRequest {
  filepath: string;          // e.g., "/src/pages/posts/my-post.md"
  content: string;           // Updated markdown content
  metadata?: {               // Optional frontmatter updates
    title?: string;
    date?: string;
    tags?: string[];
    [key: string]: any;
  };
}
```

**Response:**
```typescript
interface SaveContentResponse {
  success: boolean;
  message: string;
  filepath?: string;
  error?: string;
}
```

**Implementation:**

```typescript
// /app/api/dev/save-content/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function POST(request: NextRequest) {
  // 1. Verify dev environment
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { success: false, error: 'This endpoint is only available in development' },
      { status: 403 }
    );
  }

  try {
    const { filepath, content, metadata } = await request.json();

    // 2. Validate filepath
    if (!filepath || typeof filepath !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Invalid filepath' },
        { status: 400 }
      );
    }

    // 3. Ensure filepath is within allowed directories
    const allowedDirs = ['/src/pages/posts', '/src/pages/docs'];
    const isAllowed = allowedDirs.some(dir => filepath.startsWith(dir));
    
    if (!isAllowed) {
      return NextResponse.json(
        { success: false, error: 'Filepath not in allowed directories' },
        { status: 403 }
      );
    }

    // 4. Resolve absolute path
    const absolutePath = path.join(process.cwd(), filepath);

    // 5. Read existing file to preserve frontmatter
    const existingContent = fs.readFileSync(absolutePath, 'utf-8');
    const { data: existingMetadata } = matter(existingContent);

    // 6. Merge metadata
    const updatedMetadata = { ...existingMetadata, ...metadata };

    // 7. Rebuild file with frontmatter
    const newFileContent = matter.stringify(content, updatedMetadata);

    // 8. Write to filesystem
    fs.writeFileSync(absolutePath, newFileContent, 'utf-8');

    return NextResponse.json({
      success: true,
      message: 'Content saved successfully',
      filepath: filepath,
    });

  } catch (error) {
    console.error('Error saving content:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
```

**Security Considerations:**
- Only runs in development
- Validates filepath is in allowed directories
- No arbitrary file system access
- Logs all save operations

**Error Handling:**
- File not found
- Permission errors
- Invalid JSON
- Malformed frontmatter

**Time Estimate:** 1-2 hours

---

### Phase 4: Metadata Editing

**Goal:** Allow editing of frontmatter fields (title, date, tags, etc.)

**UI Component:**

```tsx
// MetadataEditor.tsx
interface MetadataEditorProps {
  metadata: Record<string, any>;
  onChange: (metadata: Record<string, any>) => void;
  isEditMode: boolean;
}

const MetadataEditor: React.FC<MetadataEditorProps> = ({
  metadata,
  onChange,
  isEditMode,
}) => {
  const [localMetadata, setLocalMetadata] = useState(metadata);

  const handleFieldChange = (key: string, value: any) => {
    const updated = { ...localMetadata, [key]: value };
    setLocalMetadata(updated);
    onChange(updated);
  };

  if (!isEditMode) {
    return (
      <div className="metadata-display">
        <h1>{metadata.title}</h1>
        <p>{metadata.date}</p>
        <div>{metadata.tags?.join(', ')}</div>
      </div>
    );
  }

  return (
    <div className="metadata-editor">
      <label>
        Title:
        <input
          type="text"
          value={localMetadata.title || ''}
          onChange={(e) => handleFieldChange('title', e.target.value)}
        />
      </label>

      <label>
        Date:
        <input
          type="date"
          value={localMetadata.date || ''}
          onChange={(e) => handleFieldChange('date', e.target.value)}
        />
      </label>

      <label>
        Tags (comma-separated):
        <input
          type="text"
          value={localMetadata.tags?.join(', ') || ''}
          onChange={(e) => 
            handleFieldChange('tags', e.target.value.split(',').map(t => t.trim()))
          }
        />
      </label>

      {/* Add more fields as needed */}
    </div>
  );
};
```

**Features:**
- Display mode vs edit mode
- Validation for required fields
- Type-appropriate inputs (date picker, tag input, text, etc.)
- Visual diff showing what changed

**Time Estimate:** 1-2 hours

---

### Phase 5: Save Flow Integration

**Goal:** Wire everything together into a smooth save workflow.

**User Flow:**
1. User clicks "Edit" button
2. Content and metadata become editable
3. User makes changes
4. "Save" and "Cancel" buttons appear
5. User clicks "Save"
6. API request sent
7. Success/error message displayed
8. Page content updates (or reverts on error)
9. Edit mode disabled

**State Machine:**

```typescript
type EditorState = 'viewing' | 'editing' | 'saving' | 'error';

const [editorState, setEditorState] = useState<EditorState>('viewing');
const [editedContent, setEditedContent] = useState('');
const [editedMetadata, setEditedMetadata] = useState({});
const [saveError, setSaveError] = useState<string | null>(null);

const handleSave = async () => {
  setEditorState('saving');
  setSaveError(null);

  try {
    const response = await fetch('/api/dev/save-content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filepath: currentFilePath,
        content: editedContent,
        metadata: editedMetadata,
      }),
    });

    const result = await response.json();

    if (result.success) {
      setEditorState('viewing');
      // Optionally refresh page or update content in place
      window.location.reload(); // Simple approach
    } else {
      setEditorState('error');
      setSaveError(result.error || 'Save failed');
    }
  } catch (error) {
    setEditorState('error');
    setSaveError(error.message);
  }
};

const handleCancel = () => {
  if (hasChanges) {
    const confirmed = window.confirm('Discard unsaved changes?');
    if (!confirmed) return;
  }
  setEditorState('viewing');
  setEditedContent(originalContent);
  setEditedMetadata(originalMetadata);
};
```

**UI States:**

**Viewing State:**
- Edit button visible
- Content not editable
- No save controls

**Editing State:**
- Cancel button visible
- Save button visible (disabled if no changes)
- Content editable
- Metadata editable
- Visual indicator (border, background)

**Saving State:**
- Loading spinner
- Save button disabled
- "Saving..." text

**Error State:**
- Error message displayed
- Retry option
- Cancel option

**Time Estimate:** 1-2 hours

---

## File Detection & Path Resolution

**Challenge:** How does the editor know which file it's editing?

**Solution:** Inject filepath into page props during build.

```typescript
// In your page generation logic
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(post => ({
    slug: post.slug,
    // Add filepath to params
    _filepath: post.filepath, // e.g., "/src/pages/posts/my-post.md"
  }));
}

// In your page component
export default function PostPage({ params }) {
  const filepath = params._filepath;
  
  return (
    <DevEditor filepath={filepath}>
      {/* Page content */}
    </DevEditor>
  );
}
```

**Alternative:** Use pattern matching
```typescript
// If current URL is /posts/my-post
// Assume filepath is /src/pages/posts/my-post.md
const filepath = `/src/pages${pathname}.md`;
```

---

## Edge Cases & Error Handling

### File System Errors

**Case:** File doesn't exist
- **Handling:** Show error, offer to create new file

**Case:** File is read-only
- **Handling:** Show error, disable save

**Case:** Invalid markdown syntax
- **Handling:** Show parsing error, allow manual fix

### Concurrent Editing

**Case:** File modified externally while editing
- **Handling:** Detect via file hash/timestamp, show conflict warning

### Large Files

**Case:** File > 1MB
- **Handling:** Show warning, consider chunked editing

### Special Characters

**Case:** Frontmatter contains special YAML chars
- **Handling:** Proper escaping with gray-matter

---

## Future Enhancements

### Phase 6: TSX File Editing (Future)

**Challenge:** TSX files require code editor, not contentEditable

**Approach:**
- Integrate Monaco Editor (VS Code editor)
- Syntax highlighting for TSX
- Type checking (via TypeScript language server)
- Component preview alongside editor

**Complexity:** High (3-5 hours minimum)

### Phase 7: Image Upload

**Goal:** Drag-and-drop images directly into content

**Implementation:**
- Upload to `/public/images/`
- Generate markdown image syntax
- Compress/optimize images automatically

### Phase 8: Version History

**Goal:** Track and restore previous versions

**Implementation:**
- Git integration for diffs
- Time-travel through edits
- Restore previous versions

### Phase 9: Multi-File Edit

**Goal:** Edit multiple pages at once

**Implementation:**
- Queue multiple edits
- Batch save API
- Transaction-like commits

---

## Testing Plan

### Manual Testing Checklist

- [ ] Edit button appears only in development
- [ ] Edit button doesn't appear in production
- [ ] Content becomes editable when clicking Edit
- [ ] Content changes are captured correctly
- [ ] Metadata form updates correctly
- [ ] Save button disabled when no changes
- [ ] Save button enabled when changes detected
- [ ] API rejects requests in production
- [ ] API validates filepath correctly
- [ ] File writes succeed
- [ ] Frontmatter preserved correctly
- [ ] Special characters handled properly
- [ ] Error messages display correctly
- [ ] Cancel discards changes
- [ ] Page refreshes after save
- [ ] Browser warns on unsaved changes

### Automated Testing (Future)

```typescript
describe('DevEditor', () => {
  it('should only render in development', () => {});
  it('should toggle edit mode', () => {});
  it('should capture content changes', () => {});
  it('should save to filesystem', () => {});
  it('should preserve frontmatter', () => {});
});
```

---

## Performance Considerations

### Debouncing Saves

For auto-save feature (future):
```typescript
const debouncedSave = useMemo(
  () => debounce(handleSave, 2000),
  [handleSave]
);
```

### Optimistic Updates

Update UI immediately, rollback on error:
```typescript
const handleSave = async () => {
  const previousContent = content;
  
  // Update UI immediately
  setContent(editedContent);
  
  try {
    await saveContent();
  } catch (error) {
    // Rollback on error
    setContent(previousContent);
    showError(error);
  }
};
```

---

## Security Notes

**Critical:** This feature is dev-only and should NEVER run in production.

**Safeguards:**
1. Environment check: `process.env.NODE_ENV !== 'development'`
2. Filepath validation: Only allow specific directories
3. No arbitrary file system access
4. Logged operations for audit trail

**Production Build:**
- API routes return 403
- Edit button doesn't render
- Tree-shaking removes editor code

---

## Implementation Checklist

### Phase 1: Edit Mode Toggle
- [ ] Create EditModeButton component
- [ ] Add to page layout
- [ ] Wire up state management
- [ ] Style appropriately
- [ ] Test in dev/prod

### Phase 2: Content Editing
- [ ] Create ContentEditor component
- [ ] Implement contentEditable approach
- [ ] Add visual indicators
- [ ] Capture content changes
- [ ] Test editing flow

### Phase 3: Save API
- [ ] Create `/api/dev/save-content` route
- [ ] Implement environment check
- [ ] Add filepath validation
- [ ] Implement file writing logic
- [ ] Add error handling
- [ ] Test with curl/Postman

### Phase 4: Metadata Editing
- [ ] Create MetadataEditor component
- [ ] Implement field editing
- [ ] Add validation
- [ ] Wire to save flow
- [ ] Test metadata persistence

### Phase 5: Integration
- [ ] Connect all components
- [ ] Implement save flow
- [ ] Add loading states
- [ ] Add error states
- [ ] Test end-to-end
- [ ] Polish UX

---

## Timeline

**Week 1:**
- Day 1: Phase 1 (Edit Mode Toggle)
- Day 2: Phase 2 (Content Editing)
- Day 3: Phase 3 (Save API)
- Day 4: Phase 4 (Metadata Editing)
- Day 5: Phase 5 (Integration & Testing)

---

## Questions to Answer

- [ ] Which editor library? (contentEditable vs TipTap vs Slate)
- [ ] Auto-save or manual save only?
- [ ] Version history via git integration?
- [ ] Support for TSX files in v1 or v2?
- [ ] Image upload in v1 or future?
- [ ] Should saves trigger git commits automatically?

---

## Notes

This is a critical feature for scaling content production. The current workflow doesn't scale past ~30 pages. This feature is not about building a CMS for production use - it's about improving the development workflow for a solo developer managing their own content.

**Philosophy:** Keep it simple. Dev-only. Filesystem-based. No database. No auth. Just make editing faster.

Once this is working, TSX file editing and more advanced features can be considered. But v1 needs to solve the immediate pain: editing markdown files quickly.
