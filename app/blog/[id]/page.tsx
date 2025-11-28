// app/blog/[id]/page.tsx
"use client"
import { getBlogBySlug } from "@/lib/getBlogBySlug";
import BlogContent from "@/components/BlogContent";
import { use } from "react"; // built-in in React 18+
import { useEffect, useState } from "react";
import { useLoading } from "@/contexts/LoadingContext";
import type { BlogPosts } from "@/lib/getPortfolioData";
export default function BlogSlug({ params }: { params: Promise<{ id: string }> }) {
  // unwrap the params Promise safely
  const { id } = use(params);

  // const post = use(getBlogBySlug(id));

  const [data, setData] = useState<BlogPosts | null>();
      const { setIsLoading, setLoadingText } = useLoading();
      useEffect(() => {
        const fetchData = async () => {
          try {
            setIsLoading(true);
            setLoadingText("Loading blog...");
            const blog = await getBlogBySlug(id);
            setData(blog);
          } catch (err) {
            console.error("Error fetching blog:", err);
          } finally {
            setIsLoading(false);
            setLoadingText(undefined);
          }
        };
    
        fetchData();
      }, [setIsLoading, setLoadingText]);

  if (!data) return <div>Blog not found</div>;

  return <BlogContent post={data} />;
}
