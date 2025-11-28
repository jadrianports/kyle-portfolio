"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import RichTextEditor from "@/admincomponents/RichTextEditor";
import { useToast } from "@/hooks/use-toast";
import { getPortfolioData } from "@/lib/getPortfolioData";
import type { BlogPosts } from "@/lib/getPortfolioData";
import { useLoading } from "@/contexts/LoadingContext";
import { AdminSkeleton } from "./AdminSkeleton";
interface BlogEditorProps {
    blogId: string;        // <-- Add this
}
export default function BlogEditorPage({ blogId }: BlogEditorProps) {
    const isNew = blogId === "new";
    const id = blogId;
    const router = useRouter();
    const { toast } = useToast();
    const { isLoading, setIsLoading } = useLoading();
    const [form, setForm] = useState<any>({
        title: "",
        slug: "",
        excerpt: "",
        category: "",
        published: false,
        content: "",
        cover_image: "",
    });

    // Fetch existing blog when editing
    useEffect(() => {
        if (isNew) return;

        const load = async () => {
            setIsLoading(true);   // <-- ⭐ start loading

            try {
                const data = await getPortfolioData();
                const found = data.blogPosts.find((b) => b.id === id);

                if (!found) {
                    toast({ title: "Blog not found" });
                    router.push("/supersecretadmin/blogs");
                    return;
                }

                setForm(found);
            } finally {
                setIsLoading(false);  // <-- ⭐ stop loading
            }
        };

        load();
    }, [id]);

    const update = (key: string, value: any) => {
        setForm((prev: any) => ({ ...prev, [key]: value }));
    };

    const handleSave = async () => {
        try {
            const endpoint = isNew ? "/api/blog/create" : `/api/blog/update/${id}`;
            const method = isNew ? "POST" : "PUT";
            console.log(endpoint, method)
            const res = await fetch(endpoint, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            console.log(form)

            if (!res.ok) throw new Error("Failed to save");

            toast({
                title: isNew ? "Blog Created!" : "Blog Updated!",
                description: "Your blog post has been saved.",
            });

            router.push("/supersecretadmin/blogs");
        } catch (err: any) {
            toast({ title: "Error saving", description: err.message });
        }
    };

    if (isLoading) {
        return <AdminSkeleton type="form" />; // skeleton loader while fetching
    }

    return (
        <div className="p-10 space-y-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold">
                {isNew ? "Create Blog Post" : "Edit Blog Post"}
            </h1>

            <Card className="p-6 space-y-6">
                <div>
                    <label className="block mb-2 font-medium">Title</label>
                    <Input
                        value={form.title}
                        onChange={(e) => update("title", e.target.value)}
                    />
                </div>

                <div>
                    <label className="block mb-2 font-medium">Slug</label>
                    <Input
                        value={form.slug}
                        onChange={(e) => update("slug", e.target.value)}
                        placeholder="my-awesome-article"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-medium">Excerpt</label>
                    <Textarea
                        rows={3}
                        value={form.excerpt}
                        onChange={(e) => update("excerpt", e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-2 font-medium">Category</label>
                        <Input
                            value={form.category}
                            onChange={(e) => update("category", e.target.value)}
                            placeholder="Tech, Personal, Travel..."
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">Cover Image URL</label>
                        <Input
                            value={form.cover_image}
                            onChange={(e) => update("cover_image", e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <label className="block mb-2 font-medium">Content</label>

                    {/* 🔥 RICH TEXT EDITOR INTEGRATION */}
                    <div className="border rounded">
                        <RichTextEditor
                            value={form.content}
                            onChange={(value) => update("content", value)}
                        />
                    </div>
                </div>

                <Button
                    className="w-full bg-primary text-white"
                    onClick={handleSave}
                >
                    {isNew ? "Create" : "Save Changes"}
                </Button>
            </Card>
        </div>
    );
}
