"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  FileText,
  Users,
  BookOpen,
  LayoutDashboard,
  ClipboardList,
  ArrowLeft,
  Menu,
} from "lucide-react";

const adminLinks = [
  { href: "/admin", label: "Panel", icon: LayoutDashboard },
  { href: "/admin/preguntas", label: "Preguntas", icon: FileText },
  { href: "/admin/tests", label: "Tests", icon: ClipboardList },
  { href: "/admin/materiales", label: "Materiales", icon: BookOpen },
  { href: "/admin/usuarios", label: "Usuarios", icon: Users },
];

function AdminNav({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-1 p-3">
      {adminLinks.map((link) => {
        const isActive =
          link.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
              isActive
                ? "bg-primary/10 font-medium text-primary"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            }`}
          >
            <link.icon className="size-4" />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 shadow-sm backdrop-blur-sm">
        <div className="flex h-14 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Abrir menu de administracion"
            >
              <Menu className="size-5" />
            </Button>
            <Link href="/dashboard" className="text-lg font-bold text-primary">
              Nadatest
            </Link>
            <span className="text-sm text-muted-foreground">Admin</span>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 size-4" />
              Volver
            </Link>
          </Button>
        </div>
      </header>

      <div className="flex">
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-56 shrink-0 border-r border-border bg-card md:block">
          <AdminNav pathname={pathname} />
        </aside>

        <main id="main-content" className="flex-1 overflow-x-hidden p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>

      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <SheetHeader className="border-b border-border px-4 py-4">
            <SheetTitle className="text-left text-lg font-bold text-primary">
              Admin
            </SheetTitle>
          </SheetHeader>
          <AdminNav pathname={pathname} onNavigate={() => setMobileMenuOpen(false)} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
