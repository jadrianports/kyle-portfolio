"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Eye, EyeOff, Sparkles, Lock, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import SVGLogo from "@/components/svg-logo";
import { signIn, signUp } from "./actions";
import { ActionState } from "@/lib/auth/middleware";

export default function LoginForm({ mode = "signin" }: { mode?: "signin" | "signup" }) {
  const searchParams = useSearchParams();
  const redirect = searchParams?.get("redirect");

  const [showPassword, setShowPassword] = useState(false);

  const [signInState, signInAction, signInPending] = useActionState<ActionState, FormData>(
    signIn,
    { error: "", success: "" }
  );

  const [signUpState, signUpAction, signUpPending] = useActionState<ActionState, FormData>(
    signUp,
    { error: "", success: "" }
  );

  const action = mode === "signin" ? signInAction : signUpAction;
  const state = mode === "signin" ? signInState : signUpState;
  const pending = mode === "signin" ? signInPending : signUpPending;

  if (state?.success) toast.success("You have successfully logged in!");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-rose/5 to-blush/10 px-4 relative overflow-hidden">
      {/* Floating animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-24 left-24 w-72 h-72 bg-gradient-to-br from-rose/20 to-hot-pink/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <motion.div
          className="absolute bottom-24 right-24 w-96 h-96 bg-gradient-to-br from-warm-pink/20 to-coral/20 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="shadow-2xl border-primary/20 backdrop-blur-sm bg-card/95">
          <CardHeader className="space-y-4 text-center">
            <motion.div
              className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-rose via-hot-pink to-neon-pink flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Lock className="w-10 h-10 text-white" />
            </motion.div>

            <div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-rose via-hot-pink to-neon-pink bg-clip-text text-transparent">
                {mode === "signin" ? "Welcome Back" : "Create Account"}
              </CardTitle>
              <CardDescription className="text-base mt-2 flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                {mode === "signin" ? "Log in to continue" : "Sign up to get started"}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <form action={action} className="space-y-5">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Email</Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Password</Label>
                <div className="relative">
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    className="h-11 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-11 w-10 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={pending}
                className="w-full h-11 bg-gradient-to-r from-rose via-hot-pink to-neon-pink hover:opacity-90 transition-opacity text-white font-medium"
              >
                {pending ? <Loader2 className="w-5 h-5 animate-spin" /> : mode === "signin" ? "Sign In" : "Sign Up"}
              </Button>

              {state?.error && (
                <p className="text-sm text-center text-red-500">{state.error}</p>
              )}
            </form>

          </CardContent>
        </Card>

        <motion.p
          className="text-center text-xs text-muted-foreground mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Protected route • Authorized access only
        </motion.p>
      </motion.div>
    </div>
  );
}
