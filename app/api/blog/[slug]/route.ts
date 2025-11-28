import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server"; // or your local helper

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (!slug) {
    console.error("No slug provided");
    return NextResponse.json({ error: "No slug provided" }, { status: 400 });
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("blog")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    console.error("Blog fetch failed:", error);
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  }

  return NextResponse.json({ data });
}
