"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import DashboardNavLinks from "./nav-links";

const DashboardSidebar = () => {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-secondary/30 px-4 py-6 lg:flex">
      <Link href="/dashboard" className="flex items-center gap-2.5 px-2">
        <span className="flex size-8 items-center justify-center rounded-full bg-foreground/10 text-xs font-semibold">
          BP
        </span>
        <span className="text-sm font-medium">BrandPilot</span>
      </Link>

      <div className="mt-8 flex flex-1 flex-col">
        <DashboardNavLinks />
      </div>

      <div className="flex items-center gap-1.5 px-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40">
        <Sparkles className="h-3 w-3" />
        Mock dashboard
      </div>
    </aside>
  );
};

export default DashboardSidebar;