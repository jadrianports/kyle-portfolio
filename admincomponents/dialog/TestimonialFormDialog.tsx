"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export interface TestimonialFormData {
  name: string;
  role: string;
  company: string;
  content: string;
  image: string;
}

interface TestimonialFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: TestimonialFormData) => void;
  initialData?: TestimonialFormData;
}

export function TestimonialFormDialog({
  isOpen,
  onClose,
  onSave,
  initialData,
}: TestimonialFormDialogProps) {
  const emptyForm: TestimonialFormData = {
    name: "",
    role: "",
    company: "",
    content: "",
    image: "",
  };

  const [formData, setFormData] = useState<TestimonialFormData>(emptyForm);

  useEffect(() => {
    if (initialData) setFormData({ ...emptyForm, ...initialData });
    else setFormData(emptyForm);
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Testimonial" : "Add Testimonial"}</DialogTitle>
          <DialogDescription>Fill in your client testimonial details.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Name *</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Role / Title *</Label>
              <Input
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Company *</Label>
              <Input
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Image URL</Label>
              <Input
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="/placeholder.svg"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Testimonial *</Label>
            <Textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={4}
              required
            />
          </div>

          <DialogFooter className="flex justify-end gap-2 mt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-rose to-hot-pink">
              {initialData ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
