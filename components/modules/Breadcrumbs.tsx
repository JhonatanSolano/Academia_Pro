"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav
      className="flex items-center gap-1 text-xs text-slate-500"
      aria-label="Breadcrumb"
    >
      <Link
        href="/dashboard"
        className="flex items-center gap-1 rounded px-1.5 py-1 transition-colors hover:text-white"
      >
        <Home className="h-3 w-3" />
        <span className="hidden sm:inline">Inicio</span>
      </Link>

      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          <ChevronRight className="h-3 w-3 text-slate-600" />
          {item.href ? (
            <Link
              href={item.href}
              className="rounded px-1.5 py-1 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ) : (
            <span className="px-1.5 py-1 font-medium text-slate-300">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
