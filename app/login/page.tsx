"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { signIn, signUp } from "./actions";
import { useActionState } from "react";
import toast from "react-hot-toast";
import { ActionState } from "@/lib/auth/middleware";
import SVGLogo from "@/components/svg-logo";

export default function Login({ mode = "signin" }: { mode?: "signin" | "signup" }) {
  const searchParams = useSearchParams();
  const redirect = searchParams?.get("redirect");


  const [signInState, signInAction, signInPending] = useActionState<
    ActionState,
    FormData
  >(signIn, { error: "", success: "" });

  const [signUpState, signUpAction, signUpPending] = useActionState<
    ActionState,
    FormData
  >(signUp, { error: "", success: "" });

  const action = mode === "signin" ? signInAction : signUpAction;
  const state = mode === "signin" ? signInState : signUpState;
  const pending = mode === "signin" ? signInPending : signUpPending;

  // Show success toast on successful login
  if (state?.success) {
    toast.success("You have successfully logged in!");
  }

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-white to-gray-50 flex items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="flex justify-center">
          <SVGLogo />
        </div>

        <h1 className="mt-10 text-2xl font-semibold tracking-tight text-center text-gray-900">
          {mode === "signin" ? "Welcome back" : "Create your account"}
        </h1>
        <p className="mt-2 text-sm text-center text-gray-600">
          {mode === "signin"
            ? "Sign in to continue to your account"
            : "Get started with your new account"}
        </p>

        <div className="mt-10">
          <form action={action} className="space-y-4">
            <Input
              name="email"
              type="email"
              placeholder="name@example.com"
              required
              className="px-4 h-12 bg-white rounded-lg border-gray-200 shadow-sm transition-colors focus:border-blue-500 focus:ring-blue-500"
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              required
              className="px-4 h-12 bg-white rounded-lg border-gray-200 shadow-sm transition-colors focus:border-blue-500 focus:ring-blue-500"
            />

            <Button
              type="submit"
              className="w-full h-12 font-medium text-white bg-blue-600 rounded-lg transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {pending ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                mode === "signin" ? "Sign In" : "Sign Up"
              )}
            </Button>
          </form>

          {state?.error && (
            <div className="mt-4 text-sm text-red-600">
              {state.error}
            </div>
          )}

          <p className="mt-8 text-sm text-center text-gray-600">
            {mode === "signin"
              ? "New to our platform? "
              : "Already have an account? "}
            <Link
              href={`${mode === "signin" ? "/sign-up" : "/sign-in"}${
                redirect ? `?redirect=${redirect}` : ""
              }`}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              {mode === "signin" ? "Create an account" : "Sign in"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
