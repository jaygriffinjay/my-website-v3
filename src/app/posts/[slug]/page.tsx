"use client";

import { notFound } from "next/navigation";
import { use, useState, useEffect } from "react";

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [PostComponent, setPostComponent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      try {
        // Fetch the filename for this slug from an API route
        const response = await fetch(`/api/posts/${slug}`);
        if (!response.ok) {
          setLoading(false);
          return;
        }
        
        const { filename } = await response.json();
        
        // Dynamically import the post using the filename
        const postModule = await import(`@/posts/${filename}`);
        setPostComponent(() => postModule.default);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!PostComponent) {
    notFound();
  }

  return (
    <article>
      <PostComponent />
    </article>
  );
}
