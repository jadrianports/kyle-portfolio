"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import type { BlogPosts } from "@/lib/getPortfolioData";
interface BlogProps {
  initialPosts: BlogPosts[];
}

export default function BlogList({ initialPosts }: BlogProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = initialPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Search Bar */}
      <div className="py-12 px-4 max-w-2xl mx-auto">
        <Input
          placeholder="Search blog posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-14 w-full border-primary/20 focus:border-primary/40"
        />
      </div>

      {/* Blog Grid */}
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`}>
                <Card className="overflow-hidden hover:shadow-lg cursor-pointer">
                  <div className="relative h-48">
                    <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4 bg-primary/90 text-white px-2 py-1 rounded text-xs">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="w-4 h-4" />
                      <span>{post.published_at}</span>
                    </div>
                    <h3 className="font-bold text-lg mb-1">{post.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
                    <Button variant="ghost" className="mt-2 text-sm">
                      Read More <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredPosts.length === 0 && <p className="text-center py-20 text-muted-foreground">No blog posts found.</p>}
      </div>
    </div>
  );
}
