"use client";

import { notFound } from "next/navigation";
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
        const docModule = await import(`@/posts/${filename}`);
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
    return <div>Loading...</div>;
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
