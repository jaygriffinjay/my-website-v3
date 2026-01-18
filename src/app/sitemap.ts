import { getAllPosts, getAllDocs } from '@/lib/posts';

export default async function sitemap() {
  const posts = await getAllPosts();
  const docs = await getAllDocs();
  
  const baseUrl = 'https://jaygriff.com';
  
  // Generate URLs for all posts
  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.metadata.slug}`,
    lastModified: post.metadata.updated ?? post.metadata.date,
  }));

  // Generate URLs for all docs
  const docUrls = docs.map((doc) => ({
    url: `${baseUrl}/docs/${doc.metadata.slug}`,
    lastModified: doc.metadata.updated ?? doc.metadata.date,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...postUrls,
    ...docUrls,
  ];
}
