// Server-side utility to discover all posts and their metadata
import fs from 'fs';
import path from 'path';
import type { PostMeta, Post } from '@/types/post';
import { parseMarkdownWithJsonFrontmatter } from './md-json-parser';

export async function getAllPosts(): Promise<Post[]> {
  const tsxDirectory = path.join(process.cwd(), 'content/tsx');
  const mdDirectory = path.join(process.cwd(), 'content/md');
  
  // Get TSX posts
  const tsxFilenames = fs.readdirSync(tsxDirectory);
  const tsxPosts = await Promise.all(
    tsxFilenames
      .filter((filename) => filename.endsWith('.tsx'))
      .map(async (filename) => {
        const module = await import(`@content/tsx/${filename.replace('.tsx', '')}`);
        return {
          filename: filename.replace('.tsx', ''),
          metadata: module.metadata as PostMeta,
        };
      })
  );
  
  // Get MD posts
  const mdFilenames = fs.readdirSync(mdDirectory);
  const mdPosts = mdFilenames
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => {
      const filePath = path.join(mdDirectory, filename);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      try {
        const { metadata } = parseMarkdownWithJsonFrontmatter(fileContent);
        return {
          filename: filename.replace('.md', ''),
          metadata,
        };
      } catch (error) {
        // Skip MD files without valid JSON frontmatter
        console.warn(`Skipping ${filename}: missing or invalid JSON frontmatter`);
        return null;
      }
    })
    .filter((post): post is { filename: string; metadata: PostMeta } => post !== null);
  
  // Combine and dedupe (TSX takes priority)
  const tsxSlugs = new Set(tsxPosts.map(p => p.metadata.slug));
  const uniqueMdPosts = mdPosts.filter(p => !tsxSlugs.has(p.metadata.slug));
  const allPosts = [...tsxPosts, ...uniqueMdPosts];
  
  // Filter to only return actual posts (not docs)
  return allPosts.filter((p) => !p.metadata.type || p.metadata.type === 'post');
}

export async function getAllDocs(): Promise<Post[]> {
  const tsxDirectory = path.join(process.cwd(), 'content/tsx');
  const mdDirectory = path.join(process.cwd(), 'content/md');
  
  // Get TSX docs
  const tsxFilenames = fs.readdirSync(tsxDirectory);
  const tsxDocs = await Promise.all(
    tsxFilenames
      .filter((filename) => filename.endsWith('.tsx'))
      .map(async (filename) => {
        const module = await import(`@content/tsx/${filename.replace('.tsx', '')}`);
        return {
          filename: filename.replace('.tsx', ''),
          metadata: module.metadata as PostMeta,
        };
      })
  );
  
  // Get MD docs
  const mdFilenames = fs.readdirSync(mdDirectory);
  const mdDocs = mdFilenames
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => {
      const filePath = path.join(mdDirectory, filename);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      try {
        const { metadata } = parseMarkdownWithJsonFrontmatter(fileContent);
        return {
          filename: filename.replace('.md', ''),
          metadata,
        };
      } catch (error) {
        // Skip MD files without valid JSON frontmatter
        console.warn(`Skipping ${filename}: missing or invalid JSON frontmatter`);
        return null;
      }
    })
    .filter((doc): doc is { filename: string; metadata: PostMeta } => doc !== null);
  
  // Combine and dedupe (TSX takes priority)
  const tsxSlugs = new Set(tsxDocs.map(d => d.metadata.slug));
  const uniqueMdDocs = mdDocs.filter(d => !tsxSlugs.has(d.metadata.slug));
  const allDocs = [...tsxDocs, ...uniqueMdDocs];
  
  // Filter to only return docs (including doc:commit, doc:* variants)
  return allDocs.filter((d) => d.metadata.type?.startsWith('doc'));
}

export async function getPostBySlug(slug: string): Promise<string | null> {
  const posts = await getAllPosts();
  const post = posts.find((p) => p.metadata.slug === slug);
  return post ? post.filename : null;
}

export async function getDocBySlug(slug: string): Promise<string | null> {
  const docs = await getAllDocs();
  const doc = docs.find((d) => d.metadata.slug === slug);
  return doc ? doc.filename : null;
}

export async function getAllAppRoutes(): Promise<Post[]> {
  const appDir = path.join(process.cwd(), 'src/app');
  const routes: Post[] = [];

  // Recursively find all page.tsx files
  function findPageFiles(dir: string, basePath = ''): string[] {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const pages: string[] = [];

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = basePath ? `${basePath}/${entry.name}` : entry.name;

      if (entry.isDirectory()) {
        // Skip dynamic routes (containing [])
        if (entry.name.includes('[')) continue;
        // Recursively scan subdirectories
        pages.push(...findPageFiles(fullPath, relativePath));
      } else if (entry.name === 'page.tsx') {
        pages.push(relativePath);
      }
    }

    return pages;
  }

  const pageFiles = findPageFiles(appDir);

  // Import each page and check for routeMetadata
  for (const pagePath of pageFiles) {
    try {
      const fullFilePath = path.join(appDir, pagePath);
      const fileContent = fs.readFileSync(fullFilePath, 'utf-8');
      
      // Skip client components - they can't be imported server-side
      const isClientComponent = fileContent.trimStart().startsWith("'use client'") || 
                               fileContent.trimStart().startsWith('"use client"');
      if (isClientComponent) continue;
      
      // Convert path to URL path: "metadata-scanner/page.tsx" -> "/metadata-scanner"
      const urlPath = '/' + pagePath.replace('/page.tsx', '').replace('page.tsx', '');
      
      // Convert to module specifier: "metadata-scanner/page.tsx" -> "@/app/metadata-scanner/page"
      const importPath = `@/app/${pagePath.replace('.tsx', '')}`;
      const module = await import(importPath);

      // Check for routeMetadata export
      if (module.routeMetadata) {
        routes.push({
          filename: pagePath,
          metadata: {
            ...module.routeMetadata,
            // Ensure path is set
            path: urlPath === '/' ? '/' : urlPath,
          } as PostMeta,
        });
      }
    } catch (error) {
      // Skip files that fail to import or don't have routeMetadata
      console.warn(`Skipping ${pagePath}: ${error}`);
    }
  }

  return routes;
}
