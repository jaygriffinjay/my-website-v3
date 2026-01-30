---json
{
  "title": "Feature Spec: Project Launchpad System",
  "slug": "project-launchpad-spec",
  "date": "2026-01-30T00:00:00Z",
  "author": ["Jay Griffin", "Claude Sonnet 4.5"],
  "authorshipNote": "🤖 AI Generated",
  "type": "doc",
  "description": "Frictionless system for showcasing development projects - make adding new projects feel as easy as publishing a blog post",
  "tags": ["feature-spec", "projects", "portfolio", "ux", "content-system", "showcase"]
}
---

# Feature Spec: Project Launchpad System

## Overview
A frictionless system for showcasing development projects on jaygriff.com that makes adding new projects feel as easy and rewarding as publishing a new blog post.

## Goals
- Make adding a project take ~10 minutes, not 2 hours
- Support both major projects (5 main repos) and experimental side projects (50+ smaller repos)
- Create a "can't wait to show this off" feeling when shipping new work
## User Stories

### As Jay, I want to...
- Quickly add a new project with minimal friction
- Showcase my best work prominently
- Archive smaller experiments without them cluttering the main showcase
- Update project info easily if repos evolve

### As a site visitor, I want to...
- See Jay's technical capabilities at a glance
- Understand what each project does and why it matters
- Access live demos and source code easily
- Filter/browse between major projects and experiments

## Core Features

### 1. Project Data Model
Minimal required fields for quick entry:
```
- title (string)
- description (string, 2-3 sentences)
- repo_url (string)
- tech_stack (array of strings)
- thumbnail (image path)
- status (enum: "major" | "experiment" | "archived")
- created_date (date)
- demo_url (optional string)
- blog_post_url (optional string - link to related writing)
```

### 2. Two-Tier Display System

**Projects Showcase (Major Projects)**
- Dedicated `/projects` route
- Card-based grid layout
- Shows only `status: "major"` projects
- Prominent display with thumbnails, descriptions, tech stack badges
- Clear CTAs: "View Code" | "Live Demo" | "Read About It"

**Experiments Archive**
- `/experiments` route or expandable section
- Simpler list/table view
- Shows `status: "experiment"` projects
- Less detailed, optimized for browsing many items
- Quick add feature: "Yeah I built this, here's the repo"

### 3. Quick-Add Workflow

**Ideal flow for adding a project:**
1. Create new markdown file in `/content/projects/` directory
2. Fill out frontmatter template (pre-populated with all fields)
3. Write 2-3 sentence description (AI-assisted option available)
4. Add thumbnail image to `/public/thumbnails/projects/`
5. Save → auto-generates project card

**Template Example:**
```markdown
---
title: "Project Name"
description: "What it does and why it's cool"
repo_url: "https://github.com/jaygriff/repo"
tech_stack: ["React", "TypeScript", "Node.js"]
thumbnail: "/thumbnails/projects/project-name.png"
status: "major"
created_date: "2025-01-15"
demo_url: "https://demo.example.com"
blog_post_url: "/posts/building-project-name"
---

## Extended Description (Optional)
Additional details, architecture notes, lessons learned, etc.
Can be as short or long as needed.
```

### 4. AI-Assisted Descriptions
- Script/tool to generate initial descriptions from GitHub README
- I edit/refine output to match his voice
- Speeds up migration of existing 50+ repos

### 5. Homepage Integration
- "Featured Projects" section showing 3-4 major projects
- Clear link to full projects page
- Demonstrates technical skills immediately for visitors

## Implementation Phases

### Phase 1: MVP for Launch (Priority)
- [ ] Create project data model and frontmatter schema
- [ ] Build `/projects` page with card grid layout
- [ ] Implement project card component with thumbnail support
- [ ] Add 5 main repos manually using template
- [ ] Add "Projects" link to main navigation
- [ ] Create "Featured Projects" section on homepage

### Phase 2: Quality of Life (Post-Launch)
- [ ] Build `/experiments` page for smaller projects
- [ ] Create AI-assisted description generator script
- [ ] Add filtering by tech stack
- [ ] Implement search across projects
- [ ] Add project tags/categories

### Phase 3: Advanced Features (Future)
- [ ] In-browser project submission form (no file editing needed)
- [ ] Embedded demos/screenshots
- [ ] GitHub stats integration (stars, last updated, etc.)
- [ ] Related blog posts auto-linking

## Success Metrics
- Time to add new project: < 15 minutes
- All 5 major projects documented before full launch
- At least 10 experiments added within first month post-launch
- Positive feedback from visitors on projects page clarity

## Design Considerations

### Visual Hierarchy
- Major projects: Large cards, prominent thumbnails, detailed info
- Experiments: Compact rows, smaller thumbnails, essential info only

### Mobile Responsiveness
- Card grid should stack nicely on mobile
- Thumbnails should scale appropriately
- Tech stack badges should wrap cleanly

### Tech Stack Badges
- Standardized styling (consider using shields.io style)
- Color coding by category (languages, frameworks, tools)
- Clickable to filter by tech (Phase 2)

## Technical Notes
- Leverage existing content management system
- Projects should be markdown files like blog posts for consistency
- Static generation for performance
- Image optimization for thumbnails

## Open Questions
- Should archived projects be hidden by default or always visible?
- Do we need version/update history for projects?
- Should there be a "currently working on" status?
- Integration with GitHub API for live stats?
