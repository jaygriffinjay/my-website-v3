import { notFound } from "next/navigation";
import { Container } from "@/components/Primitives";
import { ContentHeader } from "@/components/ContentHeader";
import { ContentWrapper } from "@/components/ContentWrapper";
import { loadContentBySlug, getAllPostSlugs } from "@/lib/content-loader";

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

  return (
    <Container size="sm">
      <article>
        <ContentHeader metadata={metadata} />
        <ContentWrapper>
          <PostComponent />
        </ContentWrapper>
      </article>
    </Container>
  );
}
