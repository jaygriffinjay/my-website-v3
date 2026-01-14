# Why My Blog Posts Are Programs, Not Documents

## Markdown Sounds Really Good

I wanted what sounded like a really good idea: a clean separation of content and code. A pristine folder full of markdown files with all my writing in one place. Simple, portable, version-controlled text that could live anywhere.

The promise was beautiful: write in markdown, commit, deploy. No dependencies, no complexity, just pure content.

But I have markdown prejudice. And for good reason.

## The Reality: My Content Does Stuff

Here's what I actually want to publish:

- Interactive games and simulations
- Live data visualizations and dashboards
- Custom UI components and demos
- Programs that people can experience, not just read about

I'm not Stephen King at a typewriter. I'm a programmer who publishes programs. Writing *about* my programs often requires programs to describe those programs.

## The Failed Separation Attempts

### Attempt 1: Separate Posts Repo

"I'll keep all my posts in their own repo! Clean separation!"

But then my TSX posts need:

- My component library
- My theme system
- Shared utilities
- The whole stack

The "posts repo" became a full application repo. Not content - a codebase.

### Attempt 2: Maybe a CMS?

"What about Strapi or another headless CMS?"

Sure, if my posts were:

```
Title: "My Post"
Body: "Some text here..."
Image: "hero.jpg"
```

But my posts are actually:

```tsx
export default function Post() {
  // 300 lines of custom logic
  // Interactive visualizations
  // some normal text content
  // custom components that depend on my theme system code
  return <ComplexInteractiveThing />
}
```

You can't store React components with custom logic in a database. CMSs want structured data. I want executable code.

### Attempt 3: Hybrid Approach

"What if I keep text in a CMS but components in code?"

Now I'm doing some weird mapping:

```tsx
// Which component does this post need?
{data.componentName === 'FlappyBird' && <FlappyBird />}
{data.componentName === 'Dashboard' && <Dashboard />}
```

This would result in fighting the system constantly. It would lose the whole point of TSX: code and content together with maximum flexibility.

## Accepting Reality

My posts aren't portable. They're tightly coupled to:

- React and TypeScript
- My component library
- My theme/styling system (emotion/CSS-in-JS)
- Specific dependencies

**This isn't a bug. It's the feature.**

I chose power over simplicity. The ability to build whatever I want instead of being limited to paragraphs and images.

## The Actual Structure

One repo. Everything together. Honest about what it is.

```
my-blog/
├── app/              # Next.js routes
├── posts/            # the "content"
│   ├── simple-post.tsx
│   ├── complex-game/
│   │   ├── index.tsx
│   │   ├── game-logic/
│   │   └── assets/
│   └── data-viz/
│       └── index.tsx
├── components/       # shared across posts
├── theme/           # design system
└── types/
    └── post.ts      # metadata interface
```

Each "post" is either:

- **Simple**: one `.tsx` file with some content
- **Complex**: a whole directory containing a program

Posts export metadata:

```tsx
export const meta: PostMeta = {
  title: "My Post",
  slug: "my-post",
  date: "2024-01-15T14:30:00Z",
  description: "Description here",
  projectId: "my-app",
  topics: ["react", "games"]
}

export default function Post() {
  return <article>...</article>
}
```

## The Tradeoffs

**What I lost:**

- Clean content/code separation
- Easy automation (can't process all posts the same)
- The markdown simplicity dream
- Portability

**What I gained:**

- Full creative freedom
- Interactive, living content
- Programs that do stuff
- Unlimited possibilities

## Why This Works For Me

I'm not managing a team. I'm not enabling non-technical editors. I'm not trying to build a generic blogging platform.

I'm a solo developer who wants to publish interactive programs on the web. I want those interactive programs because sometimes they can help communicate ideas much clearer than words can.

## Conclusion

If you're building a traditional blog, use markdown. It's great for that.

But I like stuff that does stuff. So a lot of my writing is done in the context of a program even if I just want to post text.