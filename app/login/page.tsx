"use client"
import dynamic from "next/dynamic";

const LoginForm =   dynamic(() => import("@/app/login/LoginForm"), { ssr: false });

export default function Page() {
  return (
      <LoginForm mode="signin" />
  );
}
