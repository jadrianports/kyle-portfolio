import { createClient} from "@/utils/supabase/server";
import type { BlogPosts } from "@/lib/getPortfolioData";

export async function getBlogBySlug(slug: string): Promise<BlogPosts | null> {
    if (!slug) {
    console.error("No blog ID provided");
    return null;
  }
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("blog")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return null;
    }

    return data as BlogPosts;
  } catch (err) {
    console.error("Unexpected error fetching blog:", err);
    return null;
  }
}
