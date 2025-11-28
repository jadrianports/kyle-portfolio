
import { Calendar, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import type { BlogPosts } from "@/lib/getPortfolioData";
interface BlogProps {
  blogPosts: BlogPosts[];
}

export const Blog = ({ blogPosts }: BlogProps) => {
  return (
    <section id="blog" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Latest Insights
          </h2>
          <p className="text-muted-foreground text-lg">
            Marketing tips, trends, and creative inspiration
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="overflow-hidden bg-gradient-to-br from-background to-muted/30 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg group h-full">
                  <div className="relative h-48 overflow-hidden">
                    {post.cover_image && (
                    <motion.img
                      src={post?.cover_image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    />
                    )}
                    <div className="absolute top-4 left-4">
                      <motion.span
                        className="px-3 py-1 bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs rounded-full font-medium"
                        whileHover={{ scale: 1.1 }}
                      >
                        {post.category}
                      </motion.span>
                    </div>
                  </div>

                  <div className="p-6">
                    <motion.div
                      className="flex items-center gap-2 text-sm text-muted-foreground mb-3"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                    >
                      <Calendar className="w-4 h-4" />
                      <span>{post.published_at}</span>
                    </motion.div>

                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-muted-foreground mb-4 text-sm">
                      {post.excerpt}
                    </p>

                    <motion.div
                      whileHover={{ x: 5 }}
                    >
                      <Link href={`/blog/${post.slug}`}>
                        <Button
                          variant="ghost"
                          className="p-0 h-auto font-medium group/btn"
                        >
                          Read More
                          <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </motion.div>
                        </Button>
                      </Link>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link href="/blog">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary via-accent to-primary hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
            >
              View All Blog Posts
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
