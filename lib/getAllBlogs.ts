// lib/getAllBlogs.ts
import { createClient } from "@/utils/supabase/server";
import type { BlogPosts } from "@/lib/getPortfolioData";

export async function getAllBlogs(): Promise<BlogPosts[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("blog")
      .select("*")
      .order("published_at", { ascending: false });

    if (error) {
      console.error("Supabase error fetching blogs:", error);
      return [];
    }

    return data as BlogPosts[];
  } catch (err) {
    console.error("Unexpected error fetching blogs:", err);
    return [];
  }
}
