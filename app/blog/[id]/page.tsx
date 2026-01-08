// app/blog/[id]/page.tsx
"use client"
import { getBlogBySlug } from "@/lib/getBlogBySlug";
import BlogContent from "@/components/BlogContent";
import { use } from "react"; // built-in in React 18+
import { useEffect, useState } from "react";
import type { BlogPosts } from "@/lib/getPortfolioData";
export default function BlogSlug({ params }: { params: Promise<{ id: string }> }) {
  // unwrap the params Promise safely
  const { id } = use(params);

  // const post = use(getBlogBySlug(id));

  const [data, setData] = useState<BlogPosts | null>();
      useEffect(() => {
        const fetchData = async () => {
          try {
            const blog = await getBlogBySlug(id);
            setData(blog);
          } catch (err) {
            console.error("Error fetching blog:", err);
          } finally {
          }
        };
    
        fetchData();
      }, [id]);

  if (!data) return <div>Blog not found</div>;

  return <BlogContent post={data} />;
}
