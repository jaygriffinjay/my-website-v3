import { Heading, Paragraph } from '@/components/Primitives';
import type { PostMeta } from '@/types/post';
import { formatPostDate } from '@/lib/date';

export const metadata: PostMeta = {
  title: 'Dynamic Routes in Next.js',
  slug: 'dynamic-routes-nextjs',
  date: '2026-01-13T21:32:55Z',
  description:
    'A summary of implementing dynamic routes for posts, improving the homepage layout, and ensuring Next.js compatibility.',
  topics: ['Next.js', 'Dynamic Routes', 'Web Development'],
  tags: ['nextjs', 'routing', 'typescript'],
};

const DynamicRoutesPost = () => {
  return (
    <article>
      <Heading level={1}>Dynamic Routes in Next.js</Heading>
      <Paragraph>{formatPostDate(metadata.date)}</Paragraph>
      <Paragraph>
        Over the course of development, we implemented dynamic routes for posts,
        improved the homepage layout, and ensured compatibility with Next.js best
        practices. We also removed unused metadata fields and added styling to
        enhance the user experience.
      </Paragraph>
      <Paragraph>
        The homepage now dynamically renders posts in a clean, scrollable layout,
        with each post displaying its title and date. We also ensured that the
        codebase remains modular and easy to maintain.
      </Paragraph>
      <Paragraph>
        This post serves as a summary of the work completed and highlights the
        improvements made to the site.
      </Paragraph>
    </article>
  );
};

export default DynamicRoutesPost;