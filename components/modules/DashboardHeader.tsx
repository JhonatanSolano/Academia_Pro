"use client";

import { GraduationCap, LogOut, Crown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/hooks/useAuth";
import { isPremiumActive } from "@/types";

export default function DashboardHeader() {
  const { user, signOut } = useAuth();

  if (!user) return null;

  const premium = isPremiumActive(user);

  return (
    <header className="border-b border-white/10 bg-primary/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-lg font-bold text-text-inverse"
        >
          <GraduationCap className="h-6 w-6 text-accent" aria-hidden="true" />
          <span>Pódium Académico</span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {premium && (
            <span className="hidden items-center gap-1 rounded-full bg-premium/15 px-3 py-1 text-xs font-semibold text-premium sm:inline-flex">
              <Crown className="h-3 w-3" aria-hidden="true" />
              Premium
            </span>
          )}

          {/* Avatar */}
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
            <span className="hidden text-sm font-medium text-slate-300 sm:block">
              {user.displayName ?? user.email}
            </span>
          </div>

          {/* Sign out */}
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
