// app/api/service/update/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/client";

export async function POST(req: Request) {
    const supabase = createClient();
    const body = await req.json();
    
    const { data, error } = await supabase
        .from("service")
        .update({
            title: body.title,
            description: body.description,
            icon: body.icon,
            deliverables: body.deliverables || [],
            updated_at: new Date().toISOString(),
        })
        .eq("id", body.id)
        .select()
        .single();

    if (error) return NextResponse.json({ error }, { status: 400 });
    return NextResponse.json({ data, success: true });
}
