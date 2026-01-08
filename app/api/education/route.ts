// app/api/education/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/client";

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("education")
    .select("*")
    .order("start_year", { ascending: false });

  if (error) return NextResponse.json({ error }, { status: 500 });

  return NextResponse.json({ data });
}
