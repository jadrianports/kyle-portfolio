import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  const supabase = await createClient();
  const body: { category: string; items: { name: string; level: number }[] } = await req.json();

  if (!body.category || !body.items) {
    return NextResponse.json({ error: "Missing category or items" }, { status: 400 });
  }

  let { data, error } = await supabase
    .from("skilltool")
    .update({ items: body.items })
    .eq("category", body.category.toLowerCase())
    .select()
    .maybeSingle();

  if (error) return NextResponse.json({ error }, { status: 400 });

  if (!data) {
    const { data: insertData, error: insertError } = await supabase
      .from("skilltool")
      .insert({ category: body.category.toLowerCase(), items: body.items })
      .select()
      .maybeSingle();

    if (insertError) return NextResponse.json({ error: insertError }, { status: 400 });
    data = insertData;
  }

  return NextResponse.json({ data, success: true });
}