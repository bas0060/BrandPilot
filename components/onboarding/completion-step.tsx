"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { SpotlightCard } from "@/components/motion-primitives";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";

const AUTO_REDIRECT_MS = 4000;

export function CompletionStep({
  summaryLabel,
  summaryValue,
}: {
  summaryLabel: string;
  summaryValue: string;
}) {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => router.push("/dashboard"), AUTO_REDIRECT_MS);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <motion.div
      key="completion"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.45 }}
    >
      <SpotlightCard className="p-8 text-center sm:p-10">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-foreground/10">
          <CheckCircle2 className="h-6 w-6" />
        </span>
        <h1 className="mt-5 text-2xl font-semibold tracking-tight">
          Your Brand Brain is ready
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-sm text-muted-foreground">
          We&apos;ve learned enough about {summaryLabel.toLowerCase()}{" "}
          <span className="font-medium text-foreground">{summaryValue}</span> to
          start generating content in your voice.
        </p>

        <Button className="mt-8 w-full sm:w-auto" size="lg" onClick={() => router.push("/dashboard")}>
          Go to dashboard <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <p className="mt-3 text-xs text-muted-foreground">
          Redirecting automatically in a few seconds…
        </p>
      </SpotlightCard>
    </motion.div>
  );
}
