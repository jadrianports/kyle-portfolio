// app/supersecretadmin/layout.tsx
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import AdminLayoutClient from "@/admincomponents/AdminLayoutClient";
import ToasterProvider from '@/admincomponents/ToasterProvider';
import "../globals.css";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/supersecretadmin/login");

  return (
    <ToasterProvider>
    <AdminLayoutClient>
      {children}
    </AdminLayoutClient>
    </ToasterProvider>
  );
}
