"use server";
// app/api/skilltool/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("skilltool")
    .select("*")
    .order("category");

  if (error) return NextResponse.json({ error }, { status: 400 });

  return NextResponse.json({ data });
}
