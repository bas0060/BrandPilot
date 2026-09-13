"use client";

import { motion } from "framer-motion";
import { SpotlightCard } from "@/components/motion-primitives";
import { Globe, Camera } from "lucide-react";
import type { Path } from "@/components/onboarding-wizard";

export function ChoosePathStep({ onSelect }: { onSelect: (path: Path) => void }) {
  return (
    <motion.div
      key="choose-path"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.45 }}
    >
      <div className="text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Step 1 of 2
        </p>
        <h1 className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">
          How do customers find you?
        </h1>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <button onClick={() => onSelect("website")} className="text-left">
          <SpotlightCard className="h-full p-6 transition hover:-translate-y-1">
            <Globe className="h-5 w-5 text-muted-foreground" />
            <p className="mt-4 font-medium">I have a website</p>
            <p className="mt-1 text-xs text-muted-foreground">
              We&apos;ll read it and build your brand profile automatically.
            </p>
          </SpotlightCard>
        </button>

        <button onClick={() => onSelect("no-website")} className="text-left">
          <SpotlightCard className="h-full p-6 transition hover:-translate-y-1">
            <Camera className="h-5 w-5 text-muted-foreground" />
            <p className="mt-4 font-medium">I don&apos;t have a website</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Just Instagram or WhatsApp — that&apos;s fine too.
            </p>
          </SpotlightCard>
        </button>
      </div>
    </motion.div>
  );
}
