"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MobileMenu } from "@/components/navigation/MobileMenu";
import { dashboardNavItems } from "@/lib/nav-items";
import { logout } from "@/lib/auth/actions";
import { cn } from "@/lib/utils";

interface NavUser {
  email: string;
  nombre: string | null;
}

export function Navbar({ user }: { user: NavUser }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-card shadow-sm">
        {/* Top row: logo + user */}
        <div className="flex h-14 items-center justify-between px-4 md:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Abrir menu"
            >
              <Menu className="size-5" />
            </Button>
            <Link href="/dashboard" className="text-xl font-bold text-primary">
              Nadatest
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-muted-foreground sm:inline">
              {user.nombre || user.email}
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  aria-label="Menu de usuario"
                >
                  <Avatar size="sm">
                    <AvatarFallback>
                      {(user.nombre || user.email).charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => logout()}
                >
                  <LogOut />
                  Cerrar sesion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Bottom row: horizontal navigation (desktop only) */}
        <nav className="hidden border-t border-border/50 md:block">
          <div className="flex gap-1 px-4 md:px-6 lg:px-8">
            {dashboardNavItems.map((item) => {
              const isActive =
                item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(item.href);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm transition-colors",
                    isActive
                      ? "border-primary font-medium text-primary"
                      : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                  )}
                >
                  <Icon className="size-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </header>

      <MobileMenu open={mobileMenuOpen} onOpenChange={setMobileMenuOpen} />
    </>
  );
}
