"use client";

import { motion } from "framer-motion";
import { SpotlightCard } from "@/components/motion-primitives";
import { Button } from "@/components/ui/button";
import { Sparkles, AlertCircle } from "lucide-react";
import { onEnterPress } from "@/lib/utils";

export function PreferencesInputStep({
  brandName,
  onBrandNameChange,
  instagramHandle,
  onInstagramHandleChange,
  error,
  onBack,
  onSubmit,
}: {
  brandName: string;
  onBrandNameChange: (value: string) => void;
  instagramHandle: string;
  onInstagramHandleChange: (value: string) => void;
  error: string | null;
  onBack: () => void;
  onSubmit: () => void;
}) {
  const isDisabled = brandName.trim().length < 1;
  const handleEnter = onEnterPress(onSubmit, isDisabled);

  return (
    <motion.div
      key="preferences-input"
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
          Tell us about your brand
        </h1>

        <div className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground">
              Brand name
            </label>
            <input
              value={brandName}
              onChange={(e) => onBrandNameChange(e.target.value)}
              onKeyDown={handleEnter}
              autoFocus
              className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-foreground/30"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">
              Instagram handle
            </label>
            <input
              value={instagramHandle}
              onChange={(e) => onInstagramHandleChange(e.target.value)}
              onKeyDown={handleEnter}
              placeholder="@yourbrand"
              className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-foreground/30"
            />
          </div>
        </div>
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
            <Sparkles className="mr-2 h-4 w-4" /> Build Brand Brain
          </Button>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}