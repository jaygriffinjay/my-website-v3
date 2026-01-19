# Intelligent Component Designer API
## Design Document & Implementation Guide

## Core Concept

An AI-powered component composition system that uses LLM intelligence for design decisions while maintaining deterministic, type-safe output through strict constraints and validation.

**Key Principle**: LLM handles probabilistic creative composition → Harness ensures deterministic valid output → Parser renders actual components

---

## System Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    User Interface                        │
│  • Component type selector                               │
│  • Style/feature checkboxes                              │
│  • Generate/Next/Keep buttons                            │
└────────────────┬─────────────────────────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────────────────────────┐
│              Control Language Layer                      │
│  • Defines constraints (MUST/FORBIDDEN)                  │
│  • Sets available primitives                             │
│  • Specifies context (type, style, features)             │
└────────────────┬─────────────────────────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────────────────────────┐
│                   LLM API Call                           │
│  • Structured output (JSON mode)                         │
│  • Component composition intelligence                    │
│  • Returns component tree as JSON                        │
└────────────────┬─────────────────────────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────────────────────────┐
│              Validation Harness                          │
│  • Schema validation (structure check)                   │
│  • Primitive whitelist check                             │
│  • Props validation per primitive                        │
│  • Semantic rules enforcement                            │
│  • Auto-retry on failure                                 │
└────────────────┬─────────────────────────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────────────────────────┐
│                 Component Parser                         │
│  • JSON → React components                               │
│  • Deterministic rendering                               │
│  • Type-safe prop mapping                                │
└────────────────┬─────────────────────────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────────────────────────┐
│                  Live Preview                            │
└──────────────────────────────────────────────────────────┘
```

---

## Component JSON Schema

### Base Structure

```json
{
  "component": "ComponentName",
  "metadata": {
    "style": ["modern", "minimal"],
    "features": ["logo", "links"],
    "description": "A clean navigation bar"
  },
  "tree": {
    "primitive": "Layout",
    "props": {
      "direction": "row",
      "justify": "space-between",
      "align": "center",
      "padding": "4"
    },
    "children": [
      {
        "primitive": "Logo",
        "props": {
          "size": "md"
        }
      },
      {
        "primitive": "Layout",
        "props": {
          "direction": "row",
          "gap": "6"
        },
        "children": [
          {
            "primitive": "Link",
            "props": {
              "text": "Home",
              "href": "/",
              "variant": "ghost"
            }
          },
          {
            "primitive": "Link",
            "props": {
              "text": "About",
              "href": "/about",
              "variant": "ghost"
            }
          }
        ]
      }
    ]
  }
}
```

### Schema Definition

```typescript
interface ComponentOutput {
  component: string;           // Component name (e.g., "Navbar", "Hero")
  metadata: {
    style: string[];           // Style keywords applied
    features: string[];        // Features included
    description: string;       // Brief description
  };
  tree: ComponentNode;         // Root node of component tree
}

interface ComponentNode {
  primitive: string;           // Must be from allowed primitives
  props: Record<string, any>;  // Props validated per primitive
  children?: ComponentNode[];  // Optional nested children
  text?: string;               // Optional text content (for Text primitive)
}
```

---

## Primitive Library

### Layout Primitives

**Layout** - Flexbox container
```typescript
{
  direction: "row" | "column"
  justify: "start" | "center" | "end" | "space-between" | "space-around"
  align: "start" | "center" | "end" | "stretch"
  gap: "0" | "1" | "2" | "3" | "4" | "6" | "8" | "12"
  padding: "0" | "2" | "4" | "6" | "8" | "12"
  wrap: boolean
  fullWidth: boolean
}
```

**Grid** - Grid container
```typescript
{
  columns: "1" | "2" | "3" | "4" | "auto-fit"
  gap: "0" | "1" | "2" | "4" | "6" | "8"
  padding: "0" | "2" | "4" | "6" | "8"
}
```

**Container** - Max-width centered container
```typescript
{
  size: "sm" | "md" | "lg" | "xl" | "full"
  padding: "0" | "4" | "6" | "8"
}
```

**Spacer** - Vertical or horizontal spacing
```typescript
{
  size: "1" | "2" | "4" | "6" | "8" | "12" | "16"
  direction: "vertical" | "horizontal"
}
```

### Content Primitives

**Text** - Typography
```typescript
{
  size: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl"
  weight: "normal" | "medium" | "semibold" | "bold"
  color: "default" | "muted" | "accent" | "success" | "warning" | "error"
  align: "left" | "center" | "right"
  text: string
}
```

**Heading** - Semantic headings
```typescript
{
  level: "1" | "2" | "3" | "4" | "5" | "6"
  size: "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl"
  weight: "normal" | "medium" | "semibold" | "bold"
  text: string
}
```

**Paragraph** - Body text
```typescript
{
  size: "sm" | "base" | "lg"
  color: "default" | "muted"
  text: string
}
```

### Interactive Primitives

**Button** - Clickable button
```typescript
{
  variant: "primary" | "secondary" | "ghost" | "outline" | "danger"
  size: "sm" | "md" | "lg"
  text: string
  icon?: string  // Icon name
  iconPosition?: "left" | "right"
  fullWidth?: boolean
}
```

**Link** - Navigation link
```typescript
{
  text: string
  href: string
  variant: "default" | "ghost" | "underline"
  external?: boolean
  icon?: string
}
```

**Input** - Text input field
```typescript
{
  type: "text" | "email" | "password" | "search" | "number"
  placeholder: string
  label?: string
  size: "sm" | "md" | "lg"
  fullWidth?: boolean
  required?: boolean
}
```

### Visual Primitives

**Card** - Content container
```typescript
{
  padding: "2" | "4" | "6" | "8"
  shadow: "none" | "sm" | "md" | "lg"
  border: boolean
  rounded: "none" | "sm" | "md" | "lg"
  hover?: boolean  // Hover effect
}
```

**Divider** - Separator line
```typescript
{
  orientation: "horizontal" | "vertical"
  spacing: "2" | "4" | "6" | "8"
}
```

**Image** - Image element
```typescript
{
  src: string
  alt: string
  width?: string
  height?: string
  rounded: "none" | "sm" | "md" | "lg" | "full"
  objectFit: "cover" | "contain" | "fill"
}
```

**Icon** - Icon element
```typescript
{
  name: string  // Icon identifier
  size: "sm" | "md" | "lg" | "xl"
  color: "default" | "muted" | "accent" | "success" | "warning" | "error"
}
```

**Badge** - Small label/tag
```typescript
{
  text: string
  variant: "default" | "success" | "warning" | "error" | "info"
  size: "sm" | "md"
}
```

### Special Primitives

**Logo** - Site logo
```typescript
{
  size: "sm" | "md" | "lg"
  variant?: "light" | "dark"
}
```

**CodeBlock** - Code display
```typescript
{
  language: string
  code: string
  showLineNumbers?: boolean
}
```

**List** - Ordered/unordered list
```typescript
{
  type: "ordered" | "unordered"
  items: string[]
  spacing: "tight" | "normal" | "relaxed"
}
```

---

## Control Language Syntax

### For LLM Prompt

```
<CONTEXT>
  component_type: "{type}"
  style_keywords: [{styles}]
  required_features: [{features}]
  optional_features: [{optional_features}]
</CONTEXT>

<PRIMITIVES>
  Layout, Grid, Container, Spacer,
  Text, Heading, Paragraph,
  Button, Link, Input,
  Card, Divider, Image, Icon, Badge,
  Logo, CodeBlock, List
</PRIMITIVES>

<MUST>
  - Output valid JSON matching ComponentOutput schema
  - Use ONLY primitives from PRIMITIVES list
  - Include ALL required_features
  - Props must match primitive's prop schema exactly
  - Create hierarchical composition using children
  - Use semantic primitive choices (e.g., Heading for titles, not Text)
  - Maintain visual hierarchy through size/weight props
</MUST>

<FORBIDDEN>
  - Raw HTML elements (div, span, p, etc.)
  - Custom CSS or style attributes
  - Primitives not in PRIMITIVES list
  - Props not defined in primitive schema
  - Inline styles or className
  - Arbitrary prop names
</FORBIDDEN>

<STYLE_GUIDELINES>
  modern: clean lines, ample spacing, subtle shadows
  minimal: maximum whitespace, few elements, monochromatic
  bold: strong colors, large text, high contrast
  playful: rounded corners, bright colors, varied sizes
  professional: balanced layout, muted colors, clear hierarchy
</STYLE_GUIDELINES>

<COMPOSITION_PATTERNS>
  Navbar: Layout (row) → Logo + Layout (row) → Links
  Hero: Container → Layout (column) → Heading + Paragraph + Button
  Card Grid: Grid → Card[] with consistent structure
  Form: Layout (column) → Input[] with Labels
  Feature List: Grid → Card[] → Icon + Heading + Text
</COMPOSITION_PATTERNS>
```

---

## Harness Validation Logic

### Validation Steps

1. **Schema Validation**
   - Parse JSON output
   - Verify structure matches ComponentOutput schema
   - Check all required fields present

2. **Primitive Whitelist**
   - Traverse component tree
   - Verify each `primitive` is in allowed list
   - Reject if unknown primitive found

3. **Props Validation**
   - For each node, get primitive type
   - Check props against primitive's prop schema
   - Verify prop values are valid (enums, types)
   - Reject unknown props

4. **Semantic Rules**
   - Required features included
   - Style keywords reflected in choices
   - Appropriate primitive usage (e.g., not all Text)
   - Reasonable nesting depth (< 6 levels)

5. **Composition Quality**
   - Not empty (has children)
   - Logical hierarchy
   - Balanced structure

### Harness Pseudocode

```typescript
async function validateComponent(
  output: any,
  constraints: Constraints
): Promise<ValidationResult> {
  
  // 1. Schema validation
  if (!matchesSchema(output, ComponentOutputSchema)) {
    return { valid: false, error: "Invalid schema" };
  }
  
  // 2. Primitive whitelist
  const allPrimitives = extractPrimitives(output.tree);
  const invalidPrimitives = allPrimitives.filter(
    p => !constraints.allowedPrimitives.includes(p)
  );
  if (invalidPrimitives.length > 0) {
    return { 
      valid: false, 
      error: `Invalid primitives: ${invalidPrimitives}` 
    };
  }
  
  // 3. Props validation
  const invalidProps = validatePropsRecursive(
    output.tree, 
    primitiveSchemas
  );
  if (invalidProps.length > 0) {
    return { 
      valid: false, 
      error: `Invalid props: ${invalidProps}` 
    };
  }
  
  // 4. Required features
  const missingFeatures = constraints.requiredFeatures.filter(
    f => !includesFeature(output.tree, f)
  );
  if (missingFeatures.length > 0) {
    return { 
      valid: false, 
      error: `Missing features: ${missingFeatures}` 
    };
  }
  
  // 5. Quality checks
  if (getNestingDepth(output.tree) > 6) {
    return { valid: false, error: "Nesting too deep" };
  }
  
  return { valid: true };
}

// Auto-retry wrapper
async function generateWithRetry(
  prompt: string, 
  constraints: Constraints,
  maxRetries: number = 3
): Promise<ComponentOutput> {
  
  for (let i = 0; i < maxRetries; i++) {
    const output = await llm.generate(prompt);
    const validation = await validateComponent(output, constraints);
    
    if (validation.valid) {
      return output;
    }
    
    console.log(`Attempt ${i+1} failed: ${validation.error}`);
  }
  
  throw new Error("Failed to generate valid component after retries");
}
```

---

## Component Type Recipes

### Navbar
```
Required Features: logo, navigation links
Primitives: Layout, Logo, Link, Button
Pattern: Horizontal layout with logo left, links right
Common Styles: modern, minimal, transparent
```

### Hero Section
```
Required Features: heading, description, CTA
Primitives: Container, Layout, Heading, Paragraph, Button
Pattern: Centered column layout with stacked elements
Common Styles: bold, modern, gradient
```

### Feature Grid
```
Required Features: multiple features, icons, descriptions
Primitives: Grid, Card, Icon, Heading, Text
Pattern: Grid of cards with icon-title-description
Common Styles: modern, clean, professional
```

### Footer
```
Required Features: links, copyright, social icons
Primitives: Container, Grid, Layout, Link, Text, Icon
Pattern: Multi-column layout with link groups
Common Styles: minimal, dark, professional
```

### Form
```
Required Features: inputs, labels, submit button
Primitives: Layout, Input, Button, Text
Pattern: Vertical stack of labeled inputs + button
Common Styles: clean, modern, accessible
```

### Pricing Cards
```
Required Features: tiers, prices, features, CTA
Primitives: Grid, Card, Heading, Text, List, Button, Badge
Pattern: Grid of cards with structured content
Common Styles: modern, professional, comparison
```

### Testimonial
```
Required Features: quote, author, photo
Primitives: Card, Layout, Image, Text, Heading
Pattern: Card with image + quote + attribution
Common Styles: minimal, elegant, trustworthy
```

---

## Implementation Checklist

### Phase 1: Foundation
- [ ] Define primitive component library (React components)
- [ ] Create TypeScript schemas for primitives
- [ ] Build JSON → Component parser
- [ ] Test parser with hand-written JSON

### Phase 2: Validation Harness
- [ ] Implement schema validator
- [ ] Build primitive whitelist checker
- [ ] Create props validation per primitive
- [ ] Add semantic rules engine
- [ ] Test harness with invalid inputs

### Phase 3: LLM Integration
- [ ] Design control language prompt template
- [ ] Integrate LLM API (structured output mode)
- [ ] Build retry logic with validation
- [ ] Test with single component type

### Phase 4: UI Layer
- [ ] Create component type selector
- [ ] Add style/feature checkboxes
- [ ] Build live preview renderer
- [ ] Add Generate/Next/Keep workflow
- [ ] Show generated JSON (optional debug view)

### Phase 5: Iteration & Polish
- [ ] Add more component type recipes
- [ ] Expand primitive library as needed
- [ ] Improve validation error messages
- [ ] Add component saving/exporting
- [ ] Build component library viewer

---

## Advanced Ideas

### Pattern Learning
- Save successful compositions as named patterns
- LLM can reference patterns: `<Pattern name="IconCard">`
- Build design system over time through usage

### Compositional Complexity
- Allow meta-primitives (compositions of primitives saved as new primitives)
- Enable LLM to create reusable sub-components
- Hierarchical primitive library

### Multi-Component Generation
- Generate entire page layouts (multiple components at once)
- Ensure consistency across components
- Smart spacing and alignment between sections

### Style Transfer
- "Make this component but in [different style]"
- Maintain structure, change aesthetic props
- Learn style → prop mappings

### Responsive Variants
- Generate mobile/tablet/desktop versions
- Different prop values per breakpoint
- Harness ensures consistency across variants

### A/B Testing
- Generate N variants with slight differences
- User picks best, system learns preferences
- Personalized component generation

### Version Control
- Track composition iterations
- Diff between versions
- Roll back to previous compositions

### Export Formats
- JSON (canonical)
- React JSX (code generation)
- Vue/Svelte templates
- HTML + Tailwind classes
- Figma plugin (stretch goal)

---

## Success Metrics

### Quality Metrics
- **Validation Pass Rate**: % of first-attempt generations that pass harness
- **Retry Count**: Average number of retries needed
- **User Acceptance Rate**: % of generated components kept vs. regenerated

### Efficiency Metrics
- **Generation Speed**: Time from request to valid output
- **Primitive Coverage**: % of primitives actively used
- **Pattern Reuse**: How often compositions repeat (good = design consistency)

### System Metrics
- **LLM Cost**: API costs per component generation
- **Token Usage**: Average tokens per generation
- **Error Rate**: % of complete failures (even after retries)

---

## Next Steps

1. **Start Small**: Build with 5-8 core primitives (Layout, Text, Button, Card, etc.)
2. **Single Component Type**: Perfect Navbar generation first
3. **Validate Harness**: Ensure 95%+ pass rate before expanding
4. **Iterate Primitives**: Add more based on what LLM struggles with
5. **Scale Up**: Add more component types once foundation is solid

The key is to keep the primitive set tight and well-defined. Better to have 10 perfectly specified primitives than 50 fuzzy ones.

---

## Final Thoughts

This system works because:
- **LLM strengths**: Creative composition, understanding design intent
- **LLM weaknesses**: Covered by harness (syntax, consistency, valid APIs)
- **Deterministic output**: JSON → React is predictable
- **Constrained creativity**: Like writing poetry with specific meter/rhyme

The control language + harness transforms the LLM from "code generator" to "intelligent composition API" - which is exactly what you want for a design system tool.

Build it. Ship it. See what happens. 🚀