"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import DashboardMobileNav from "@/components/dashboard/mobile-nav";
import { LogoutConfirmModal } from "@/components/dashboard/logout-confirm-modal";

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const DashboardTopbar = () => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const firstName = user?.name?.trim().split(/\s+/)[0];
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between gap-3 border-b border-border bg-background/95 px-4 backdrop-blur sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        {user?.name && (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-foreground/10 text-xs font-semibold">
            {getInitials(user.name)}
          </span>
        )}
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">
            Welcome back{firstName ? `, ${firstName}` : ""}
          </p>
          {user?.email && (
            <p className="hidden truncate text-xs text-muted-foreground sm:block">
              {user.email}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="hidden lg:inline-flex"
          onClick={() => setShowLogoutConfirm(true)}
        >
          <LogOut className="mr-2 h-4 w-4" /> Log out
        </Button>
        <DashboardMobileNav />
      </div>

      <LogoutConfirmModal
        open={showLogoutConfirm}
        onCancel={() => setShowLogoutConfirm(false)}
        onConfirm={() => {
          setShowLogoutConfirm(false);
          logout();
          router.push("/login");
        }}
      />
    </header>
  );
};

export default DashboardTopbar;