import BlogEditor from "@/admincomponents/BlogEditor";
import { use } from "react"; // built-in in React 18+

export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
  return <BlogEditor blogId={id} />;
}
