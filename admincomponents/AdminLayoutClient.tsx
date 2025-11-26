"use client";

import { useState, ReactNode, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { signOut } from "@/app/login/actions";
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
  Menu,
  X,
  LogOut,
  Moon,
  Sun,
  Sparkles,
  Heart,
  Lightbulb,
  Mail
} from "lucide-react";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import toast from "react-hot-toast";

export default function AdminLayoutClient({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { icon: Home, label: "Hero", path: "/supersecretadmin/hero" },
    { icon: GraduationCap, label: "Education", path: "/supersecretadmin/education" },
    { icon: Briefcase, label: "Experience", path: "/supersecretadmin/experience" },
    { icon: FolderOpen, label: "Projects", path: "/supersecretadmin/projects" },
    { icon: Wrench, label: "Services", path: "/supersecretadmin/services" },
    { icon: Target, label: "Skills & Tools", path: "/supersecretadmin/skills-tools" },
    { icon: MessageSquare, label: "Testimonials", path: "/supersecretadmin/testimonials" },
    //{ icon: TrendingUp, label: "Achievements", path: "/supersecretadmin/achievements" },
    //{ icon: Award, label: "Certifications", path: "/supersecretadmin/certifications" },
    { icon: BookOpen, label: "Blogs", path: "/supersecretadmin/blogs" },
    { icon: Mail, label: "Messages", path: "/supersecretadmin/messages", hasUnread: true },
  ];


useEffect(() => {
  const loadUnread = async () => {
    try {
      const res = await fetch("/api/contact");
      const json = await res.json();

      if (json.data) {
        const unread = json.data.filter((m: any) => !m.is_read).length;
        setUnreadCount(unread);
      }
    } catch (err) {
      console.error("Failed to load unread count:", err);
    }
  };

  loadUnread();

  const interval = setInterval(loadUnread, 5000);
  return () => clearInterval(interval);
}, []);
  const handleLogout = () => {
    signOut();
    toast.success("Logged out successfully");
  };

  const toggleDarkMode = () => {
    const enabled = !isDarkMode;
    setIsDarkMode(enabled);
    document.documentElement.classList.toggle("dark", enabled);
  };

  const isActive = (path: string) => pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/5">

      {/* MOBILE HEADER */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 h-16 bg-card/95 backdrop-blur-sm border-b border-border flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => setIsMobileOpen(!isMobileOpen)}>
            {isMobileOpen ? <X /> : <Menu />}
          </Button>
          <h1 className="text-lg font-bold bg-gradient-to-r from-rose to-hot-pink bg-clip-text text-transparent">
            Admin CMS
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
            {isDarkMode ? <Sun /> : <Moon />}
          </Button>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut />
          </Button>
        </div>
      </header>

      {/* MOBILE SIDEBAR */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
              onClick={() => setIsMobileOpen(false)}
            />

            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="lg:hidden fixed left-0 top-16 bottom-0 w-72 bg-card border-r border-border z-50"
            >
      <SidebarContent
        menuItems={menuItems}
        isActive={isActive}
        navigate={router.push}
        isCollapsed={false}
        onItemClick={() => setIsMobileOpen(false)}
        unreadCount={unreadCount}
      />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* DESKTOP SIDEBAR */}
      <motion.aside
        animate={{ width: isCollapsed ? 80 : 280 }}
        className="hidden lg:block fixed left-0 top-0 bottom-0 bg-card/95 backdrop-blur-sm border-r border-border"
      >
        <div className="h-16 border-b border-border flex items-center justify-between px-4">
          {!isCollapsed && (
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-bold bg-gradient-to-r from-rose via-hot-pink to-neon-pink bg-clip-text text-transparent"
            >
              Admin CMS
            </motion.h1>
          )}
          <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(!isCollapsed)}>
            <Menu />
          </Button>
        </div>

        <SidebarContent
          menuItems={menuItems}
          isActive={isActive}
          navigate={router.push}
          isCollapsed={isCollapsed}
          unreadCount={unreadCount}
        />

        <div className="border-t border-border p-4 space-y-2">
          <Button variant="ghost" size={isCollapsed ? "icon" : "default"} onClick={toggleDarkMode}>
            {isDarkMode ? <Sun /> : <Moon />}
            {!isCollapsed && <span className="ml-3">Dark Mode</span>}
          </Button>

          <Button variant="ghost" size={isCollapsed ? "icon" : "default"} onClick={handleLogout}>
            <LogOut />
            {!isCollapsed && <span className="ml-3">Logout</span>}
          </Button>
        </div>
      </motion.aside>

      {/* MAIN CONTENT */}
      <main className="pt-16 lg:pt-0" style={{ marginLeft: isCollapsed ? 80 : 280 }}>
        <div className="min-h-screen p-6">{children}</div>
      </main>
    </div>
  );
}

function SidebarContent({
  menuItems,
  isActive,
  navigate,
  isCollapsed,
  onItemClick,
  unreadCount
}: any) {
  return (
    <ScrollArea className="flex-1 py-4">
      <nav className="space-y-1 px-2">
        {menuItems.map((item: any) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          const showBadge = item.hasUnread && unreadCount > 0;
          
          return (
            <motion.div
              key={item.path}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant={active ? "secondary" : "ghost"}
                size={isCollapsed ? "icon" : "default"}
                className={`w-full justify-start transition-all relative ${
                  active
                    ? "bg-gradient-to-r from-rose/10 to-hot-pink/10 text-primary border-l-4 border-primary"
                    : "hover:bg-muted"
                }`}
                onClick={() => {
                  navigate(item.path);
                  onItemClick?.();
                }}
              >
                <Icon className={`h-5 w-5 ${active ? "text-primary" : ""}`} />
                {!isCollapsed && <span className="ml-3">{item.label}</span>}
                {showBadge && !isCollapsed && (
                  <Badge 
                    variant="destructive" 
                    className="ml-auto h-5 min-w-5 flex items-center justify-center px-1.5 text-xs animate-pulse"
                  >
                    {unreadCount}
                  </Badge>
                )}
                {showBadge && isCollapsed && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full animate-pulse" />
                )}
                {active && !isCollapsed && !showBadge && (
                  <Sparkles className="ml-auto h-4 w-4 text-primary" />
                )}
              </Button>
            </motion.div>
          );
        })}
      </nav>
    </ScrollArea>
  );
}
