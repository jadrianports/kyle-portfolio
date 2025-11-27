import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server"; // or your local helper

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("blog")
    .select("*")
    .eq("slug", params.id)
    .single();

  if (error) {
    console.error("Blog fetch failed:", error);
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  }

  return NextResponse.json({ data });
}
