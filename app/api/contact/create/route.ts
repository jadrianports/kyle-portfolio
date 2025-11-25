// app/api/experience/create/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
    const supabase = await createClient();
    const body = await req.json();

    const { data, error } = await supabase
        .from("message")
        .insert([{
            name: body.name,
            email: body.email,
            subject: body.subject,
            message: body.message,
            created_at: new Date(),

        }])
        .select()
        .single();

    if (error) return NextResponse.json({ error }, { status: 400 });
    return NextResponse.json({ data, success: true });
}
