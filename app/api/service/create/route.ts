// app/api/service/create/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
    const supabase = await createClient();
    const body = await req.json();

    const { data, error } = await supabase
        .from("service")
        .insert([{
            title: body.title,
            description: body.description,
            icon: body.icon,
            deliverables: body.deliverables || [],
            created_at: new Date(),
            updated_at: new Date()
        }])
        .select()
        .single();

    if (error) return NextResponse.json({ error }, { status: 400 });
    return NextResponse.json({ data, success: true });
}
