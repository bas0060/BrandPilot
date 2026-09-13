"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, Sparkles, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import DashboardNavLinks from "@/components/dashboard/nav-links";
import { useAuth } from "@/lib/auth";

const DashboardMobileNav = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { logout } = useAuth();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="lg:hidden" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col px-4 py-6">
        <SheetTitle className="sr-only">Navigation</SheetTitle>

        <Link
          href="/dashboard"
          className="flex items-center gap-2.5 px-2"
          onClick={() => setOpen(false)}
        >
          <span className="flex size-8 items-center justify-center rounded-full bg-foreground/10 text-xs font-semibold">
            BP
          </span>
          <span className="text-sm font-medium">BrandPilot</span>
        </Link>

        <div className="mt-8 flex flex-1 flex-col">
          <DashboardNavLinks onNavigate={() => setOpen(false)} />
        </div>

        <div className="space-y-3 border-t border-border pt-4">
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              logout();
              router.push("/login");
            }}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:bg-secondary hover:text-foreground"
          >
            <LogOut className="h-4 w-4" />
            Log out
          </button>

          <div className="flex items-center gap-1.5 px-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40">
            <Sparkles className="h-3 w-3" />
            Mock dashboard
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default DashboardMobileNav;