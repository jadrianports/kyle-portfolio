// app/api/experience/update/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/client";

export async function POST(req: Request) {
    const supabase = createClient();
    const body = await req.json();
    
    // If currently_working is true, set end_date to null
    const endDate = body.currently_working ? null : body.end_date;

    const { data, error } = await supabase
        .from("experience")
        .update({
            company: body.company,
            role: body.role,
            start_date: body.start_date,
            end_date: endDate,
            currently_working: body.currently_working,
            description: body.description,
            highlights: body.highlights || [],
            platform_tools: body.platform_tools || [],
        })
        .eq("id", body.id)
        .select()
        .single();

    if (error) return NextResponse.json({ error }, { status: 400 });
    return NextResponse.json({ data, success: true });
}
