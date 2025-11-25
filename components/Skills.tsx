"use client";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

interface Skill {
  name: string;
  level: number;
  category?: string; // optional for soft skills
}

interface CategoryRow {
  category: string;
  items: Skill[];
}

export const Skills = () => {
  const [skills, setSkills] = useState<Record<string, Skill[]>>({});
  const [softSkills, setSoftSkills] = useState<Skill[]>([]);
   // Fetch data from your API
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await fetch("/api/skilltool"); // endpoint should return { data: CategoryRow[] }
        const json = await res.json();
        if (!json.data) return;

        const mapped: Record<string, Skill[]> = {};
        const soft: Skill[] = [];

        json.data.forEach((row: CategoryRow) => {
          if (row.category.toLowerCase() === "soft skills") {
            soft.push(...row.items);
          } else {
            mapped[row.category] = row.items;
          }
        });

        setSkills(mapped);
        setSoftSkills(soft);
      } catch (err) {
        console.error("Error fetching skills:", err);
      }
    };

    fetchSkills();
  }, []);

  const categories = Object.keys(skills);
  
  const formatCategoryName = (name: string) => {
  const exceptions: Record<string, string> = {
    "ai tools": "AI Tools"
  };

  const lower = name.toLowerCase();
  if (exceptions[lower]) return exceptions[lower];

  return name
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

  return (
    <section id="skills" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Tools & Skills
          </h2>
          <p className="text-muted-foreground text-lg">
            My marketing toolkit for creating exceptional campaigns
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto space-y-12">
          {/* Tools by Category */}
          <div>
            <h3 className="text-2xl font-bold text-center mb-8 text-foreground">Technical Tools</h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              {categories.map((category, catIndex) => {
                const categoryTools = skills[category];
                if (categoryTools.length === 0) return null;
                
                return (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: catIndex * 0.1 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Card className="p-6 bg-gradient-to-br from-background to-muted/30 border-primary/20 h-full">
                        <h4 className="text-lg font-semibold text-primary mb-4">{formatCategoryName(category)}</h4>
                        <div className="space-y-4">
                          {categoryTools.map((tool, idx) => (
                            <motion.div 
                              key={tool.name}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: idx * 0.1 }}
                            >
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-foreground">{tool.name}</span>
                                <motion.span 
                                  className="text-sm font-bold text-primary"
                                  initial={{ opacity: 0 }}
                                  whileInView={{ opacity: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: idx * 0.1 + 0.2 }}
                                >
                                  {tool.level}%
                                </motion.span>
                              </div>
                              <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 + 0.3, duration: 0.8 }}
                                style={{ originX: 0 }}
                              >
                                <Progress value={tool.level} className="h-2" />
                              </motion.div>
                            </motion.div>
                          ))}
                        </div>
                      </Card>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Soft Skills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-center mb-8 text-foreground">Soft Skills</h3>
            
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="p-8 bg-gradient-to-br from-background to-muted/30 border-primary/20 max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-6">
                  {softSkills.map((skill, index) => (
                    <motion.div 
                      key={skill.name}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-foreground">{skill.name}</span>
                        <span className="text-sm font-bold text-primary">{skill.level}%</span>
                      </div>
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.2, duration: 0.8 }}
                        style={{ originX: 0 }}
                      >
                        <Progress value={skill.level} className="h-2" />
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </motion.div>

          {/* Skill Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/30">
              <h3 className="text-xl font-bold text-center mb-6 text-foreground">What I Excel At</h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                {[
                  { value: "97%", label: "Creativity Score" },
                  { value: "10+", label: "Tools Mastered" },
                  { value: "95%", label: "Client Satisfaction" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15, type: "spring", stiffness: 300 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                  >
                    <div className="text-4xl font-bold text-primary mb-2">{item.value}</div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
