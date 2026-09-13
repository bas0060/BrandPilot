"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";

/**
 * "/" is intentionally not a page of its own — it's an entry point that
 * routes based on session state. Sign-up-first is the product decision
 * here (see the onboarding wizard's own guard), so a logged-out visitor
 * lands on /register, not a "Get started" card. A logged-in visitor goes
 * straight to their dashboard instead of seeing onboarding again.
 */
export default function Home() {
  const router = useRouter();
  const { isLoggedIn, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;
    router.replace(isLoggedIn ? "/dashboard" : "/register");
  }, [isLoading, isLoggedIn, router]);

  return null;
}