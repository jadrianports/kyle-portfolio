// app/api/hero/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("hero")
    .select("*")
    .single();

  if (error) return NextResponse.json({ error }, { status: 500 });

  return NextResponse.json({ data });
}
