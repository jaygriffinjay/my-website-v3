"use client";

import { notFound, redirect } from "next/navigation";
import { use, useState, useEffect } from "react";
import { Container } from "@/components/Primitives";
import { ContentHeader } from "@/components/ContentHeader";
import type { PostMeta } from "@/types/post";

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [DocComponent, setDocComponent] = useState<any>(null);
  const [metadata, setMetadata] = useState<PostMeta | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDoc = async () => {
      try {
        // Fetch the filename for this slug from an API route
        const response = await fetch(`/api/docs/${slug}`);
        if (!response.ok) {
          setLoading(false);
          return;
        }
        
        const { filename } = await response.json();
        
        // Dynamically import the doc using the filename
        const docModule = await import(`@content/tsx/${filename}`);
        
        // Check if this is a commit doc and redirect to /docs/commits/{slug}
        if (docModule.metadata.type === 'doc:commit') {
          const currentPath = window.location.pathname;
          if (!currentPath.startsWith('/docs/commits/')) {
            window.location.href = `/docs/commits/${docModule.metadata.slug}`;
            return;
          }
        }
        
        setDocComponent(() => docModule.default);
        setMetadata(docModule.metadata);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    loadDoc();
  }, [slug]);

  if (loading) {
    return null;
  }

  if (!DocComponent || !metadata) {
    notFound();
  }

  return (
    <Container size="sm">
      <article>
        <ContentHeader metadata={metadata} />
        <DocComponent />
      </article>
    </Container>
  );
}
