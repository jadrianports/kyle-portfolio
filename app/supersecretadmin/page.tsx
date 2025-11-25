'use client'
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { motion } from "framer-motion";
import {
  Home,
  User,
  Briefcase,
  GraduationCap,
  FolderOpen,
  Wrench,
  BookOpen,
  MessageSquare,
  Award,
  TrendingUp,
  Target,
  Heart,
  Lightbulb,
  ArrowRight,
  Sparkles,
  Eye,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [experienceCount, setExperienceCount] = useState(0);
  const router = useRouter();
  const supabase = createClient();
  useEffect(() => {
    const check = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data?.user) return router.push('/supersecretadmin/login');
      setUser(data.user);
      // check admins table
      const { data: adminRes } = await supabase.from('admins').select('id').eq('user_id', data.user.id).single();
      if (!adminRes) return router.push('/supersecretadmin/login');
      setIsAdmin(true);
      // Fetch experience count
      const { count } = await supabase.from('experience').select('*', { count: 'exact', head: true });
      setExperienceCount(count || 0);
    };
    check();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("You have been successfully logged out.");
    router.push('/supersecretadmin/login');
  };

  const sections = [
  {
    icon: Home,
    title: "Hero Section",
    description: "Main banner, tagline, CTA buttons, contact info",
    path: "/supersecretadmin/hero",
    color: "from-rose to-hot-pink",
  },
  {
    icon: User,
    title: "About Me",
    description: "Bio, fun facts, philosophy, marketing approach",
    path: "/supersecretadmin/about",
    color: "from-warm-pink to-coral",
  },
  {
    icon: GraduationCap,
    title: "Education",
    description: "Academic background and achievements",
    path: "/supersecretadmin/education",
    color: "from-blush to-champagne",
  },
  {
    icon: Briefcase,
    title: "Experience",
    description: "Work history, roles, companies, KPIs",
    path: "/supersecretadmin/experience",
    color: "from-coral to-neon-pink",
  },
  {
    icon: FolderOpen,
    title: "Projects",
    description: "Case studies, portfolio work, metrics",
    path: "/supersecretadmin/projects",
    color: "from-hot-pink to-rose",
  },
  {
    icon: Wrench,
    title: "Services",
    description: "Offered services and packages",
    path: "/supersecretadmin/services",
    color: "from-neon-pink to-warm-pink",
  },
  {
    icon: Target,
    title: "Skills & Tools",
    description: "Technical skills and tool proficiency",
    path: "/supersecretadmin/skills-tools",
    color: "from-champagne to-blush",
  },
  {
    icon: BookOpen,
    title: "Blog Posts",
    description: "Articles, insights, and updates",
    path: "/supersecretadmin/blogs",
    color: "from-rose to-coral",
  },
  {
    icon: MessageSquare,
    title: "Testimonials",
    description: "Client reviews and feedback",
    path: "/supersecretadmin/testimonials",
    color: "from-warm-pink to-hot-pink",
  },
  {
    icon: TrendingUp,
    title: "Achievements",
    description: "Key metrics and accomplishments",
    path: "/supersecretadmin/achievements",
    color: "from-coral to-champagne",
  },
  {
    icon: Award,
    title: "Certifications",
    description: "Professional certifications",
    path: "/supersecretadmin/certifications",
    color: "from-hot-pink to-neon-pink",
  },
  {
    icon: Heart,
    title: "Fun Facts",
    description: "Personal insights and interests",
    path: "/supersecretadmin/funfacts",
    color: "from-blush to-rose",
  },
  {
    icon: Lightbulb,
    title: "Philosophy",
    description: "Marketing philosophy and beliefs",
    path: "/supersecretadmin/philosophy",
    color: "from-neon-pink to-coral",
  },
];
  console.log('Admin user:', user);
  if (!isAdmin) return <div>Loading...</div>;

  return (
      <div className="p-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-rose via-hot-pink to-neon-pink bg-clip-text text-transparent">
                Welcome back! ✨
              </h1>
              <p className="text-muted-foreground text-lg">
                Manage your portfolio content from here
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => window.open("/", "_blank")}
              className="gap-2"
            >
              <Eye className="h-4 w-4" />
              Preview Portfolio
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-rose/10 to-hot-pink/10 border-primary/20">
              <CardHeader className="pb-2">
                <CardDescription>Total Sections</CardDescription>
                <CardTitle className="text-3xl">{sections.length}</CardTitle>
              </CardHeader>
            </Card>
            <Card className="bg-gradient-to-br from-warm-pink/10 to-coral/10 border-primary/20">
              <CardHeader className="pb-2">
                <CardDescription>Last Updated</CardDescription>
                <CardTitle className="text-xl">Today</CardTitle>
              </CardHeader>
            </Card>
            <Card className="bg-gradient-to-br from-blush/10 to-champagne/10 border-primary/20">
              <CardHeader className="pb-2">
                <CardDescription>Status</CardDescription>
                <CardTitle className="text-xl text-green-500">Live</CardTitle>
              </CardHeader>
            </Card>
            <Card className="bg-gradient-to-br from-coral/10 to-neon-pink/10 border-primary/20">
              <CardHeader className="pb-2">
                <CardDescription>Portfolio Views</CardDescription>
                <CardTitle className="text-3xl">1.2k</CardTitle>
              </CardHeader>
            </Card>
          </div>
        </motion.div>

        {/* Content Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section, index) => {
            const Icon = section.icon;
            
            return (
              <motion.div
                key={section.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full cursor-pointer group hover:shadow-xl transition-all border-primary/10 hover:border-primary/30 bg-gradient-to-br from-card to-muted/20">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {section.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {section.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      variant="ghost"
                      className="w-full group-hover:bg-primary/10 transition-colors"
                      onClick={() => router.push(section.path)}
                    >
                      Edit Content
                      <Sparkles className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
  );
}
