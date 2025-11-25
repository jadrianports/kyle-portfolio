"use client";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Plus } from "lucide-react";

export interface EducationFormData {
  school: string;
  degree: string;
  start_year: string; // just the year string
  end_year: string;
  honors: string[];
}

interface EducationFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: EducationFormData) => void;
  initialData?: EducationFormData;
}

export function EducationFormDialog({ isOpen, onClose, onSave, initialData }: EducationFormDialogProps) {
  const [formData, setFormData] = useState<EducationFormData>({
    school: "",
    degree: "",
    start_year: "",
    end_year: "",
    honors: [],
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
    else setFormData({ school: "", degree: "", start_year: "", end_year: "", honors: [] });
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const addHonor = () => setFormData({ ...formData, honors: [...formData.honors, ""] });
  const updateHonor = (index: number, value: string) => {
    const updated = [...formData.honors];
    updated[index] = value;
    setFormData({ ...formData, honors: updated });
  };
  const removeHonor = (index: number) => {
    setFormData({ ...formData, honors: formData.honors.filter((_, i) => i !== index) });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Education" : "Add Education"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Institution *</Label>
              <Input
                value={formData.school}
                onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Degree *</Label>
              <Input
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Start Year *</Label>
              <Input
                type="number"
                min={1900}
                max={2100}
                value={formData.start_year}
                onChange={(e) => setFormData({ ...formData, start_year: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>End Year</Label>
              <Input
                type="number"
                min={1900}
                max={2100}
                value={formData.end_year}
                onChange={(e) => setFormData({ ...formData, end_year: e.target.value })}
              />
            </div>
          </div>

          {/* Honors */}
          <div className="space-y-2">
            <Label>Honors / Awards</Label>
            {formData.honors.map((honor, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <Input value={honor} onChange={(e) => updateHonor(idx, e.target.value)} />
                <Button type="button" variant="destructive" size="icon" onClick={() => removeHonor(idx)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={addHonor}>
              <Plus className="mr-2 h-4 w-4" /> Add Honor
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
