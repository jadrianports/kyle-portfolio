"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
//import ThemeToggle from "./ThemeToggle";

const navItems = [
  { name: "Dashboard", path: "/supersecretadmin" },
  { name: "Experience", path: "/supersecretadmin/experience" },
  { name: "Projects", path: "/admin/projects" },
  { name: "Blog", path: "/admin/blog" },
  { name: "Services", path: "/admin/services" },
  { name: "Tools", path: "/admin/tools" },
  { name: "Education", path: "/admin/education" },
  { name: "Testimonials", path: "/admin/testimonials" },
  { name: "Hero Section", path: "/admin/hero" },
  { name: "About Me", path: "/admin/about" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white/80 backdrop-blur-lg dark:bg-black/40 border-r border-pink-200 dark:border-pink-800 p-6 flex flex-col">
      
      <h2 className="text-2xl font-bold mb-6 text-pink-600 dark:text-pink-300">
        ✨ Admin CMS
      </h2>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <Link key={item.path} href={item.path}>
            <div
              className={`p-3 rounded-lg cursor-pointer font-medium transition
                ${
                  pathname === item.path
                    ? "bg-pink-500 text-white dark:bg-pink-600"
                    : "hover:bg-pink-200 dark:hover:bg-pink-900 text-gray-800 dark:text-gray-300"
                }`}
            >
              {item.name}
            </div>
          </Link>
        ))}
      </nav>

    </aside>
  );
}
