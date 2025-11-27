import { getBlogBySlug } from "@/lib/getBlogBySlug";
import BlogContent from "@/components/BlogContent";

export default async function BlogSlug({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getBlogBySlug(id);

  if (!post) return <div>Blog not found</div>;

  return <BlogContent post={post} />;
}
