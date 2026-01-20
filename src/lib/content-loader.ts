// Server-side utility to load individual content by slug
import { getAllPosts, getAllDocs } from './posts';
import type { PostMeta } from '@/types/post';

export type ContentType = 'post' | 'doc';

export interface LoadedContent {
  Component: React.ComponentType;
  metadata: PostMeta;
  filename: string;
}

export async function loadContentBySlug(
  slug: string,
  type: ContentType
): Promise<LoadedContent | null> {
  // Get all content of the requested type
  const allContent = type === 'post' ? await getAllPosts() : await getAllDocs();
  
  // Find the content matching the slug
  const content = allContent.find((item) => item.metadata.slug === slug);
  
  if (!content) {
    return null;
  }
  
  // Dynamically import the TSX file to get the component
  const module = await import(`@content/tsx/${content.filename}`);
  
  return {
    Component: module.default,
    metadata: module.metadata,
    filename: content.filename,
  };
}

// Static generation helpers for build-time pre-rendering
export async function getAllPostSlugs() {
  const posts = await getAllPosts();
  return posts.map(post => ({ slug: post.metadata.slug }));
}

export async function getAllDocSlugs() {
  const docs = await getAllDocs();
  return docs.map(doc => ({ slug: doc.metadata.slug }));
}
