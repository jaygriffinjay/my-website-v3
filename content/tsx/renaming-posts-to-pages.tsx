import { Heading, Text, Code, ListItem, List } from '@/components/Primitives';
import { CodeBlock } from '@/components/CodeBlock/CodeBlock';

export const metadata = {
  title: 'Renaming src/posts/ to src/pages/',
  slug: 'renaming-posts-to-pages',
  description: 'Comprehensive analysis of all code changes required to rename the content directory from src/posts/ to src/pages/',
  date: '2026-01-17T23:00:00Z',
  author: 'Claude Sonnet 4.5',
  type: 'doc',
};

export default function RenamingPostsToPages() {
  return (
    <div>
      <Text>
        The directory <Code>src/posts/</Code> currently contains all content files (both posts and docs), 
        which creates semantic confusion. This document outlines all code changes required to rename it to <Code>src/pages/</Code>.
      </Text>

      <Heading level={2}>Why This Change?</Heading>
      <Text>
        The term "posts" implies blog posts, but the directory actually contains:
      </Text>
      <List>
        <ListItem>Blog posts (type: 'post')</ListItem>
        <ListItem>Documentation (type: 'doc')</ListItem>
        <ListItem>Commit documentation (type: 'doc:commit')</ListItem>
      </List>
      <Text>
        Renaming to <Code>src/pages/</Code> better represents that this directory contains all content pages, 
        regardless of type. This also aligns with the fact that we filter by the <Code>type</Code> metadata field, 
        not by directory location.
      </Text>

      <Heading level={2}>Impact Analysis</Heading>

      <Heading level={3}>Critical Code Changes (5 locations)</Heading>
      <Text>
        These are the actual code files that reference the directory and must be updated:
      </Text>

      <Heading level={4}>1. src/lib/posts.ts (4 changes)</Heading>
      <Text>File: <Code>src/lib/posts.ts</Code></Text>
      
      <br />

      <Text><strong>Change 1 - Line 7 (getAllPosts function):</strong></Text>
      <Text>
        <Code>const postsDirectory = path.join(process.cwd(), 'src/posts');</Code>
      </Text>
      <Text>
        → <Code>const postsDirectory = path.join(process.cwd(), 'src/pages');</Code>
      </Text>

      <br />

      <Text><strong>Change 2 - Line 16 (dynamic import):</strong></Text>
      <Text>
        <Code>const module = await import(`@/posts/$&#123;filename.replace('.tsx', '')&#125;`);</Code>
      </Text>
      <Text>
        → <Code>const module = await import(`@/pages/$&#123;filename.replace('.tsx', '')&#125;`);</Code>
      </Text>

      <br />

      <Text><strong>Change 3 - Line 30 (getAllDocs function):</strong></Text>
      <Text>
        <Code>const postsDirectory = path.join(process.cwd(), 'src/posts');</Code>
      </Text>
      <Text>
        → <Code>const postsDirectory = path.join(process.cwd(), 'src/pages');</Code>
      </Text>

      <br />

      <Text><strong>Change 4 - Line 39 (dynamic import):</strong></Text>
      <Text>
        <Code>const module = await import(`@/posts/$&#123;filename.replace('.tsx', '')&#125;`);</Code>
      </Text>
      <Text>
        → <Code>const module = await import(`@/pages/$&#123;filename.replace('.tsx', '')&#125;`);</Code>
      </Text>

      <br />

      <Heading level={4}>2. src/app/posts/[slug]/page.tsx (1 change)</Heading>
      <Text>File: <Code>src/app/posts/[slug]/page.tsx</Code></Text>
      
      <Text><strong>Line 32 (dynamic import):</strong></Text>
      <Text>
        <Code>const postModule = await import(`@/posts/$&#123;filename&#125;`);</Code>
      </Text>
      <Text>
        → <Code>const postModule = await import(`@/pages/$&#123;filename&#125;`);</Code>
      </Text>

      <Heading level={4}>3. src/app/docs/[slug]/page.tsx (1 change)</Heading>
      <Text>File: <Code>src/app/docs/[slug]/page.tsx</Code></Text>
      
      <Text><strong>Line 32 (dynamic import):</strong></Text>
      <Text>
        <Code>const docModule = await import(`@/posts/$&#123;filename&#125;`);</Code>
      </Text>
      <Text>
        → <Code>const docModule = await import(`@/pages/$&#123;filename&#125;`);</Code>
      </Text>

      <Heading level={4}>4. tsconfig.json - Path Alias (Optional)</Heading>
      <Text>File: <Code>tsconfig.json</Code></Text>
      
      <Text>
        Currently, the path alias <Code>@/*</Code> maps to <Code>./src/*</Code>, which means <Code>@/posts/</Code> 
        automatically resolves to <Code>./src/posts/</Code>. When we rename the directory to <Code>src/pages/</Code>, 
        the imports <Code>@/pages/</Code> will automatically work.
      </Text>
      
      <Text>
        <strong>No change required</strong> - the existing <Code>@/*</Code> alias will handle it.
      </Text>

      <Heading level={3}>Documentation Updates</Heading>
      <Text>
        These content files contain references to <Code>src/posts/</Code> in their prose/documentation. 
        They should be updated for accuracy but won't break functionality if missed:
      </Text>

      <List>
        <ListItem><Code>src/posts/site-summary.tsx</Code> - 2 mentions in explanatory text</ListItem>
        <ListItem><Code>src/posts/docs-routing.tsx</Code> - 6 mentions in documentation and code examples</ListItem>
        <ListItem><Code>src/posts/commit-content-system-refactor.tsx</Code> - 5 file path references in lists</ListItem>
        <ListItem><Code>.github/copilot-instructions.md</Code> - Directory structure mention</ListItem>
      </List>

      <Text>
        All of these are just text in documentation files and won't affect functionality.
      </Text>

      <Heading level={2}>URL Routes Unaffected</Heading>
      <Text>
        The URL structure (<Code>/posts/[slug]</Code> and <Code>/docs/[slug]</Code>) is determined by the 
        directory structure in <Code>src/app/</Code>, not by the content directory name. Renaming 
        <Code>src/posts/</Code> to <Code>src/pages/</Code> will <strong>not affect URLs</strong>.
      </Text>

      <Heading level={2}>Implementation Steps</Heading>
      <Text>Recommended order of operations:</Text>
      <List>
        <ListItem>1. Update the 5 critical code files first (src/lib/posts.ts, both route handlers)</ListItem>
        <ListItem>2. Rename the directory: <Code>mv src/posts src/pages</Code></ListItem>
        <ListItem>3. Test the application to ensure all routes work</ListItem>
        <ListItem>4. Update documentation files at leisure (cosmetic only)</ListItem>
        <ListItem>5. Commit the changes</ListItem>
      </List>

      <Heading level={2}>Risk Assessment</Heading>
      <Text>
        <strong>Risk Level: Low</strong>
      </Text>
      <br />
      <Text>
        This is a straightforward refactor with:
      </Text>
      <List>
        <ListItem>Only 5 critical code changes needed</ListItem>
        <ListItem>No TypeScript interface changes</ListItem>
        <ListItem>No URL structure changes</ListItem>
        <ListItem>Easy to test (if routes work, the change is successful)</ListItem>
        <ListItem>Easy to rollback if needed (just rename the directory back)</ListItem>
      </List>

      <Heading level={2}>Summary</Heading>
      <Text>
        Renaming <Code>src/posts/</Code> to <Code>src/pages/</Code> requires updating 5 critical import/path 
        references in 3 files. All other mentions are documentation only. The change eliminates semantic 
        confusion and better represents the directory's purpose as a container for all content types.
      </Text>
    </div>
  );
}
