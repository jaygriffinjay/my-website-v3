# Why Markdown Works (And Why Obsidian Misses the Point)

**Date:** January 17, 2026  
**Status:** Markdown Philosophy Manifesto

---

## TL;DR

**Markdown is NOT good because of the syntax.**

Markdown is good because:
- ✅ **Constraints force clarity** (limited elements = clean writing)
- ✅ **Easy to parse** (portable across any system)
- ✅ **Plain text storage** (future-proof, version controllable)

**The `##` and `**bold**` syntax exists for the PARSER, not for YOU.**

---

## What Makes Markdown Actually Valuable

### 1. **Constraints = Clarity**

When you only have:
- Headers (h1-h6)
- Paragraphs
- Lists
- Links
- Bold/italic
- Code blocks
- Blockquotes

**You CAN'T over-design.**

You can't add 17 different text styles. You can't make everything a different color. You can't create visual chaos.

**The limited element set forces you to write clearly** because the medium doesn't let you do anything else.

This is the ACTUAL power of markdown. Not the syntax.

### 2. **Easy to Parse = Portable**

Your content isn't locked into:
- Proprietary formats
- Specific applications
- Vendor platforms
- Binary files

Any tool can read it. Any system can transform it. Any script can process it.

**Portability is freedom.**

### 3. **Plain Text = Future-Proof**

- Version controllable (Git)
- Searchable (grep, ripgrep, any text search)
- Diffable (see exactly what changed)
- Readable without special software
- Will work in 50 years

**Plain text is the most durable format in computing.**

---

## The Syntax is Implementation Detail

```markdown
## This is a header
**This is bold**
[This is a link](https://example.com)
```

**This syntax exists for the MACHINE to understand structure.**

**It does NOT exist to be beautiful for humans to stare at while writing.**

When I'm writing, I don't want to see `##`. I want to see a header.  
When I'm writing, I don't see `**bold**`. I want to see bold text.

**The syntax is the FILE FORMAT, not the EDITING EXPERIENCE.**

---

## Where Obsidian Gets It Wrong

Obsidian fetishizes the wrong part of markdown.

### ❌ **Problem 1: Syntax Visibility**

Obsidian is proud of showing you:
- `## Headers with hashes`
- `**Bold with asterisks**`
- `[[Wiki-style links]]`
- `- List items with dashes`

They market this as a FEATURE: "See the markdown syntax while you edit!"

**No. That's visual noise.**

I don't care about seeing the markup. I care about seeing the CONTENT.

**The syntax is for the parser, not for my eyeballs.**

### ❌ **Problem 2: The Vault System**

Why do I need a "vault"? Why can't I just:
- Point to ANY directory
- Edit ANY markdown files
- Not have a special `.obsidian` folder
- Not "initialize" anything

Just let me edit markdown files. That's it.

The vault system is artificial lock-in. It creates friction where none needs to exist.

### What Obsidian Should Be

```
Perfect Obsidian:
✅ WYSIWYG editing (no syntax noise)
✅ Works on any directory
✅ Saves to plain .md files
✅ Good search/linking
✅ Fast

Actual Obsidian:
❌ Shows markdown syntax while editing
❌ Requires vault system
✅ Plain .md files (they got this right)
✅ Good search/linking
✅ Fast
```

They're 60% there but ruin it by worshipping syntax visibility.

---

## Where Notion Gets It (Mostly) Right

### ✅ **WYSIWYG Editing**

When you type in Notion:
- Headers LOOK like headers
- Bold text LOOKS bold
- Links LOOK like links
- No `##` or `**` noise

**You edit what you see. The syntax is hidden.**

This is correct. This is how it should work.

### ✅ **Constraint System**

Notion also has a limited set of blocks:
- Text
- Headers
- Lists
- Code
- Callouts
- etc.

It's basically markdown's constraint system with a better editing experience.

### ✅ **Clean Writing Experience**

No visual noise. No syntax to remember. Just write.

The structure is enforced by the block system, not by you typing special characters.

---

## Where Notion Gets It Wrong

### ❌ **Not Plain Text**

Notion stores everything in a proprietary database.

- Can't version control
- Can't grep
- Export is janky
- Vendor lock-in

**This ruins the portability benefit of markdown.**

### ❌ **Decoupled from Projects**

Notion pages live in Notion, not in your repo.

So your project docs drift away from your actual code. They get stale. They get forgotten.

**Documentation should live WITH the code it describes.**

---

## The Ideal System

```
What We Actually Want:
✅ WYSIWYG editing (like Notion)
✅ Plain .md file storage (like markdown)
✅ Lives in the repo (not external)
✅ Version controlled (Git)
✅ Portable (any tool can read it)
✅ No vault system (just files)
✅ No syntax noise (hidden from editor)
```

**Notion's UX + Markdown's storage format + In-repo location.**

This doesn't exist yet as a good tool, so we're building it.

---

## The Pattern: People Fetishize the Wrong Thing

This is the same mistake as Tailwind.

### Tailwind
- **What people think is good:** `px-4` syntax
- **What's actually valuable:** Design tokens, constraints
- **Better way:** Emotion + theme objects (structured data)

### Markdown
- **What people think is good:** `##` syntax
- **What's actually valuable:** Constraints, portability
- **Better way:** WYSIWYG + markdown storage

**Don't confuse the implementation detail with the actual value proposition.**

---

## Our Solution

Building a WYSIWYG markdown editor into the personal site:

```
/dev/editor route:
✅ WYSIWYG editing (no syntax visible)
✅ Edits files in /source/raw/assets/
✅ Live preview with actual site components
✅ Saves directly to .md files
✅ No vault, just files in the repo
✅ Version controlled (Git)
✅ Integrated with existing content system
```

**Obsidian's UX without the syntax noise. Notion's editing without the lock-in.**

---

## Conclusion

**Markdown is good because:**
1. Constraints force clarity
2. Easy to parse = portable
3. Plain text = future-proof

**Markdown is NOT good because `##` looks cool.**

**Obsidian worships syntax. Wrong.**  
**Notion hides syntax but locks you in. Wrong.**

**The right answer:** WYSIWYG editing + plain markdown storage + in-repo location.

**We're building it.**

---

## Final Take

> **"The syntax exists for the PARSER, not for the HUMAN."**

Stop making people stare at `##` and `**bold**` while they write.

Give them clean WYSIWYG editing.  
Store it as markdown files.  
Keep it portable and future-proof.

**That's how you respect both the writer AND the format.**

---

*P.S. This is the same philosophy as the Tailwind rant: Don't confuse the wrapper (syntax/classes) with the actual value (constraints/tokens). Extract the value, discard the baggage.*