// app/blogs/page.tsx
import BlogList from "@/components/BlogList"; // we’ll make this next
import { getAllBlogs } from "@/lib/getAllBlogs";

export default async function BlogsPage() {
  const allBlogPosts = await getAllBlogs();

  return <BlogList initialPosts={allBlogPosts} />;
}
