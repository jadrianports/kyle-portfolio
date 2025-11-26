"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, Mail, MapPin, Phone, Instagram, Linkedin, Facebook, Youtube } from "lucide-react";
import profileHero from "@/assets/profile-hero.jpg"
import { motion } from "framer-motion";
import Image from "next/image";

interface HeroData {
  greeting: string;
  name: string;
  title: string;
  description: string;
  phone?: string;
  email?: string;
  address?: string;
  resume_url?: string;
  profile_image: string;
  skills?: string[]; // <-- dynamic skills from API
  social_links?: {
    instagram?: string;
    linkedin?: string;
    facebook?: string;
    youtube?: string;
  };
}

export const Hero = () => {
  const [heroData, setHeroData] = useState<any>(null);
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);

  useEffect(() => {
    const fetchHero = async () => {
  try {
    const res = await fetch("/api/hero");
    const json = await res.json();
    if (res.ok && json.data) {
      setHeroData(json.data);
    } else {
      console.error("Error fetching hero:", json.error);
    }
  } catch (err) {
    console.error("Error fetching hero:", err);
  }
};

    fetchHero();
  }, []);

useEffect(() => {
  if (!heroData?.skills || heroData.skills.length === 0) return;

  const interval = setInterval(() => {
    setCurrentSkillIndex((prev) => (prev + 1) % heroData.skills!.length);
  }, 2000);

  return () => clearInterval(interval);
}, [heroData?.skills]);

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!heroData) {
    return (
      <section>
        <p className="h-6 bg-gray-200 rounded w-32 animate-pulse"></p>
        <h1 className="h-12 bg-gray-300 rounded w-64 animate-pulse"></h1>
        <h2 className="h-6 bg-gray-200 rounded w-48 animate-pulse"></h2>
      </section>
    );
  }

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-4 pt-20 relative overflow-hidden"
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_110%)] opacity-20" />
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <motion.div
            className="flex-1 text-center lg:text-left space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-2">
              <motion.p
                className="text-primary font-medium text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {heroData.greeting || "Hello, I'm"}
              </motion.p>
              <motion.h1
                className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {heroData.name || "Your Name"}
              </motion.h1>
              <motion.h2
                className="text-2xl md:text-3xl font-semibold text-foreground/80"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {heroData.title || "Your Title"}
              </motion.h2>
            </div>

            {/* Rotating Skills */}
            <motion.div
              className="h-12 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                className="transition-transform duration-500 ease-in-out"
                animate={{ y: -currentSkillIndex * 48 }}
              >
                {heroData.skills?.map((skill : string, index: number) => (
                  <p
                    key={index}
                    className="text-xl text-muted-foreground font-medium h-12 flex items-center justify-center lg:justify-start"
                  >
                    {skill}
                  </p>
                ))}
              </motion.div>
            </motion.div>

            <motion.p
              className="text-lg text-muted-foreground max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {heroData.description || "Transforming brands through creative storytelling and data-driven strategies. Let's create marketing magic together! ✨"}
            </motion.p>

            {/* Contact Info */}
            <motion.div
              className="flex flex-wrap gap-4 justify-center lg:justify-start text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {[
                { Icon: Phone, text: heroData.phone || "+1 (555) 123-4567" },
                { Icon: Mail, text: heroData.email || "hello@example.com" },
                { Icon: MapPin, text: heroData.address || "Your City, Country" },
              ].map(({ Icon, text }, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-2 text-muted-foreground"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Icon className="w-4 h-4" />
                  <span>{text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex gap-3 justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              {[
                { Icon: Instagram, url: heroData?.social_links?.instagram },
                { Icon: Linkedin, url: heroData?.social_links?.linkedin },
                { Icon: Facebook, url: heroData?.social_links?.facebook },
                { Icon: Youtube, url: heroData?.social_links?.youtube },
              ].map(({ Icon, url }, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div>
                    {url ? (
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline" size="icon" className="rounded-full">
                          <Icon className="w-4 h-4" />
                        </Button>
                      </a>
                    ) : (
                      <Button variant="outline" size="icon" className="rounded-full">
                        <Icon className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>


            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="rounded-full px-8 shadow-lg hover:shadow-xl transition-all"
                  onClick={scrollToContact}
                >
                  Let's Work Together
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a
                  href="/Kyle-Ydrhaine-Villero-Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full border px-8 py-3 text-sm font-medium 
               hover:bg-accent transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume
                </a>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Content - Profile Image */}
          <motion.div
            className="flex-1 flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              {/* Animated glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-2xl opacity-30"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />

              {/* Image container */}
              <motion.div
                className="relative w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  fill
                  src={`/Kyle-Ydrhaine-Villero-Profile.JPEG`}
                  alt="Marketing Professional"
                  sizes="(max-width: 768px) 100vw, 6rem"
                  loading="eager"
                  className="object-cover"
                />
              </motion.div>

              {/* Decorative floating elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-full blur-xl"
                animate={{
                  y: [0, -20, 0],
                  x: [0, 10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-24 h-24 bg-accent/20 rounded-full blur-xl"
                animate={{
                  y: [0, 20, 0],
                  x: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
