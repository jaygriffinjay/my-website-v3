// Server-side utility to discover all posts and their metadata
import fs from 'fs';
import path from 'path';
import type { PostMeta, Post } from '@/types/post';

export async function getAllPosts(): Promise<Post[]> {
  const postsDirectory = path.join(process.cwd(), 'src/posts');
  const filenames = fs.readdirSync(postsDirectory);
  
  const posts = await Promise.all(
    filenames
      .filter((filename) => filename.endsWith('.tsx'))
      .map(async (filename) => {
        // Dynamically import the post file to get its metadata
        const filePath = path.join(postsDirectory, filename);
        const module = await import(`@/posts/${filename.replace('.tsx', '')}`);
        
        return {
          filename: filename.replace('.tsx', ''),
          metadata: module.metadata as PostMeta,
        };
      })
  );
  
  return posts;
}

export async function getPostBySlug(slug: string): Promise<string | null> {
  const posts = await getAllPosts();
  const post = posts.find((p) => p.metadata.slug === slug);
  return post ? post.filename : null;
}
