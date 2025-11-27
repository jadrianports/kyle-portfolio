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
      skills: body.skills,
      tagline: body.tagline,
      description: body.description,
      profile_image: body.profileImage,
      email: body.email,
      phone: body.phone,
      address: body.address,
      social_links: body.socialLinks,
      resume_url: body.resume_url,
      my_story: body.my_story,
      marketing_philosophy: body.marketing_philosophy,
      marketing_approach: body.marketing_approach,
      unique_traits : body.unique_traits,
      updated_at : new Date()
    })
    .eq("id", body.id); // always 1 row

  if (error) return NextResponse.json({ error }, { status: 400 });

  return NextResponse.json({ data, success: true });
}
