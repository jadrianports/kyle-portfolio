// app/blogs/page.tsx
"use client";

import { useState, useEffect } from "react";
import BlogList from "@/components/BlogList"; // we’ll make this next
import { getAllBlogs } from "@/lib/getAllBlogs";
import { useLoading } from "@/contexts/LoadingContext";
import type { BlogPosts } from "@/lib/getPortfolioData";

export default function BlogsPage() {
  const [data, setData] = useState<BlogPosts[]>([]);
    const { setIsLoading, setLoadingText } = useLoading();

    useEffect(() => {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          setLoadingText("Loading blogs...");
          const blogs = await getAllBlogs();
          setData(blogs);
        } catch (err) {
          console.error("Error fetching portfolio:", err);
        } finally {
          setIsLoading(false);
          setLoadingText(undefined);
        }
      };
  
      fetchData();
    }, [setIsLoading, setLoadingText]);
  return <BlogList initialPosts={data} />;
}
