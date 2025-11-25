"use client";

import { useState, useEffect } from "react";
import { motion, Reorder } from "framer-motion";
import { Plus, Edit, Trash2, GripVertical, Save, Briefcase } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ExperienceFormDialog, ExperienceFormData } from "@/admincomponents/dialog/ExperienceFormDialog";

interface Experience {
  id: string;
  company: string;
  role: string;
  start_date: string;
  end_date: string;
  currently_working: boolean;
  description: string;
  highlights: string[];
  platform_tools: string[];
}

export default function ExperienceEditor() {
  const { toast } = useToast();

  const [experience, setExperience] = useState<Experience[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);

  // Fetch experiences (publicly)
  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await fetch("/api/experience");
        const json = await res.json();
        if (json.data) {
          // Ensure highlights and platform_tools are arrays
          const data: Experience[] = json.data.map((exp: any) => ({
            ...exp,
            highlights: exp.highlights || [],
            platform_tools: exp.platform_tools || [],
          }));
          setExperience(data);
        }
      } catch (err) {
        console.error("Error fetching experiences:", err);
      }
    };
    fetchExperience();
  }, []);

  const handleAdd = () => {
    setEditingExperience(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (exp: Experience) => {
    setEditingExperience(exp);
    setIsDialogOpen(true);
  };

  //Save Experience (Create or Update)
  const handleSave = async (formData: ExperienceFormData) => {
    try {
      const endpoint = editingExperience ? "/api/experience/update" : "/api/experience/create";
      const body = editingExperience
        ? { id: editingExperience.id, ...formData }
        : formData;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error?.message || "Failed to save experience");

      if (editingExperience) {
        setExperience(experience.map(e => e.id === editingExperience.id ? { ...e, ...formData, highlights: formData.highlights || [], platform_tools: formData.platform_tools || [] } : e));
        toast({ title: "✨ Experience updated!" });
      } else {
        const newExp: Experience = {
          ...json.data,
          highlights: json.data.highlights || [],
          platform_tools: json.data.platform_tools || [],
        };
        setExperience([json.data, ...experience]);
        toast({ title: "✨ Experience added!" });
      }
    } catch (err: any) {
      console.error("Error saving experience:", err);
      toast({ title: "⚠️ Failed to save", description: err.message });
    } finally {
      setIsDialogOpen(false);
      setEditingExperience(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this experience entry?")) return;
    try {
      const res = await fetch("/api/experience/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error?.message || "Failed to delete experience");

      setExperience(experience.filter(e => e.id !== id));
      toast({ title: "Experience deleted" });
    } catch (err: any) {
      console.error("Error deleting experience:", err);
      toast({ title: "⚠️ Failed to delete", description: err.message });
    }
  };

  const formatDateRange = (start: string, end: string, currently_working: boolean) => {
    const startYear = new Date(start).getFullYear();
    const endYear = currently_working ? "Present" : new Date(end).getFullYear();
    return `${startYear} - ${endYear}`;
  };

  return (
    <div className="p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Work Experience</h1>
            <p className="text-muted-foreground">Manage your professional background • Drag to reorder</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => toast({ title: "Save order feature coming soon" })}>
              <Save className="mr-2 h-4 w-4" /> Save Order
            </Button>
            <Button onClick={handleAdd} className="bg-gradient-to-r from-rose to-hot-pink">
              <Plus className="mr-2 h-4 w-4" /> Add Experience
            </Button>
          </div>
        </div>

        {/* Drag & Drop List */}
        <Reorder.Group axis="y" values={experience} onReorder={setExperience} className="space-y-4">
          {experience.map((exp) => (
            <Reorder.Item key={exp.id} value={exp}>
              <motion.div whileHover={{ scale: 1.01 }} className="cursor-move">
                <Card className="hover:shadow-lg transition-all border-primary/20">
                  <CardHeader className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <GripVertical className="w-6 h-6 text-muted-foreground mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Briefcase className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-xl">{exp.role}</CardTitle>
                            <p className="text-muted-foreground font-medium">{exp.company}</p>
                            <p className="text-sm text-muted-foreground">{formatDateRange(exp.start_date, exp.end_date, exp.currently_working)}</p>
                          </div>
                        </div>

                        <CardDescription className="mb-2">{exp.description}</CardDescription>

                        {exp.highlights.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-2">
                            {exp.highlights.map((hl, i) => (
                              <Badge key={i} variant="secondary" className="bg-yellow-100 text-yellow-800">{hl}</Badge>
                            ))}
                          </div>
                        )}

                        {exp.platform_tools.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {exp.platform_tools.map((tool, i) => (
                              <Badge key={i} variant="secondary" className="bg-blue-100 text-blue-800">{tool}</Badge>
                            ))}
                          </div>
                        )}

                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(exp)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(exp.id)} className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            </Reorder.Item>
          ))}
        </Reorder.Group>

        {experience.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground mb-4">No experience entries yet. Add your professional background!</p>
            <Button onClick={handleAdd}>
              <Plus className="mr-2 h-4 w-4" /> Add Your First Experience
            </Button>
          </Card>
        )}
      </motion.div>

      {/* Experience Form Dialog */}
      <ExperienceFormDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setEditingExperience(null);
        }}
        onSave={handleSave}
        initialData={editingExperience ? {
          company: editingExperience.company,
          role: editingExperience.role,
          start_date: editingExperience.start_date,
          end_date: editingExperience.end_date,
          currently_working: editingExperience.currently_working,
          description: editingExperience.description,
          highlights: editingExperience.highlights,
          platform_tools: editingExperience.platform_tools
        } : undefined}
      />
    </div>
  );
}
