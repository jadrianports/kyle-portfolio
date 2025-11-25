// app/api/experience/create/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
    const supabase = await createClient();
    const body = await req.json();

    const endDate = body.currently_working ? null : body.end_date;

    const { data, error } = await supabase
        .from("experience")
        .insert([{
            company: body.company,
            role: body.role,
            start_date: body.start_date,
            end_date: endDate,
            currently_working: body.currently_working,
            description: body.description,
            highlights: body.highlights || [],
            platform_tools: body.platforms_tools || [],
            created_at: new Date(),
        }])
        .select()
        .single();

    if (error) return NextResponse.json({ error }, { status: 400 });
    return NextResponse.json({ data, success: true });
}
