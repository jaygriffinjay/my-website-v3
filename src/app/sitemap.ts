import { getAllPosts } from '@/lib/posts';

export default async function sitemap() {
  const posts = await getAllPosts();
  
  const baseUrl = 'https://jaygriff.com';
  
  // Generate URLs for all posts
  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.metadata.slug}`,
    lastModified: post.metadata.updated ?? post.metadata.date,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...postUrls,
  ];
}
