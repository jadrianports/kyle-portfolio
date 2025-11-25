// app/api/experience/update/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/client";

export async function POST(req: Request) {
    const supabase = createClient();
    const body = await req.json();
    
    const { data, error } = await supabase
        .from("project")
        .update({
            title: body.title,
            category: body.category,
            description: body.description,
            image: body.image,
            details: body.details,
            metrics: body.metrics || [],
            deliverables: body.deliverables || [],
            updated_at: new Date().toISOString(),
        })
        .eq("id", body.id)
        .select()
        .single();

    if (error) return NextResponse.json({ error }, { status: 400 });
    return NextResponse.json({ data, success: true });
}
