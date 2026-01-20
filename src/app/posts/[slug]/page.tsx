import { notFound } from "next/navigation";
import { Container } from "@/components/Primitives";
import { ContentHeader } from "@/components/ContentHeader";
import { ContentWrapper } from "@/components/ContentWrapper";
import RelatedPosts from "@/components/RelatedPosts";
import { loadContentBySlug, getAllPostSlugs } from "@/lib/content-loader";
import { getAllPosts } from "@/lib/posts";

// Pre-render all posts at build time
export async function generateStaticParams() {
  return await getAllPostSlugs();
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = await loadContentBySlug(slug, 'post');

  if (!content) {
    notFound();
  }

  const { Component: PostComponent, metadata } = content;
  const allPosts = await getAllPosts();

  return (
    <Container size="sm">
      <article>
        <ContentHeader metadata={metadata} />
        <ContentWrapper>
          <PostComponent />
        </ContentWrapper>
        {metadata.relatedPosts && metadata.relatedPosts.length > 0 && (
          <RelatedPosts slugs={metadata.relatedPosts} allPosts={allPosts} />
        )}
      </article>
    </Container>
  );
}
