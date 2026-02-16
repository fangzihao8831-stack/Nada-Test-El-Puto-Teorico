import {
  Home,
  FileText,
  Target,
  BarChart3,
  AlertCircle,
  BookOpen,
  FileCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const dashboardNavItems: NavItem[] = [
  { label: "Inicio", href: "/dashboard", icon: Home },
  { label: "Tests", href: "/test", icon: FileText },
  { label: "Objetivo", href: "/objetivo", icon: Target },
  { label: "Progreso", href: "/progreso", icon: BarChart3 },
  { label: "Fallos", href: "/fallos", icon: AlertCircle },
  { label: "Materiales", href: "/materiales", icon: BookOpen },
  { label: "Notas DGT", href: "/notas-dgt", icon: FileCheck },
];
