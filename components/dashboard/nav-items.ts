import { LayoutDashboard, Mic2, FileText, Settings } from "lucide-react";

export const NAV_ITEMS = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard, available: true },
  { label: "Brand Voice", href: "/dashboard", icon: Mic2, available: false },
  { label: "Content", href: "/dashboard", icon: FileText, available: false },
  { label: "Settings", href: "/dashboard", icon: Settings, available: false },
] as const;