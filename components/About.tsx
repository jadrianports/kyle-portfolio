"use client";
import { useEffect, useState } from "react";
import { Heart, Sparkles, Target, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import DOMPurifyModule from "dompurify";


type WorkflowStep = { step: string; title: string; desc: string };
type UniqueTrait = { icon: any; title: string; desc: string };
const funFacts = [{ icon: Heart, label: "Favorite Color", value: "Rose Pink" }, { icon: Sparkles, label: "Favorite Tool", value: "Canva & Notion" }, { icon: Target, label: "Marketing Style", value: "Data-Driven Creative" }, { icon: Zap, label: "Superpower", value: "Viral Content Creation" },];


export const About = () => {
  const [workflow, setWorkflow] = useState<WorkflowStep[]>([]);
  const [uniqueTraits, setUniqueTraits] = useState<UniqueTrait[]>([]);
  const [myStory, setMyStory] = useState<string>("");
  const [marketingPhilosophy, setMarketingPhilosophy] = useState("");

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await fetch("/api/hero");
        const json = await res.json();

        if (res.ok && json.data) {
          const data = json.data; // <-- actually get your hero data
          // Use default export if needed
          const DOMPurify = (DOMPurifyModule as any).default || DOMPurifyModule;
          const iconMap: Record<string, any> = { Heart, Sparkles, Target, Zap };
          // Convert array to string and sanitize
          const rawStory = Array.isArray(data.my_story) ? data.my_story.join("") : data.my_story || "";
          setMyStory(DOMPurify.sanitize(rawStory));
          setMarketingPhilosophy(data.marketing_philosophy || "");
          setWorkflow(data.marketing_approach || []);
          setUniqueTraits(
            (data.unique_traits || []).map((t: any) => ({
              ...t,
              icon: iconMap[t.icon] || Sparkles, // fallback
            }))
          );
        } else {
          console.error("Error fetching hero:", json.error);
        }
      } catch (err) {
        console.error("Error fetching hero:", err);
      }
    };

    fetchHero();
  }, []);

  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Marketing enthusiast with a passion for creating meaningful connections between brands and people
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="p-8 bg-gradient-to-br from-background to-muted/30 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg h-full">
                <h3 className="text-2xl font-bold mb-4 text-primary">My Story</h3>
                <motion.div
                  className="text-muted-foreground space-y-4"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div
                    dangerouslySetInnerHTML={{ __html: myStory }}
                  />
                </motion.div>
              </Card>
            </motion.div>
          </motion.div>

          {/* Fun Facts */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="p-8 bg-gradient-to-br from-background to-muted/30 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg h-full">
                <h3 className="text-2xl font-bold mb-6 text-primary">Fun Facts About Me</h3>
                <div className="grid grid-cols-2 gap-4">
                  {funFacts.map((fact, index) => (
                    <motion.div
                      key={index}
                      className="p-4 rounded-xl bg-primary/5 hover:bg-primary/10 transition-all duration-300"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, rotate: 2 }}
                    >
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <fact.icon className="w-6 h-6 text-primary mb-2" />
                      </motion.div>
                      <p className="text-xs text-muted-foreground mb-1">{fact.label}</p>
                      <p className="font-semibold text-foreground text-sm">{fact.value}</p>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  className="mt-6 p-6 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <h4 className="font-semibold text-foreground mb-2">Marketing Philosophy</h4>
                  <p className="text-sm text-muted-foreground italic">
                    "{marketingPhilosophy}"
                  </p>
                </motion.div>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* Marketing Workflow */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            My Marketing Approach
          </h3>
          <div className="grid md:grid-cols-5 gap-4">
            {workflow.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div
                  whileHover={{ y: -10, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="p-6 bg-gradient-to-br from-background to-muted/30 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg text-center h-full">
                    <motion.div
                      className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white font-bold text-lg mx-auto mb-3"
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                    >
                      {item.step}
                    </motion.div>
                    <h4 className="font-bold text-foreground mb-2">{item.title}</h4>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* What Makes Me Unique */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <h3 className="text-2xl font-bold mb-6 text-center text-primary">What Makes Me Unique</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {uniqueTraits.map((item, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                >
                  <motion.div
                    className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center mx-auto mb-4"
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                  >
                    <item.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
