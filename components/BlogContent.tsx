// components/BlogContent.tsx
"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Calendar, ArrowLeft, Share2, Clock } from "lucide-react";
import type { BlogPosts } from "@/lib/getPortfolioData";
import Link from "next/link";
import { Button } from "./ui/button";

export default function BlogContent({ post }: { post: BlogPosts }) {
    function estimateReadingTime(content: string): string {
        // Strip HTML tags to get only plain text
        const text = content.replace(/<[^>]+>/g, "");
        const words = text.trim().split(/\s+/).length;
        const wordsPerMinute = 150; // average reading speed
        const minutes = Math.ceil(words / wordsPerMinute);
        return `${minutes} min read`;
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Back Button */}
            <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
                <div className="container mx-auto max-w-4xl px-4 py-4">
                    <Link href="/">
                        <Button variant="ghost" className="group">
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Back to Portfolio
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Hero Image */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative h-[60vh] overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-10" />
                <img
                    src={post.cover_image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                />
            </motion.div>

            {/* Content */}
            <div className="container mx-auto max-w-4xl px-4 -mt-32 relative z-20">
                <motion.article
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Card className="p-8 md:p-12 bg-background/95 backdrop-blur-sm border-primary/20 shadow-2xl">
                        {/* Category Badge */}
                        <div className="mb-6">
                            <span className="px-4 py-1.5 bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm rounded-full font-medium">
                                {post.category}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight">
                            {post.title}
                        </h1>

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8 pb-8 border-b border-border">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{post.published_at}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{estimateReadingTime(post.content)}</span>
                            </div>
                            <Button variant="outline" size="sm" className="ml-auto">
                                <Share2 className="w-4 h-4 mr-2" />
                                Share
                            </Button>
                        </div>

                        {/* Content */}
                        <div
                            className="prose prose-lg prose-slate dark:prose-invert max-w-none
                prose-headings:bg-gradient-to-r prose-headings:from-primary prose-headings:to-accent prose-headings:bg-clip-text prose-headings:text-transparent
                prose-p:text-foreground prose-p:leading-relaxed
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-strong:text-foreground prose-strong:font-semibold
                prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-6
                prose-h3:text-2xl prose-h3:font-bold prose-h3:mt-8 prose-h3:mb-4"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </Card>
                </motion.article>

                {/* Related Posts Section */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-16 mb-16"
                >
                    <h2 className="text-3xl font-bold mb-8 text-center">Continue Reading</h2>
                    <div className="text-center">
                        <Link href="/">
                            <Button size="lg" className="bg-gradient-to-r from-primary to-accent">
                                View All Blog Posts
                            </Button>
                        </Link>
                    </div>
                </motion.section>
            </div>
        </div>
    );
}

