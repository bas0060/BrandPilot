"use client";

import { motion } from "framer-motion";
import { SpotlightCard } from "@/components/motion-primitives";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function WelcomeStep({ onNext }: { onNext: () => void }) {
  return (
    <motion.div
      key="welcome"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.45 }}
    >
      <SpotlightCard className="p-8 text-center sm:p-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Get started
        </p>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
          Let&apos;s build your Brand Brain
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-sm text-muted-foreground">
          A few quick steps, and BrandPilot will understand your business well
          enough to generate content in your actual voice.
        </p>
        <Button className="mt-8 w-full sm:w-auto" size="lg" onClick={onNext}>
          Get started <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </SpotlightCard>
    </motion.div>
  );
}
