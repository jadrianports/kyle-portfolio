"use client";

import { useState, useEffect } from "react";
import { Briefcase, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  start_date: string; // ISO string from DB
  end_date: string | null; // null if currently_working
  currently_working: boolean;
  description: string;
  highlights: string[];
  platform_tools: string[];
  period?: string;       // added dynamically
  platforms?: string;    // added dynamically
}

export const Experience = () => {
  const [experiences, setExperiences] = useState<ExperienceEntry[]>([]);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await fetch("/api/experience"); // public GET route
        const json = await res.json();
        if (res.ok) {
          // Format the dates for display
          const formatted = json.data.map((exp: ExperienceEntry) => {
            const start = new Date(exp.start_date);
            const startMonth = start.toLocaleString("en-US", { month: "long" }); // e.g., "November"
            const startYear = start.getFullYear();

            let endStr;
            if (exp.currently_working || !exp.end_date) {
              endStr = "Present";
            } else {
              const end = new Date(exp.end_date);
              const endMonth = end.toLocaleString("en-US", { month: "long" }); // e.g., "March"
              const endYear = end.getFullYear();
              endStr = `${endMonth} ${endYear}`;
            }

            return {
              ...exp,
              period: `${startMonth} ${startYear} - ${endStr}`,
              platforms: exp.platform_tools.join(", "),
            };
          });
          setExperiences(formatted);
        } else {
          throw json.error;
        }
      } catch (err) {
        console.error("Error fetching experience:", err);
      }
    };

    fetchExperience();
  }, []);

  return (
    <section id="experience" className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Work Experience
          </h2>
          <p className="text-muted-foreground text-lg">
            My professional journey in digital marketing
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Animated Timeline line */}
            <motion.div
              className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary hidden md:block"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
            />

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  {/* Animated Timeline dot */}
                  <motion.div
                    className="absolute left-6 top-8 w-5 h-5 rounded-full bg-gradient-to-r from-primary to-accent border-4 border-background hidden md:block"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.3, type: "spring", stiffness: 300 }}
                    whileHover={{ scale: 1.5 }}
                  />

                  <motion.div
                    whileHover={{ x: 5, scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className="md:ml-20 p-8 bg-gradient-to-br from-background to-muted/30 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg">
                      <div className="flex items-start gap-4 mb-4">
                        <motion.div
                          className="flex-shrink-0"
                          whileHover={{ rotate: 360, scale: 1.2 }}
                          transition={{ duration: 0.6 }}
                        >
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                            <Briefcase className="w-6 h-6 text-white" />
                          </div>
                        </motion.div>

                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                            <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                            <div className="flex items-center gap-2 text-sm text-primary font-medium">
                              <Calendar className="w-4 h-4" />
                              <span>{exp.period}</span>
                            </div>
                          </div>

                          <p className="text-lg font-medium text-muted-foreground mb-2">{exp.company}</p>
                          <p className="text-foreground/80 mb-4">{exp.description}</p>

                          <div className="space-y-2 mb-4">
                            {exp.highlights.map((highlight, idx) => (
                              <motion.div
                                key={idx}
                                className="flex items-start gap-2"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ x: 5 }}
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                <span className="text-sm text-foreground">{highlight}</span>
                              </motion.div>
                            ))}
                          </div>

                          <motion.div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm"
                            whileHover={{ scale: 1.05 }}
                          >
                            <span className="font-medium">Platforms:</span>
                            <span>{exp.platforms}</span>
                          </motion.div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
