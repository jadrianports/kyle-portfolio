"use client"

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Save } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";

interface Skill {
  id: string;
  name: string;
  level: number;
}

interface CategoryRow {
  id: string;
  category: string;
  items: Skill[];
}

export default function SkillsToolsEditor() {
  const [skills, setSkills] = useState<Record<string, Skill[]>>({});
  // const [editingSkill, setEditingSkill] = useState<{ category: string; skill: Skill } | null>(null);
  const [newSkillName, setNewSkillName] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newSkillNames, setNewSkillNames] = useState<Record<string, string>>({});


  // Fetch skills and tools (publicly)
  useEffect(() => {
    const fetchSkillTools = async () => {
      try {
        const res = await fetch("/api/skilltool");
        const json = await res.json();
        if (!json.data) return;
        const mapped: Record<string, Skill[]> = {};

        json.data.forEach((row: any) => {
          const key = row.category.toLowerCase();
          mapped[key] = row.items.map((item: any, index: number) => ({
            id: `${key}-${index}`,
            name: item.name,
            level: item.level,
          }));
        });

        setSkills(mapped);
      } catch (err) {
        console.error("Error fetching skills:", err);
      }
    };
    fetchSkillTools();
  }, []);

  const handleAddCategory = () => {
    const key = newCategoryName.trim().toLowerCase();
    if (!key) return;

    if (skills[key]) {
      toast.error("Category already exists!");
      return;
    }

    setSkills(prev => ({
      ...prev,
      [key]: []
    }));

    setNewCategoryName("");
    toast.success("✨ Category added!" );
  };

  const handleAdd = (category: string, name: string) => {
    if (!name.trim()) return;
    const newSkill: Skill = {
      id: Date.now().toString(),
      name,
      level: 50,
    };
    setSkills(prev => ({
      ...prev,
      [category]: [...(prev[category] || []), newSkill],
    }));
    toast.success( "✨ Tool added!" );
  };

  const handleDelete = (category: string, id: string) => {
    if (confirm("Delete this tool? This cannot be undone.")) {
      setSkills(prev => ({
        ...prev,
        [category]: prev[category].filter(s => s.id !== id),
      }));
      toast.success("Tool deleted" );
    }
  };

  // Save all changes to DB
  const handleSaveAll = async () => {
    try {
      const dbRes = await fetch("/api/skilltool");
      const dbJson = await dbRes.json();
      const dbCategories = dbJson.data.map((row: any) => row.category.toLowerCase());
      const currentCategories = Object.entries(skills);

      //Find categories that exist in DB but not in UI state => DELETE
      const categoriesToDelete = dbCategories.filter((cat: string) => !currentCategories.some(([c]) => c === cat));

      for (const category of categoriesToDelete) {
        const res = await fetch("/api/skilltool/delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ category }),
        });
      }

      for (const [category, skillList] of currentCategories) {
        // Skip empty categories if you want
        if (!skillList.length) continue;

        const res = await fetch("/api/skilltool/update", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            category,
            items: skillList.map(s => ({
              name: s.name,
              level: s.level, // Use level here
            })),
          }),
        });

        const json = await res.json();
        if (!res.ok) {
          console.error(`Failed to save category: ${category}`, json.error);
          toast.error( `Failed to save category: ${category}`);
        }
      }

      toast.success("✨ All categories and tools saved!");
    } catch (err) {
      console.error("Error saving skills:", err);
      toast.error("Error saving skills");
    }
  };
  console.log(skills);
  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Skills & Tools</h1>
            <p className="text-muted-foreground">
              Manage your skills and tools • Set proficiency levels
            </p>
          </div>
          <Button onClick={handleSaveAll} className="bg-gradient-to-r from-rose to-hot-pink">
            <Save className="mr-2 h-4 w-4" />
            Save All
          </Button>
        </div>

        <div className="flex gap-2 mb-6">
          <Input
            placeholder="New category name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
          <Button onClick={handleAddCategory} disabled={!newCategoryName.trim()}>
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        </div>

        {/* Categories */}
        <div className="space-y-8">
          {Object.keys(skills).map(category => (
            <Card key={category} className="border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="capitalize">{category}</CardTitle>
                    <CardDescription>
                      Add and manage tools in this category
                    </CardDescription>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:bg-destructive/10"
                    onClick={() => {
                      if (confirm(`Delete the entire "${category}" category?`)) {
                        setSkills(prev => {
                          const updated = { ...prev };
                          delete updated[category];
                          return updated;
                        });
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skills[category]?.map(skill => (
                    <div key={skill.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="flex-1">
                        <Input
                          value={skill.name}
                          onChange={(e) =>
                            setSkills(prev => ({
                              ...prev,
                              [category]: prev[category].map(s =>
                                s.id === skill.id ? { ...s, name: e.target.value } : s
                              ),
                            }))
                          }
                          className="mb-2"
                        />
                        <div className="flex items-center gap-2 mt-2">
                          <Label className="text-sm">Proficiency:</Label>
                          <Slider
                            value={[skill.level]}
                            onValueChange={(value) =>
                              setSkills(prev => ({
                                ...prev,
                                [category]: prev[category].map(s =>
                                  s.id === skill.id ? { ...s, level: value[0] } : s
                                ),
                              }))
                            }
                            max={100}
                            step={1}
                            className="flex-1"
                          />
                          <span className="text-sm font-medium">{skill.level}%</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(category, skill.id)} className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <Input
                      placeholder="New tool name"
                      value={newSkillNames[category] || ""}
                      onChange={(e) =>
                        setNewSkillNames(prev => ({ ...prev, [category]: e.target.value }))
                      }
                    />
                    <Button
                      onClick={() => {
                        handleAdd(category, newSkillNames[category] || "");
                        setNewSkillNames(prev => ({ ...prev, [category]: "" }));
                      }}
                      disabled={!newSkillNames[category]?.trim()}
                    >
                      <Plus className="mr-2 h-4 w-4" /> Add Tool
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
