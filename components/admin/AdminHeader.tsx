"use client";

import { GraduationCap, LogOut, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/hooks/useAuth";

export default function AdminHeader() {
  const { user, signOut } = useAuth();

  if (!user) return null;

  return (
    <header className="border-b border-white/10 bg-primary/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-2 text-lg font-bold text-text-inverse"
        >
          <GraduationCap className="h-6 w-6 text-accent" aria-hidden="true" />
          <span>Pódium Académico</span>
          <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
            Admin
          </span>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-2">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            <LayoutDashboard className="h-4 w-4" />
            <span className="hidden sm:inline">Currículo</span>
          </Link>
        </nav>

        {/* User */}
        <div className="flex items-center gap-3">
          {user.photoURL ? (
            <Image
              src={user.photoURL}
              alt={user.displayName ?? "Avatar"}
              width={32}
              height={32}
              className="rounded-full border border-white/20"
            />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
              {(user.displayName ?? user.email)?.[0]?.toUpperCase() ?? "U"}
            </div>
          )}
          <button
            onClick={signOut}
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Cerrar sesión"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
