// app/supersecretadmin/layout.tsx
"use client"
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import AdminLayoutClient from "@/admincomponents/AdminLayoutClient";
import ToasterProvider from '@/admincomponents/ToasterProvider';
import { LoadingProvider } from "@/contexts/LoadingContext";
import "../globals.css";

export default  function AdminLayout({ children }: { children: React.ReactNode }) {

  return (
    <ToasterProvider>
      <LoadingProvider>
        <Toaster />
        <Sonner />
        <AdminLayoutClient>
          {children}
        </AdminLayoutClient>
      </LoadingProvider>
    </ToasterProvider>
  );
}
