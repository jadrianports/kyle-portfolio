"use client";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Plus } from "lucide-react";

export interface ServiceFormData {
  title: string;
  description: string;
  icon: string;
  deliverables: string[];
}

interface ServiceFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ServiceFormData) => void;
  initialData?: ServiceFormData;
}

export function ServiceFormDialog({ isOpen, onClose, onSave, initialData }: ServiceFormDialogProps) {
  const [formData, setFormData] = useState<ServiceFormData>({
    title: "",
    description: "",
    icon: "",
    deliverables: [],
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
    else setFormData({ title: "", description: "", icon: "", deliverables: [] });
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const addDeliverable = () => setFormData({ ...formData, deliverables: [...formData.deliverables, ""] });
  const updateDeliverable = (index: number, value: string) => {
    const updated = [...formData.deliverables];
    updated[index] = value;
    setFormData({ ...formData, deliverables: updated });
  };
  const removeDeliverable = (index: number) => {
    setFormData({ ...formData, deliverables: formData.deliverables.filter((_, i) => i !== index) });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Service" : "Add Service"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label>Title *</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Description *</Label>
              <Input
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Icon (Lucide) *</Label>
              <Input
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Deliverables */}
          <div className="space-y-2">
            <Label>Deliverables</Label>
            {formData.deliverables.map((d, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <Input value={d} onChange={(e) => updateDeliverable(idx, e.target.value)} />
                <Button type="button" variant="destructive" size="icon" onClick={() => removeDeliverable(idx)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={addDeliverable}>
              <Plus className="mr-2 h-4 w-4" /> Add Deliverable
            </Button>
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
