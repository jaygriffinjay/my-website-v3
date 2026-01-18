import { NextResponse } from "next/server";
import { getDocBySlug } from "@/lib/posts";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const filename = await getDocBySlug(slug);

  if (!filename) {
    return NextResponse.json({ error: "Doc not found" }, { status: 404 });
  }

  return NextResponse.json({ filename });
}
