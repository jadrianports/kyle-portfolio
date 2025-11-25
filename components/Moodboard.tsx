import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const moodboardImages = [
  {
    url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=300&fit=crop",
    label: "Minimalist Design",
  },
  {
    url: "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?w=400&h=300&fit=crop",
    label: "Feminine Aesthetic",
  },
  {
    url: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400&h=300&fit=crop",
    label: "Pink Color Palette",
  },
  {
    url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop",
    label: "Modern Workspace",
  },
  {
    url: "https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?w=400&h=300&fit=crop",
    label: "Brand Typography",
  },
  {
    url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    label: "Creative Mockups",
  },
];

export const Moodboard = () => {
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
            Brand Aesthetic
          </h2>
          <p className="text-muted-foreground text-lg">
            Visual inspiration and style choices that define my brand
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {moodboardImages.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <motion.div
                whileHover={{ y: -10, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="overflow-hidden bg-gradient-to-br from-background to-muted/30 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg group">
                  <div className="relative h-64 overflow-hidden">
                    <motion.img
                      src={item.url}
                      alt={item.label}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    />
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent flex items-end"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="p-4 text-foreground font-medium">{item.label}</p>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Color Palette */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="mt-12 p-8 bg-gradient-to-br from-background to-muted/30 border-primary/20 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-8 text-foreground">Color Palette</h3>
            <div className="grid grid-cols-5 gap-4">
              {[
                { color: "#FFB6C1", name: "Rose Pink" },
                { color: "#FFC0CB", name: "Blush" },
                { color: "#F7E7CE", name: "Champagne" },
                { color: "#FF9B9B", name: "Coral" },
                { color: "#0A0A0A", name: "Deep Black" }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                >
                  <motion.div 
                    className="w-full h-24 rounded-lg"
                    style={{ backgroundColor: item.color }}
                    whileHover={{ rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                  <p className="text-xs text-center text-muted-foreground">{item.name}</p>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
