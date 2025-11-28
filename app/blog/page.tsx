// app/blogs/page.tsx
"use client";

import { useState, useEffect } from "react";
import BlogList from "@/components/BlogList"; // we’ll make this next
import { getAllBlogs } from "@/lib/getAllBlogs";
import type { BlogPosts } from "@/lib/getPortfolioData";

export default function BlogsPage() {
  const [data, setData] = useState<BlogPosts[]>([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const blogs = await getAllBlogs();
          setData(blogs);
        } catch (err) {
          console.error("Error fetching portfolio:", err);
        } finally {
        }
      };
  
      fetchData();
    },);
  return <BlogList initialPosts={data} />;
}
