import { Instagram, Megaphone, Palette, TrendingUp, BarChart3, PenTool, Sparkles, Target } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const services = [
  {
    icon: Instagram,
    title: "Social Media Management",
    description: "End-to-end social media strategy and execution",
    deliverables: ["Content calendar creation", "Community management", "Performance analytics"],
  },
  {
    icon: Sparkles,
    title: "Content Strategy",
    description: "Strategic content planning that drives engagement",
    deliverables: ["Content audits", "Editorial calendars", "Multi-platform strategies"],
  },
  {
    icon: Palette,
    title: "Branding & Identity",
    description: "Building memorable brand experiences",
    deliverables: ["Brand positioning", "Visual identity", "Brand guidelines"],
  },
  {
    icon: Megaphone,
    title: "Paid Advertising",
    description: "ROI-focused campaign management across platforms",
    deliverables: ["Campaign strategy", "Ad creation", "Budget optimization"],
  },
  {
    icon: BarChart3,
    title: "Marketing Analytics",
    description: "Data-driven insights for better decisions",
    deliverables: ["Performance tracking", "Custom dashboards", "Growth recommendations"],
  },
  {
    icon: PenTool,
    title: "Copywriting",
    description: "Compelling copy that converts",
    deliverables: ["Ad copy", "Website content", "Email campaigns"],
  },
  {
    icon: TrendingUp,
    title: "Growth Marketing",
    description: "Scalable strategies for sustainable growth",
    deliverables: ["Growth audits", "A/B testing", "Conversion optimization"],
  },
  {
    icon: Target,
    title: "Creative Direction",
    description: "Visionary creative leadership for campaigns",
    deliverables: ["Creative concepts", "Brand storytelling", "Campaign execution"],
  },
];

export const Services = () => {
  return (
    <section id="services" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Services
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comprehensive marketing solutions tailored to elevate your brand
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
            >
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="p-6 bg-gradient-to-br from-background to-muted/30 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg group relative overflow-hidden h-full">
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 + 0.2 }}
                  />
                  
                  <motion.div 
                    className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center mb-4"
                    whileHover={{ 
                      rotate: 360,
                      scale: 1.2,
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <service.icon className="w-7 h-7 text-white" />
                  </motion.div>

                  <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-4">
                    {service.description}
                  </p>

                  <div className="space-y-2">
                    {service.deliverables.map((deliverable, idx) => (
                      <motion.div 
                        key={idx} 
                        className="flex items-start gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                        <span className="text-xs text-foreground/80">{deliverable}</span>
                      </motion.div>
                    ))}
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
