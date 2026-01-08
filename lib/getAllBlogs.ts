// lib/getAllBlogs.ts
import type { BlogPosts } from "@/lib/getPortfolioData";

export async function getAllBlogs(): Promise<BlogPosts[]> {
  try {
   const res = await fetch("/api/blog");
   const json = await res.json();

    return json.data as BlogPosts[];
  } catch (err) {
    console.error("Unexpected error fetching blogs:", err);
    return [];
  }
}
