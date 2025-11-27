"use client";

import { useState, useEffect } from "react";
import { motion, Reorder } from "framer-motion";
import { Plus, Edit, Trash2, GripVertical, Save, GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { EducationFormDialog, EducationFormData } from "@/admincomponents/dialog/EducationFormDialog";
import {useLoading} from "@/contexts/LoadingContext";
import {AdminSkeleton} from "@/admincomponents/AdminSkeleton";
import { getPortfolioData } from "@/lib/getPortfolioData";
interface Education {
  id: string;
  school: string;
  degree: string;
  start_year: string;
  end_year: string;
  honors: string[];
}

export default function EducationEditor() {
  const { toast } = useToast();
  const [education, setEducation] = useState<Education[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEducation, setEditingEducation] = useState<Education | null>(null);
  const { isLoading, setIsLoading } = useLoading();

  // Fetch education via API route
    // Fetch portfolio data using getPortfolioData
  const fetchEducation = async () => {
    try {
      setIsLoading(true);
      const portfolio = await getPortfolioData();
      setEducation(portfolio.education);
    } catch (err: any) {
      console.error("Error fetching education:", err);
      toast({ title: "⚠️ Failed to fetch education", description: err.message });
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
    setEditingEducation(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (edu: Education) => {
    setEditingEducation(edu);
    setIsDialogOpen(true);
  };

  const handleSave = async (formData: EducationFormData) => {
    try {
      if (editingEducation) {
        // Update
        const res = await fetch("/api/education/update", {
          method: "POST",
          body: JSON.stringify({ id: editingEducation.id, ...formData }),
        });
        const json = await res.json();
        if (!res.ok) throw json.error;

        setEducation(education.map(e => e.id === editingEducation.id ? { ...e, ...formData } : e));
        toast({ title: "✨ Education updated!" });
      } else {
        // Create
        const res = await fetch("/api/education/create", {
          method: "POST",
          body: JSON.stringify(formData),
        });
        const json = await res.json();
        if (!res.ok) throw json.error;

        setEducation([json.data, ...education]);
        toast({ title: "✨ Education added!" });
      }
    } catch (err: any) {
      console.error("Error saving education:", err);
      toast({ title: "⚠️ Failed to save", description: err.message });
    } finally {
      setIsDialogOpen(false);
      setEditingEducation(null);
    }
  };

 const handleDelete = async (id: string) => {
    if (!confirm("Delete this education entry?")) return;
    try {
      const res = await fetch("/api/education/delete", {
        method: "POST",
        body: JSON.stringify({ id }),
      });
      const json = await res.json();
      if (!res.ok) throw json.error;

      setEducation(education.filter(e => e.id !== id));
      toast({ title: "Education deleted" });
    } catch (err: any) {
      console.error("Error deleting education:", err);
      toast({ title: "⚠️ Failed to delete", description: err.message });
    }
  };

 const formatDateRange = (start: number | string, end?: number | string) => {
  const startYear = start;
  const endYear = end ? end : "Present";
  return `${startYear} - ${endYear}`;
};

  return (
    <div className="p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Education</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleAdd}>
              <Plus className="mr-2 h-4 w-4" />
              Add Education
            </Button>
          </div>
        </div>

        {/* Drag & Drop List */}
        <Reorder.Group axis="y" values={education} onReorder={setEducation} className="space-y-4">
          {education.map((edu) => (
            <Reorder.Item key={edu.id} value={edu}>
              <motion.div whileHover={{ scale: 1.01 }} className="cursor-move">
                <Card className="hover:shadow-lg transition-all border-primary/20">
                  <CardHeader className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <GripVertical className="w-6 h-6 text-muted-foreground" />
                      <div>
                        <h3 className="text-xl font-semibold">{edu.degree}</h3>
                        <p className="text-muted-foreground">{edu.school}</p>
                        <p className="text-sm text-muted-foreground">{formatDateRange(edu.start_year, edu.end_year)}</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {edu.honors.map((honor, idx) => (
                            <Badge key={idx} variant="secondary" className="bg-yellow-100 text-yellow-800">
                              {honor}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(edu)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(edu.id)} className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </motion.div>

      {/* Education Form Dialog */}
      <EducationFormDialog
        isOpen={isDialogOpen}
        onClose={() => { setIsDialogOpen(false); setEditingEducation(null); }}
        onSave={handleSave}
        initialData={editingEducation ? {
          school: editingEducation.school,
          degree: editingEducation.degree,
          start_year: editingEducation.start_year,
          end_year: editingEducation.end_year,
          honors: editingEducation.honors || [],
        } : undefined} // <-- undefined instead of null
      />
    </div>
  );
} 
