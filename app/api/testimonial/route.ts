"use server";
// app/api/testimonial/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("testimonial")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) return NextResponse.json({ error }, { status: 400 });

  return NextResponse.json({ data });
}
