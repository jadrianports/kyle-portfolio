import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

/**
 * Admin Skeleton Loader
 * Themed skeleton screens for admin dashboard loading states
 * Maintains admin aesthetic with pink accents
 */

interface AdminSkeletonProps {
  type?: "dashboard" | "editor" | "list" | "form";
}

export const AdminSkeleton = ({ type = "dashboard" }: AdminSkeletonProps) => {
  if (type === "dashboard") {
    return (
      <div className="p-8 space-y-8 animate-fade-in">
        {/* Header Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-12 w-96 bg-gradient-to-r from-primary/10 to-accent/10" />
          <Skeleton className="h-6 w-64 bg-muted" />
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="p-6 rounded-xl border border-primary/10 bg-card space-y-3">
                <Skeleton className="h-4 w-24 bg-muted" />
                <Skeleton className="h-8 w-16 bg-primary/20" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Grid Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="h-48 rounded-xl border border-primary/10 bg-card p-6 space-y-4"
            >
              <div className="flex items-start justify-between">
                <Skeleton className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20" />
                <Skeleton className="h-5 w-5 rounded-full bg-muted" />
              </div>
              <Skeleton className="h-6 w-32 bg-muted" />
              <Skeleton className="h-4 w-full bg-muted" />
              <Skeleton className="h-4 w-3/4 bg-muted" />
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "list") {
    return (
      <div className="space-y-6 animate-fade-in">
        {/* Header with actions */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-64 bg-muted" />
          <Skeleton className="h-10 w-32 bg-primary/20" />
        </div>

        {/* List items */}
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4 p-4 rounded-lg border border-primary/10 bg-card"
            >
              <Skeleton className="h-16 w-16 rounded-lg bg-muted" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-6 w-48 bg-muted" />
                <Skeleton className="h-4 w-full bg-muted" />
                <Skeleton className="h-4 w-2/3 bg-muted" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-9 w-9 rounded-md bg-muted" />
                <Skeleton className="h-9 w-9 rounded-md bg-muted" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "form") {
    return (
      <div className="space-y-6 animate-fade-in max-w-2xl">
        <Skeleton className="h-10 w-48 bg-gradient-to-r from-primary/20 to-accent/20" />
        
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="space-y-2"
          >
            <Skeleton className="h-4 w-24 bg-muted" />
            <Skeleton className="h-10 w-full bg-muted rounded-lg" />
          </motion.div>
        ))}

        <div className="flex gap-4 pt-4">
          <Skeleton className="h-10 w-32 bg-primary/20" />
          <Skeleton className="h-10 w-24 bg-muted" />
        </div>
      </div>
    );
  }

  if (type === "editor") {
    return (
      <div className="p-8 space-y-8 animate-fade-in">
        {/* Editor Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-10 w-64 bg-gradient-to-r from-primary/20 to-accent/20" />
            <Skeleton className="h-5 w-96 bg-muted" />
          </div>
          <Skeleton className="h-10 w-32 bg-primary/20" />
        </div>

        {/* Editor Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="space-y-4 p-6 rounded-xl border border-primary/10 bg-card"
            >
              <Skeleton className="h-6 w-32 bg-muted" />
              <Skeleton className="h-32 w-full bg-muted rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full bg-muted" />
                <Skeleton className="h-4 w-full bg-muted" />
                <Skeleton className="h-4 w-3/4 bg-muted" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};