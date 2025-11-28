// app/api/blog/update/[id]/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

  if (!id) {
    console.error("No id provided");
    return NextResponse.json({ error: "No id provided" }, { status: 400 });
  }
  const body = await req.json();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("blog")
    .update(body)
    .eq("id", id)
    .select()
    .single();

  if (error || !data) {
    console.error("Blog update failed:", error);
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  }

  return NextResponse.json({ data });
}
