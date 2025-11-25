import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  const supabase = await createClient();
  const body = await req.json(); // { category: string }

  const { error } = await supabase
    .from("skilltool")
    .delete()
    .eq("category", body.category);

  if (error)
    return NextResponse.json({ error }, { status: 400 });

  return NextResponse.json({ success: true });
}
