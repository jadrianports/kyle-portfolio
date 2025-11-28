"use client";

import { ReactNode } from "react";
import { LoadingProvider } from "@/contexts/LoadingContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { GlobalLoader } from "./GlobalLoader";

const queryClient = new QueryClient();

export function ClientProvider({ children }: { children: ReactNode }) {
  return (
    <LoadingProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <GlobalLoader/>
          {children}
        </TooltipProvider>
      </QueryClientProvider>
    </LoadingProvider>
  );
};
