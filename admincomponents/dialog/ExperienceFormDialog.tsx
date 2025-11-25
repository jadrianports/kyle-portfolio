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
import { Plus, Trash2 } from "lucide-react";

export interface ExperienceFormData {
  company: string;
  role: string;
  start_date: string;
  end_date: string;
  currently_working: boolean;
  description: string;
  highlights: string[];
  platform_tools: string[];
}

interface ExperienceFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ExperienceFormData) => void;
  initialData?: ExperienceFormData;
}

export function ExperienceFormDialog({
  isOpen,
  onClose,
  onSave,
  initialData,
}: ExperienceFormDialogProps) {
  const emptyForm: ExperienceFormData = {
    company: "",
    role: "",
    start_date: "",
    end_date: "",
    currently_working: false,
    description: "",
    highlights: [],
    platform_tools: [],
  };

  const [formData, setFormData] = useState<ExperienceFormData>(emptyForm);

  // normalize initialData to prevent undefined/null values
  useEffect(() => {
    if (initialData) {
      setFormData({
        company: initialData.company ?? "",
        role: initialData.role ?? "",
        start_date: initialData.start_date ?? "",
        end_date: initialData.end_date ?? "",
        currently_working: initialData.currently_working ?? false,
        description: initialData.description ?? "",
        highlights: initialData.highlights ?? [],
        platform_tools: initialData.platform_tools ?? [],
      });
    } else {
      setFormData(emptyForm);
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const addItem = (field: "highlights" | "platform_tools") => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  const updateItem = (field: "highlights" | "platform_tools", index: number, value: string) => {
    const updated = [...formData[field]];
    updated[index] = value;
    setFormData({ ...formData, [field]: updated });
  };

  const removeItem = (field: "highlights" | "platform_tools", index: number) => {
    const updated = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: updated });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Experience" : "Add Experience"}</DialogTitle>
          <DialogDescription>Fill in your work experience details.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Company */}
            <div className="space-y-2">
              <Label>Company *</Label>
              <Input
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                required
              />
            </div>

            {/* Role */}
            <div className="space-y-2">
              <Label>Position *</Label>
              <Input
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                required
              />
            </div>

            {/* Start Date */}
            <div className="space-y-2">
              <Label>Start Date *</Label>
              <Input
                type="date"
                value={formData.start_date}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                required
              />
            </div>

            {/* End Date */}
            <div className="space-y-2">
              <Label>End Date</Label>
              <Input
                type="date"
                value={formData.end_date}
                disabled={formData.currently_working}
                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
              />
            </div>

            {/* Currently Working */}
            <div className="flex items-center space-x-2 col-span-2">
              <input
                type="checkbox"
                checked={formData.currently_working}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    currently_working: e.target.checked,
                    end_date: e.target.checked ? "" : formData.end_date,
                  })
                }
              />
              <Label>Currently Working</Label>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
            />
          </div>

          {/* Highlights */}
          <div className="space-y-2">
            <Label>Highlights</Label>
            {formData.highlights.map((h, i) => (
              <div key={i} className="flex gap-2 items-center">
                <Input value={h} onChange={(e) => updateItem("highlights", i, e.target.value)} />
                <Button type="button" size="icon" variant="destructive" onClick={() => removeItem("highlights", i)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={() => addItem("highlights")}>
              <Plus className="mr-2 h-4 w-4" /> Add Highlight
            </Button>
          </div>

          {/* Platforms/Tools */}
          <div className="space-y-2">
            <Label>Platforms & Tools</Label>
            {formData.platform_tools.map((p, i) => (
              <div key={i} className="flex gap-2 items-center">
                <Input value={p} onChange={(e) => updateItem("platform_tools", i, e.target.value)} />
                <Button type="button" size="icon" variant="destructive" onClick={() => removeItem("platform_tools", i)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={() => addItem("platform_tools")}>
              <Plus className="mr-2 h-4 w-4" /> Add Platform/Tool
            </Button>
          </div>

          {/* Footer */}
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
