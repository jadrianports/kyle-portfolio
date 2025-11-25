"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";
import  RichTextEditor  from "../RichTextEditor";

interface ProjectFormData {
  title: string;
  category: string;
  description: string;
  image: string;
  link: string;
  details: string;
  metrics: string; // JSON string
  deliverables: string; // comma separated
}

interface ProjectFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any;
}

export function ProjectFormDialog({
  isOpen,
  onClose,
  onSave,
  initialData,
}: ProjectFormDialogProps) {
  const [formData, setFormData] = useState<ProjectFormData>({
    title: "",
    category: "",
    description: "",
    image: "",
    link: "",
    metrics: "",
    deliverables: "",
    details: "",
  });


  // Load data when editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        category: initialData.category || "",
        description: initialData.description || "",
        details: initialData.details || "",
        image: initialData.image || "",
        link: initialData.link || "",
        metrics: initialData.metrics ? JSON.stringify(initialData.metrics) : "",
        deliverables: initialData.deliverables?.join(", ") || "",
      });
    } else {
      setFormData({
        title: "",
        category: "",
        description: "",
        details: "",
        image: "",
        link: "",
        metrics: "",
        deliverables: "",
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Convert CSV → array
    const deliverables = formData.deliverables
      .split(",")
      .map((d) => d.trim())
      .filter(Boolean);

    // Parse JSON metrics safely
    let parsedMetrics = null;
    try {
      parsedMetrics = formData.metrics ? JSON.parse(formData.metrics) : null;
    } catch {
      alert("Metrics must be valid JSON");
      return;
    }

    onSave({
      ...formData,
      deliverables,
      metrics: parsedMetrics,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Project" : "Add New Project"}</DialogTitle>
          <DialogDescription>Fill in the project details below</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Project Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              placeholder="Digital Marketing, SMM, SEO..."
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={4}
              required
            />
          </div>

          {/* Thumbnail */}
          <div className="space-y-2">
            <Label htmlFor="thumbnail">Thumbnail Image</Label>
            <Input
              id="thumbnail"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Link */}
          <div className="space-y-2">
            <Label htmlFor="link">Project Link</Label>
            <Input
              id="link"
              value={formData.link}
              onChange={(e) =>
                setFormData({ ...formData, link: e.target.value })
              }
              placeholder="https://example.com"
            />
          </div>

          {/* Deliverables */}
          <div className="space-y-2">
            <Label htmlFor="deliverables">Deliverables (comma separated)</Label>
            <Input
              id="deliverables"
              value={formData.deliverables}
              onChange={(e) =>
                setFormData({ ...formData, deliverables: e.target.value })
              }
              placeholder="Content Calendar, PPC Ads, Branding"
            />
          </div>


          <div className="space-y-2">
            <Label>Project Details *</Label>
            <RichTextEditor
              value={formData.details}
              onChange={(v) => setFormData({ ...formData, details: v })}
            />
          </div>


          {/* Metrics JSON */}
          <div className="space-y-2">
            <Label htmlFor="metrics">Metrics (JSON format)</Label>
            <Textarea
              id="metrics"
              value={formData.metrics}
              onChange={(e) =>
                setFormData({ ...formData, metrics: e.target.value })
              }
              placeholder={`{
  "reach": "+230%",
  "followers": "+45K",
  "engagement": "+180%"
}`}
              rows={5}
            />
            <p className="text-xs text-muted-foreground">
              Enter valid JSON. Example: {"{ \"reach\": \"+230%\" }"}
            </p>
          </div>

          {/* Buttons */}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-rose to-hot-pink">
              {initialData ? "Update Project" : "Add Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
