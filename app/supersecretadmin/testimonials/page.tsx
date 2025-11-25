"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TestimonialFormDialog } from "@/admincomponents/dialog/TestimonialFormDialog";
import { useToast } from "@/hooks/use-toast";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  image: string;
}

export default function TestimonialsEditor() {
  const { toast } = useToast();

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);

  // Fetch testimonials from API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("/api/testimonial");
        const json = await res.json();
        if (json.data) setTestimonials(json.data);
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        toast({ title: "⚠️ Failed to fetch testimonials" });
      }
    };
    fetchTestimonials();
  }, []);

  const handleAdd = () => {
    setEditingTestimonial(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (t: Testimonial) => {
    setEditingTestimonial(t);
    setIsDialogOpen(true);
  };

  const handleSave = async (data: Omit<Testimonial, "id">) => {
    try {
      const endpoint = editingTestimonial
        ? "/api/testimonial/update"
        : "/api/testimonial/create";
      const body = editingTestimonial ? { id: editingTestimonial.id, ...data } : data;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error?.message || "Failed to save testimonial");

      if (editingTestimonial) {
        setTestimonials(
          testimonials.map((t) =>
            t.id === editingTestimonial.id ? { ...t, ...data } : t
          )
        );
        toast({ title: "✨ Testimonial updated!" });
      } else {
        setTestimonials([json.data, ...testimonials]);
        toast({ title: "✨ Testimonial added!" });
      }
    } catch (err: any) {
      console.error("Error saving testimonial:", err);
      toast({ title: "⚠️ Failed to save testimonial" });
    } finally {
      setIsDialogOpen(false);
      setEditingTestimonial(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    try {
      const res = await fetch("/api/testimonial/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error?.message || "Failed to delete testimonial");

      setTestimonials(testimonials.filter((t) => t.id !== id));
      toast({ title: "Testimonial deleted" });
    } catch (err: any) {
      console.error("Error deleting testimonial:", err);
      toast({ title: "⚠️ Failed to delete testimonial" });
    }
  };

  console.log(testimonials);
  return (
    <>
      <div className="p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Testimonials</h1>
              <p className="text-muted-foreground">
                Manage client testimonials
              </p>
            </div>
            <Button onClick={handleAdd} className="bg-gradient-to-r from-rose to-hot-pink">
              <Plus className="mr-2 h-4 w-4" />
              Add Testimonial
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <Card key={t.id} className="hover:shadow-lg transition-all">
                <CardHeader className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={t.image} />
                      <AvatarFallback>{t.name?.[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{t.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {t.role} at {t.company}
                      </p>
                      <p className="text-sm text-muted-foreground line-clamp-3 mt-1">
                        "{t.content}"
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(t)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(t.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            ))}

            {testimonials.length === 0 && (
              <Card className="p-12 text-center col-span-full">
                <p className="text-muted-foreground mb-4">
                  No testimonials yet. Start collecting feedback!
                </p>
                <Button onClick={handleAdd}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Testimonial
                </Button>
              </Card>
            )}
          </div>
        </motion.div>
      </div>

      <TestimonialFormDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setEditingTestimonial(null);
        }}
        onSave={handleSave}
        initialData={editingTestimonial ? {
          name: editingTestimonial.name,
          company: editingTestimonial.company,
          role: editingTestimonial.role,
          content: editingTestimonial.content,
          image: editingTestimonial.image,
        } : undefined}
      />
    </>
  );
}
