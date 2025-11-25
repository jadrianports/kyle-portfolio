// app/api/testimonial/update/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/client";

export async function POST(req: Request) {
    const supabase = createClient();
    const body = await req.json();
    

    const { data, error } = await supabase
        .from("testimonial")
        .update({
            name: body.name,
            company: body.company,
            role: body.role,
            content: body.content,
            image: body.image,
        })
        .eq("id", body.id)
        .select()
        .single();

    if (error) return NextResponse.json({ error }, { status: 400 });
    return NextResponse.json({ data, success: true });
}
