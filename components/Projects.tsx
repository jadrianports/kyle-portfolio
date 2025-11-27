"use client"
import { useState } from "react";
import { ExternalLink, TrendingUp, Users, Eye, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import type { Project } from "@/lib/getPortfolioData";

interface ProjectsProps {
  projects: Project[];
}

export const Projects = ({ projects }: ProjectsProps)  => {
const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  console.log("Fetched projects:", projects);
  return (
    <>
      <section id="projects" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-muted-foreground text-lg">
              Case studies showcasing measurable results and creative excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {projects.map((project: Project, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card
                    className="group overflow-hidden bg-gradient-to-br from-background to-muted/30 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-xl cursor-pointer relative"
                    onClick={() => setSelectedProject(project)}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 z-10 pointer-events-none"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />

                    <div className="relative h-64 overflow-hidden">
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                      <div className="absolute top-4 right-4">
                        <motion.span
                          className="px-3 py-1 bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs rounded-full font-medium"
                          whileHover={{ scale: 1.1 }}
                        >
                          {project.category}
                        </motion.span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 text-sm">
                        {project.description}
                      </p>

                      <div className="grid grid-cols-3 gap-4 mb-4">
                        {Object.entries(project.metrics ?? {}).map(([key, value], idx) => (
                          <motion.div
                            key={key}
                            className="text-center"
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + idx * 0.1 }}
                          >
                            <div className="text-2xl font-bold text-primary">{value}</div>
                            <div className="text-xs text-muted-foreground capitalize">{key}</div>
                          </motion.div>
                        ))}
                      </div>

                      <Button
                        variant="ghost"
                        className="w-full group-hover:bg-primary/10 transition-colors"
                      >
                        View Case Study
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Details Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold gradient-text">
                  {selectedProject.title}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover rounded-lg"
                />

                <div>
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium mb-4">
                    {selectedProject.category}
                  </span>
                  <div
                    className="prose-compact"
                    dangerouslySetInnerHTML={{ __html: selectedProject.details }}
                  />
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-4 text-foreground">Key Results</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(selectedProject.metrics).map(([key, value]) => (
                      <Card key={key} className="p-4 text-center bg-primary/5 border-primary/20">
                        <div className="text-3xl font-bold text-primary mb-1">{value}</div>
                        <div className="text-sm text-muted-foreground capitalize">{key}</div>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-3 text-foreground">Deliverables</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedProject.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-foreground/80">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
