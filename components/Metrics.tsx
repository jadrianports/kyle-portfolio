import { TrendingUp, Users, Target, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const metrics = [
  {
    icon: TrendingUp,
    value: "5+",
    label: "Years Experience",
    color: "from-primary to-accent",
  },
  {
    icon: Users,
    value: "50+",
    label: "Happy Clients",
    color: "from-accent to-primary",
  },
  {
    icon: Target,
    value: "100+",
    label: "Campaigns Launched",
    color: "from-primary to-accent",
  },
  {
    icon: Award,
    value: "10M+",
    label: "Total Reach Generated",
    color: "from-accent to-primary",
  },
];

export const Metrics = () => {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            By The Numbers
          </h2>
          <p className="text-muted-foreground text-lg">
            Measurable impact through strategic marketing
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: index * 0.1,
                type: "spring",
                stiffness: 200,
                damping: 15
              }}
            >
              <motion.div
                whileHover={{ y: -10, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="p-8 bg-gradient-to-br from-background to-muted/30 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg text-center group">
                  <motion.div 
                    className={`w-16 h-16 rounded-full bg-gradient-to-r ${metric.color} flex items-center justify-center mx-auto mb-4`}
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                  >
                    <metric.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <motion.div 
                    className="text-4xl font-bold text-primary mb-2"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 300 }}
                  >
                    {metric.value}
                  </motion.div>
                  <p className="text-muted-foreground font-medium">{metric.label}</p>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
