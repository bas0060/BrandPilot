"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { RegisterForm } from "@/components/register-form";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="w-[92%] md:w-[60%] lg:w-[36%] mx-auto md:px-6 py-12">
      <div className="relative flex min-h-screen items-center justify-center border border-gray-500 rounded-2xl px-4 md:pt-2 md:px-0 ">
        
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-125 w-125 rounded-full bg-foreground/5 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 h-125 w-125 rounded-full bg-foreground/5 blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          {/* Back button */}
          {/* <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to home
          </Link> */}

          {/* Logo */}
          <div className="mt-4 md-mt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 rounded-full border border-border/50 bg-background/50 px-4 py-2"
            >
              <span className="flex size-8 items-center justify-center rounded-full bg-foreground/10 text-xs font-semibold">
                BP
              </span>
              <span className="text-sm font-medium">BrandPilot</span>
            </Link>
          </div>

          {/* Header */}
          <div className="mt-4 md-mt-8">
            <h1 className="text-2xl font-medium tracking-tight">Create an account</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Start building your brand with BrandPilot
            </p>
          </div>

          {/* Form */}
          <div className="mt-6">
            <RegisterForm />
          </div>

          {/* Footer */}
          <div className="mt-6 space-y-3 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-foreground hover:underline">
                Sign in
              </Link>
            </p>

            <div className="flex items-center justify-center gap-3 pb-6">
              <span className="h-px w-8 bg-gray-400" />
              <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-gray-400">
                <Sparkles className="h-3 w-3" />
                Secure signup
              </span>
              <span className="h-px w-8 bg-gray-400" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}