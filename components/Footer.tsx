import { useEffect, useState } from "react";
import { Heart, Instagram, Linkedin, Facebook, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const quickLinks = [
  { name: "About", id: "about" },
  { name: "Experience", id: "experience" },
  { name: "Projects", id: "projects" },
  { name: "Services", id: "services" },
  { name: "Skills", id: "skills" },
  { name: "Blog", id: "blog" },
  { name: "Contact", id: "contact" },
];

interface HeroData {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  social_links?: {
    instagram?: string;
    linkedin?: string;
    facebook?: string;
    youtube?: string;
  };
}

export const Footer = () => {
  const [heroData, setHeroData] = useState<HeroData | null>(null);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const res = await fetch("/api/hero");
        const json = await res.json();
        if (res.ok) {
          setHeroData(json.data);
        } else {
          throw json.error;
        }
      } catch (err) {
        console.error("Error fetching hero data:", err);
      }
    };
    fetchHeroData();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="py-12 px-4 bg-muted/30 border-t border-border">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
              {heroData?.name}
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              Creating meaningful connections between brands and people through strategic marketing and creative storytelling.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Instagram, url: heroData?.social_links?.instagram },
                { Icon: Linkedin, url: heroData?.social_links?.linkedin },
                { Icon: Facebook, url: heroData?.social_links?.facebook },
                { Icon: Youtube, url: heroData?.social_links?.youtube }
              ].map(({Icon, url}, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div>
                          {
                            url ? (
                              <a href={url} target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" size="icon" className="rounded-full">
                                  <Icon className="w-5 h-5" />
                                </Button>
                              </a>
                            ) : (
                              <Button variant="outline" size="icon" className="rounded-full opacity-50 cursor-not-allowed">
                                <Icon className="w-5 h-5" />
                              </Button>
                            )
                          }
                        </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((link, index) => (
                <motion.button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm text-left"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ x: 5 }}
                >
                  {link.name}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              {[heroData?.email, heroData?.phone, heroData?.address].map((text, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  {text}
                </motion.p>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="pt-8 border-t border-border text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="text-muted-foreground text-sm flex items-center justify-center gap-2">
            Made with <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-primary fill-primary" />
            </motion.div> by Marketing Girl © 2024
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
