// app/api/education/update/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  const supabase = await createClient();
  const body = await req.json();

  const { data, error } = await supabase
    .from("education")
    .update({
      school: body.school,
      degree: body.degree,
      start_year: body.start_year,
      end_year: body.end_year,
      honors: body.honors || [],
    })
    .eq("id", body.id)
    .select()
    .single();

  if (error) return NextResponse.json({ error }, { status: 400 });

  return NextResponse.json({ data, success: true });
}
