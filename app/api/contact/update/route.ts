import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const body = await req.json();
    console.log("Request body:", body);
    const id = body.id;
    const is_read = body.is_read;

    if (!id || typeof is_read !== "boolean") {
      return NextResponse.json(
        { error: "id and read (true/false) are required" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("message")
      .update({ is_read : is_read })
      .eq("id", id);

    if (error) {
      console.error("Supabase update error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
