"use client";

import { motion } from "framer-motion";
import { SpotlightCard } from "@/components/motion-primitives";
import { Button } from "@/components/ui/button";
import { Sparkles, AlertCircle } from "lucide-react";
import { onEnterPress } from "@/lib/utils";

export function WebsiteInputStep({
  value,
  onChange,
  error,
  onBack,
  onSubmit,
}: {
  value: string;
  onChange: (value: string) => void;
  error: string | null;
  onBack: () => void;
  onSubmit: () => void;
}) {
  const isDisabled = value.trim().length < 4;

  return (
    <motion.div
      key="website-input"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.45 }}
    >
      <SpotlightCard className="p-6 sm:p-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Step 2 of 2
        </p>
        <h1 className="mt-3 text-lg font-semibold tracking-tight sm:text-xl">
          What&apos;s your website?
        </h1>

        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onEnterPress(onSubmit, isDisabled)}
          placeholder="https://yourbusiness.com"
          autoFocus
          className="mt-6 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-foreground/30"
        />
        {error && (
          <p className="mt-2 flex items-center gap-1.5 text-xs text-destructive">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {error}
          </p>
        )}

        <div className="mt-6 flex gap-3">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button
            className="flex-1"
            disabled={isDisabled}
            onClick={onSubmit}
          >
            <Sparkles className="mr-2 h-4 w-4" /> Analyze & Continue
          </Button>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}