import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  // 1️⃣ Skip maintenance in local development
  if (process.env.NODE_ENV === "development") {
    return await updateSession(request); // keep your session logic
  }

  // 2️⃣ Handle maintenance mode
  const maintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true";
  if (maintenanceMode && !request.nextUrl.pathname.startsWith("/maintenance")) {
    const url = request.nextUrl.clone();
    url.pathname = "/maintenance";
    return NextResponse.rewrite(url);
  }

  // 3️⃣ Continue with your session logic
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
