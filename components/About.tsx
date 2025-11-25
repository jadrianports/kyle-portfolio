import { Heart, Sparkles, Target, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const funFacts = [
  { icon: Heart, label: "Favorite Color", value: "Rose Pink" },
  { icon: Sparkles, label: "Favorite Tool", value: "Canva & Notion" },
  { icon: Target, label: "Marketing Style", value: "Data-Driven Creative" },
  { icon: Zap, label: "Superpower", value: "Viral Content Creation" },
];

const workflow = [
  { step: "01", title: "Research", desc: "Deep dive into market & audience" },
  { step: "02", title: "Ideation", desc: "Creative brainstorming sessions" },
  { step: "03", title: "Creation", desc: "Crafting compelling content" },
  { step: "04", title: "Execution", desc: "Launch & optimize campaigns" },
  { step: "05", title: "Analysis", desc: "Measure, learn & iterate" },
];

export const About = () => {
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
                <div className="space-y-4 text-muted-foreground">
                  {[
                    "Hi there! I'm a marketing professional who believes in the power of authentic storytelling and creative strategy. With over 5+ years in the digital marketing space, I've had the privilege of working with amazing brands and helping them grow their online presence.",
                    "What drives me? It's the thrill of seeing a campaign come to life and connect with people in meaningful ways. I'm not just about the numbers (though I love a good analytics dashboard!) – I'm about creating content that resonates, inspires, and drives real results.",
                    "When I'm not crafting the perfect Instagram caption or analyzing campaign metrics, you'll find me exploring new creative tools, staying updated with the latest marketing trends, and probably making mood boards for fun!"
                  ].map((text, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.2 }}
                    >
                      {text}
                    </motion.p>
                  ))}
                </div>
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
                    "Great marketing isn't about selling products – it's about telling stories that make 
                    people feel something, think differently, and take action."
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
              {[
                { icon: Sparkles, title: "Creative + Strategic", desc: "Perfect blend of right-brain creativity and left-brain analytics" },
                { icon: Target, title: "Results-Focused", desc: "Every campaign is measured, optimized, and improved" },
                { icon: Heart, title: "Authentic Voice", desc: "Building genuine connections through honest storytelling" },
                { icon: Zap, title: "Adaptable", desc: "Thrives in fast-paced, ever-changing digital landscapes" },
                { icon: Sparkles, title: "Lifelong Learner", desc: "Constantly evolving with the latest marketing trends and tools" },
              ].map((item, index) => (
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
