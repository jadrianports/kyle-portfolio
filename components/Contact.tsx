"use client"
import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Send, Instagram, Linkedin, Facebook, Youtube } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import type { HeroData } from "@/lib/getPortfolioData";
import { sendContactMessage, ContactFormData } from "@/lib/contact";

interface ContactProps {
  heroData: HeroData;
}

export const Contact = ({ heroData }: ContactProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await sendContactMessage(formData as ContactFormData);

      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you soon! ✨",
      });

      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err: any) {
      console.error("Error sending message:", err);
      toast({
        title: "⚠️ Failed to send message",
        description: err.message || "Please try again later",
      });
    }
  };


  return (
    <section id="contact" className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <p className="text-muted-foreground text-lg">
            Have a project in mind? Let's create something amazing together!
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="p-8 bg-gradient-to-br from-background to-muted/30 border-primary/20">
                <h3 className="text-2xl font-bold mb-6 text-foreground">Get in Touch</h3>

                <div className="space-y-6">
                  {[
                    { icon: Mail, title: "Email", value: heroData?.email },
                    { icon: Phone, title: "Phone", value: heroData?.phone },
                    { icon: MapPin, title: "Location", value: heroData?.address },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-4"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <motion.div
                        className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center flex-shrink-0"
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.6 }}
                      >
                        <item.icon className="w-6 h-6 text-white" />
                      </motion.div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                        <p className="text-muted-foreground">{item.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-border">
                  <h4 className="font-semibold text-foreground mb-4">Follow Me</h4>
                  <div className="flex gap-3">
                    {[
                      { Icon: Instagram, url: heroData?.social_links?.instagram },
                      { Icon: Linkedin, url: heroData?.social_links?.linkedin },
                      { Icon: Facebook, url: heroData?.social_links?.facebook },
                      { Icon: Youtube, url: heroData?.social_links?.youtube }
                    ].map(({ Icon, url }, index) => (
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
                </div>
              </Card>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="p-8 bg-gradient-to-br from-background to-muted/30 border-primary/20">
                <h3 className="text-2xl font-bold mb-6 text-foreground">Send a Message</h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {[
                    { id: "name", label: "Your Name", type: "text", placeholder: "Jane Doe" },
                    { id: "email", label: "Email Address", type: "email", placeholder: "jane@example.com" },
                    { id: "subject", label: "Subject", type: "text", placeholder: "Project Inquiry" }
                  ].map((field, index) => (
                    <motion.div
                      key={field.id}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <label htmlFor={field.id} className="block text-sm font-medium text-foreground mb-2">
                        {field.label}
                      </label>
                      <Input
                        id={field.id}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={formData[field.id as keyof typeof formData]}
                        onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                        required
                        className="rounded-lg"
                      />
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Tell me about your project..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      className="rounded-lg min-h-[150px]"
                    />
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button type="submit" className="w-full rounded-full" size="lg">
                      Send Message
                      <Send className="w-4 h-4 ml-2" />
                    </Button>
                  </motion.div>
                </form>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
