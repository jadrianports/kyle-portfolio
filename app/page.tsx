// app/page.tsx
"use client";

import { ClientProvider } from "@/components/ClientProvider";
import PageContent from "@/components/PageContent"
export default function Page() {
  return (
    <ClientProvider>
      <PageContent />
    </ClientProvider>
  );
}
