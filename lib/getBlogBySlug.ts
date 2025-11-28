// lib/getBlogBySlug.ts
import type { BlogPosts } from "@/lib/getPortfolioData";

export async function getBlogBySlug(slug: string): Promise<BlogPosts | null> {
  if (!slug) {
    console.error("No slug provided");
    return null;
  }

  try {
    const res = await fetch(`/api/blog/${slug}`);

    if (!res.ok) {
      console.error("Failed to fetch blog:", res.statusText);
      return null;
    }

    const json = await res.json();
    return json.data as BlogPosts;
  } catch (err) {
    console.error("Unexpected error fetching blog:", err);
    return null;
  }
}