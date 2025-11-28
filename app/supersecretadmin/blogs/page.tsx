"use client"
import { useState, useEffect } from "react";
import { motion, Reorder } from "framer-motion";
import { Plus, Edit, Trash2, GripVertical, Eye } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useLoading } from "@/contexts/LoadingContext";
import { getPortfolioData } from "@/lib/getPortfolioData";
import type { BlogPosts } from "@/lib/getPortfolioData";
import { AdminSkeleton } from "@/admincomponents/AdminSkeleton";
/**
 * Blog Posts Editor with Drag & Drop
 * Manage blog content with status (draft/published)
 * 
 * TODO: Add rich text editor for content
 * TODO: Connect to backend API
 */


export default function BlogsEditor() {
  const { toast } = useToast();
  //const navigate = useNavigate();
  const [blogs, setBlogs] = useState<BlogPosts[]>([]);
  const router = useRouter();
  const { isLoading, setIsLoading } = useLoading();

  const fetchEducation = async () => {
    try {
      setIsLoading(true);
      const portfolio = await getPortfolioData();
      setBlogs(portfolio.blogPosts);
    } catch (err: any) {
      console.error("Error fetching blogs:", err);
      toast({ title: "⚠️ Failed to fetch blogs", description: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  if (isLoading) {
    return <AdminSkeleton type="list" />; // skeleton loader while fetching
  }


  const handleAdd = () => {
    router.push("/supersecretadmin/blogs/new");
  };

  const handleEdit = (blog: BlogPosts) => {
    router.push(`/supersecretadmin/blogs/edit/${blog.id}`);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog post?")) return;

    try {
      setIsLoading(true);

      const res = await fetch(`/api/blog/delete/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");

      setBlogs((prev) => prev.filter((b) => b.id !== id));
      toast({ title: "Blog post deleted" });
    } catch (err: any) {
      toast({ title: "Error", description: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      setIsLoading(true);

      const res = await fetch(`/api/blog/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !currentStatus }),
      });

      if (!res.ok) throw new Error("Failed to update status");

      const { data } = await res.json();

      setBlogs((prev) =>
        prev.map((b) => (b.id === id ? { ...b, published: data.published } : b))
      );

      toast({ title: `Blog ${!currentStatus ? "Published" : "Unpublished"}` });
    } catch (err: any) {
      toast({ title: "Error", description: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Blog Posts</h1>
            <p className="text-muted-foreground">
              Create and manage blog content • Drag to reorder
            </p>
          </div>
          <Button onClick={handleAdd} className="bg-gradient-to-r from-rose to-hot-pink">
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Button>
        </div>

        <Reorder.Group axis="y" values={blogs} onReorder={setBlogs} className="space-y-4">
          {blogs.map((blog) => (
            <Reorder.Item key={blog.id} value={blog}>
              <motion.div whileHover={{ scale: 1.01 }} className="cursor-move">
                <Card className="hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <GripVertical className="w-6 h-6 text-muted-foreground mt-1" />

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <CardTitle className="text-xl">{blog.title}</CardTitle>
                              <Badge
                                variant={blog.published === true ? "default" : "secondary"}
                                className={blog.published === true ? "bg-green-500" : ""}
                              >
                                {blog.published === true ? "published" : "draft"}
                              </Badge>
                            </div>
                            <CardDescription>{blog.excerpt}</CardDescription>
                            <p className="text-xs text-muted-foreground mt-2">
                              {blog.published_at} • {blog.category}
                            </p>
                          </div>

                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => toggleStatus(blog.id, blog.published)}
                              title={blog.published === true ? "Unpublish" : "Publish"}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(blog)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(blog.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            </Reorder.Item>
          ))}
        </Reorder.Group>

        {blogs.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground mb-4">
              No blog posts yet. Start writing!
            </p>
            <Button onClick={handleAdd}>
              <Plus className="mr-2 h-4 w-4" />
              Write Your First Post
            </Button>
          </Card>
        )}
      </motion.div>
    </div>
  );
}
