// app/api/hero/update/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  const supabase = await createClient();
  const body = await req.json();

  const { data, error } = await supabase
    .from("hero")
    .update({
      greeting: body.greeting,
      name: body.name,
      title: body.title,
      tagline: body.tagline,
      description: body.description,
      profile_image: body.profileImage,
      resume_url: body.resume,
      email: body.email,
      phone: body.phone,
      address: body.address,
      social_links: body.socialLinks,
      updated_at: new Date(),
    })
    .eq("id", body.id); // always 1 row

  if (error) return NextResponse.json({ error }, { status: 400 });

  return NextResponse.json({ data, success: true });
}
