"use server";
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

const supabase = await createClient();

export async function PATCH(req: Request) {
  try {
    const { id, action } = await req.json();

    if (!action) {
      return NextResponse.json({ error: "No action provided" }, { status: 400 });
    }

    switch (action) {
      case "fetch":
        {
          const { data, error } = await supabase
            .from("message")
            .select("*")
            .order("created_at", { ascending: false });
          if (error) throw error;
          return NextResponse.json({ messages: data });
        }

      case "delete":
        {
          if (!id) return NextResponse.json({ error: "No id provided" }, { status: 400 });
          const { error } = await supabase
            .from("message")
            .delete()
            .eq("id", id);
          if (error) throw error;
          return NextResponse.json({ message: "Message deleted" });
        }

      case "mark_read":
        {
          if (!id) return NextResponse.json({ error: "No id provided" }, { status: 400 });
          const { error } = await supabase
            .from("message")
            .update({ is_read: true })
            .eq("id", id);
          if (error) throw error;
          return NextResponse.json({ message: "Message marked as read" });
        }

      case "mark_unread":
        {
          if (!id) return NextResponse.json({ error: "No id provided" }, { status: 400 });
          const { error } = await supabase
            .from("message")
            .update({ is_read: false })
            .eq("id", id);
          if (error) throw error;
          return NextResponse.json({ message: "Message marked as unread" });
        }

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (err: any) {
    console.error("API error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}