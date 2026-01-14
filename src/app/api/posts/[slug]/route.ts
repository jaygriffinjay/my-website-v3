import { NextResponse } from "next/server";
import { getPostBySlug } from "@/lib/posts";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const filename = await getPostBySlug(slug);

  if (!filename) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json({ filename });
}
