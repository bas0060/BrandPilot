"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/components/dashboard/nav-items";

export default function DashboardNavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-1 flex-col gap-1">
      {NAV_ITEMS.map(({ label, href, icon: Icon, available }) => {
        const active = available && pathname === href;
        return (
          <Link
            key={label}
            href={available ? href : "#"}
            aria-disabled={!available}
            onClick={(e) => {
              if (!available) {
                e.preventDefault();
              }
              onNavigate?.();
            }}
            className={cn(
              "flex items-center justify-between rounded-lg px-3 py-2 text-sm transition",
              active
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground",
              !available && "cursor-default hover:bg-transparent hover:text-muted-foreground/70"
            )}
          >
            <span className="flex items-center gap-2.5">
              <Icon className="h-4 w-4" />
              {label}
            </span>
            {!available && (
              <span className="rounded-full border border-border px-1.5 py-0.5 text-[9px] uppercase tracking-wide text-muted-foreground/70">
                Soon
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
};
