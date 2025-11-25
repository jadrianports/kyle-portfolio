"use client"
import { useEffect, useState } from "react";
import { motion, Reorder } from "framer-motion";
import { Plus, Edit, Trash2, GripVertical, Save } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProjectFormDialog } from "@/admincomponents/dialog/ProjectFormDialog";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";


interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  metrics?: string[];
  deliverables: string[];
}


export default function ProjectsEditor() {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Fetch testimonials from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/project"); // <-- FIXED
        if (!res.ok) throw new Error("Failed to fetch projects");

        const json = await res.json();
        if (json.data) {
          setProjects(json.data);
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
        toast({ title: "⚠️ Failed to fetch projects" });
      }
    };

    fetchProjects();
  }, []);

  const handleAdd = () => {
    setEditingProject(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsDialogOpen(true);
  };

  const handleSave = async (data: Omit<Project, "id">) => {
  try {
    const endpoint = editingProject
      ? "/api/project/update"
      : "/api/project/create";
    const body = editingProject ? { id: editingProject.id, ...data } : data;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const json = await res.json();
    if (!res.ok) throw new Error(json.error?.message || "Failed to save project");

    if (editingProject) {
      setProjects(
        projects.map((p) =>
          p.id === editingProject.id ? { ...p, ...data } : p
        )
      );
      toast({ title: "✨ Project updated!" });
    } else {
      setProjects([json.data, ...projects]);
      toast({ title: "✨ Project added!" });
    }
  } catch (err: any) {
    console.error("Error saving project:", err);
    toast({ title: "⚠️ Failed to save project" });
  } finally {
    setIsDialogOpen(false);
    setEditingProject(null);
  }
};


  const handleDelete = (id: string) => {
    if (confirm("Delete this project? This cannot be undone.")) {
      setProjects(projects.filter(p => p.id !== id));
      toast({ title: "Project deleted" });
    }
  };

  const handleSaveOrder = () => {
    // TODO: Save new order to backend
    toast({ title: "✨ Project order saved!" });
  };

  return (
    <>
      <div className="p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Projects / Case Studies</h1>
              <p className="text-muted-foreground">
                Manage your portfolio projects • Drag to reorder
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleSaveOrder}>
                <Save className="mr-2 h-4 w-4" />
                Save Order
              </Button>
              <Button onClick={handleAdd} className="bg-gradient-to-r from-rose to-hot-pink">
                <Plus className="mr-2 h-4 w-4" />
                Add Project
              </Button>
            </div>
          </div>

          {/* Drag & Drop List */}
          <Reorder.Group axis="y" values={projects} onReorder={setProjects} className="space-y-4">
            {projects.map((project) => (
              <Reorder.Item key={project.id} value={project}>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="cursor-move"
                >
                  <Card className="hover:shadow-lg transition-all border-primary/20">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <GripVertical className="w-6 h-6 text-muted-foreground mt-1 flex-shrink-0" />

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <CardTitle className="text-xl">{project.title}</CardTitle>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEdit(project)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDelete(project.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          <CardDescription className="mb-3">
                            {project.description}
                          </CardDescription>

                          <div className="flex flex-wrap gap-2 mb-3">
                            {project.deliverables.map((d, idx) => (
                              <Badge key={idx} variant="secondary" className="bg-primary/10">
                                {d}
                              </Badge>
                            ))}
                          </div>

                          {project.metrics && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {Object.entries(project.metrics).map(([key, value]) => (
                                <span
                                  key={key}
                                  className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
                                >
                                  <span className="font-semibold capitalize">{key}:</span> {value}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </motion.div>
              </Reorder.Item>
            ))}
          </Reorder.Group>

          {projects.length === 0 && (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground mb-4">
                No projects yet. Start building your portfolio!
              </p>
              <Button onClick={handleAdd}>
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Project
              </Button>
            </Card>
          )}
        </motion.div>
      </div>

      {/* Project Form Dialog */}
      <ProjectFormDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setEditingProject(null);
        }}
        onSave={handleSave}
        initialData={editingProject}
      />
    </>
  );
}