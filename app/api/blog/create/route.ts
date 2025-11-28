// app/api/blog/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  const body = await req.json();
  const supabase = await createClient();
  console.log(body)
  const { data, error } = await supabase
    .from("blog")
    .insert(body)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 201 });
}
