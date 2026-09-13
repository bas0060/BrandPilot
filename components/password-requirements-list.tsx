"use client";

import { Check } from "lucide-react";
import { PASSWORD_REQUIREMENTS } from "@/lib/validation";
import { cn } from "@/lib/utils";

export function PasswordRequirementsList({ value }: { value: string }) {
  return (
    <ul className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1">
      {PASSWORD_REQUIREMENTS.map((rule) => {
        const met = rule.test(value);
        return (
          <li
            key={rule.id}
            className={cn(
              "flex items-center gap-1.5 text-[11px] transition-colors",
              met ? "text-foreground" : "text-muted-foreground"
            )}
          >
            <span
              className={cn(
                "flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border",
                met ? "border-foreground bg-foreground text-background" : "border-border"
              )}
            >
              {met && <Check className="h-2.5 w-2.5" />}
            </span>
            {rule.label}
          </li>
        );
      })}
    </ul>
  );
}