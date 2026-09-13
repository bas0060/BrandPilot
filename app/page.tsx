"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";

export default function Home() {
  const router = useRouter();
  const { isLoggedIn, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;
    router.replace(isLoggedIn ? "/dashboard" : "/register");
  }, [isLoading, isLoggedIn, router]);

  return null;
}