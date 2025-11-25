import { Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const certifications = [
  {
    title: "Google Ads Certification",
    issuer: "Google",
    year: "2023",
    description: "Search, Display, and Video Advertising",
  },
  {
    title: "Meta Blueprint Certification",
    issuer: "Meta (Facebook)",
    year: "2023",
    description: "Instagram and Facebook Marketing",
  },
  {
    title: "HubSpot Content Marketing",
    issuer: "HubSpot Academy",
    year: "2022",
    description: "Content Strategy and Creation",
  },
  {
    title: "Digital Marketing Professional",
    issuer: "Digital Marketing Institute",
    year: "2022",
    description: "Comprehensive Digital Marketing",
  },
  {
    title: "Social Media Marketing",
    issuer: "Hootsuite Academy",
    year: "2021",
    description: "Social Media Strategy",
  },
  {
    title: "Google Analytics Certification",
    issuer: "Google",
    year: "2021",
    description: "Analytics and Reporting",
  },
];

export const Certifications = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Certifications
          </h2>
          <p className="text-muted-foreground text-lg">
            Continuously learning and staying ahead of industry trends
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, rotate: -5 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <motion.div
                whileHover={{ y: -10, rotate: 2, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="p-6 bg-gradient-to-br from-background to-muted/30 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg h-full">
                  <div className="flex items-start gap-4">
                    <motion.div 
                      className="flex-shrink-0"
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                    </motion.div>

                    <div className="flex-1">
                      <h3 className="font-bold text-foreground mb-1">{cert.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{cert.issuer} • {cert.year}</p>
                      <p className="text-xs text-foreground/70">{cert.description}</p>
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
