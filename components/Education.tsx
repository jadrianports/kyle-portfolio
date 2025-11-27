"use client";
import { useState, useEffect } from "react";
import { GraduationCap, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import type { EducationEntry } from "@/lib/getPortfolioData";

interface EducationProps {
  education: EducationEntry[];
}

export const Education = ({education}: EducationProps) => {
  return (
    <section id="education" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Education
          </h2>
          <p className="text-muted-foreground text-lg">
            Building a strong foundation for marketing excellence
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="p-8 bg-gradient-to-br from-background to-muted/30 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-start gap-6">
                    <motion.div 
                      className="flex-shrink-0"
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                        <GraduationCap className="w-8 h-8 text-white" />
                      </div>
                    </motion.div>

                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                        <h3 className="text-xl font-bold text-foreground">{edu.degree}</h3>
                        <motion.span 
                          className="text-sm text-primary font-medium"
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 }}
                        >
                          {edu.year}
                        </motion.span>
                      </div>
                      
                      <p className="text-muted-foreground mb-4">{edu.school}</p>

                      <div className="space-y-2">
                        {edu.honors.map((honors, idx) => (
                          <motion.div 
                            key={idx} 
                            className="flex items-center gap-2"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ x: 5 }}
                          >
                            <Award className="w-4 h-4 text-primary flex-shrink-0" />
                            <span className="text-sm text-foreground">{honors}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
