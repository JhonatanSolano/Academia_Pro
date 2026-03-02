"use client";

import { motion } from "framer-motion";

/**
 * Base shimmer block used by all skeletons.
 * Renders a glassmorphism-styled placeholder with an animated pulse.
 */
export function ShimmerBlock({
  className = "",
  rounded = "rounded-lg",
}: {
  className?: string;
  rounded?: string;
}) {
  return (
    <motion.div
      className={`bg-brand/[0.07] backdrop-blur-sm ${rounded} ${className}`}
      animate={{ opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    />
  );
}

/**
 * ModuleCardSkeleton — mirrors the exact layout of a real ModuleCard:
 *  ┌──────────────────────────────┐
 *  │  badge bar                   │
 *  │  ▓▓▓▓▓▓▓▓▓▓▓▓▓ title       │
 *  │  ▓▓▓▓▓▓▓▓▓▓ description x2  │
 *  │  ▓▓▓▓▓▓▓ cta                │
 *  └──────────────────────────────┘
 */
export function ModuleCardSkeleton() {
  return (
    <div
      className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
      role="status"
      aria-busy="true"
      aria-label="Cargando módulo…"
    >
      {/* Badge */}
      <ShimmerBlock className="h-5 w-20" rounded="rounded-full" />

      {/* Title */}
      <ShimmerBlock className="h-6 w-3/4" />

      {/* Description lines */}
      <div className="flex flex-col gap-2">
        <ShimmerBlock className="h-4 w-full" />
        <ShimmerBlock className="h-4 w-5/6" />
      </div>

      {/* CTA */}
      <ShimmerBlock className="mt-2 h-10 w-32" rounded="rounded-xl" />
    </div>
  );
}

/**
 * Grid of N ModuleCardSkeletons
 */
export function ModuleGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      aria-busy="true"
      aria-label="Cargando módulos…"
    >
      {Array.from({ length: count }).map((_, i) => (
        <ModuleCardSkeleton key={i} />
      ))}
    </div>
  );
}

/**
 * ContentViewerSkeleton — simulates the module content layout:
 *  video player + text lines + question placeholders
 */
export function ContentViewerSkeleton() {
  return (
    <div
      className="mx-auto flex max-w-4xl flex-col gap-6"
      role="status"
      aria-busy="true"
      aria-label="Cargando contenido del módulo…"
    >
      {/* Video placeholder */}
      <ShimmerBlock className="aspect-video w-full" rounded="rounded-2xl" />

      {/* Title */}
      <ShimmerBlock className="h-8 w-2/3" />

      {/* Text lines */}
      <div className="flex flex-col gap-3">
        <ShimmerBlock className="h-4 w-full" />
        <ShimmerBlock className="h-4 w-11/12" />
        <ShimmerBlock className="h-4 w-4/5" />
        <ShimmerBlock className="h-4 w-full" />
        <ShimmerBlock className="h-4 w-3/4" />
      </div>

      {/* Question blocks */}
      <div className="flex flex-col gap-4 pt-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex flex-col gap-2 rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
          >
            <ShimmerBlock className="h-5 w-4/5" />
            <ShimmerBlock className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Full-screen skeleton used by AuthGuard while checking auth state.
 * Centered spinner-like card with the brand identity.
 */
export function FullScreenSkeleton() {
  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{
        background: "linear-gradient(135deg, #4f46e5 0%, #1e293b 100%)",
      }}
      role="status"
      aria-busy="true"
      aria-label="Verificando sesión…"
    >
      <div className="flex flex-col items-center gap-6 rounded-2xl border border-white/10 bg-white/5 px-12 py-10 backdrop-blur-xl">
        {/* Logo placeholder pulse */}
        <motion.div
          className="h-12 w-12 rounded-full bg-brand/30"
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />
        <ShimmerBlock className="h-5 w-40" />
        <ShimmerBlock className="h-4 w-28" />
      </div>
    </div>
  );
}

/**
 * DashboardSkeleton — the full page skeleton for the student dashboard:
 * header bar + stats + grid
 */
export function DashboardSkeleton() {
  return (
    <div className="flex min-h-screen flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <ShimmerBlock className="h-8 w-48" />
          <ShimmerBlock className="h-4 w-64" />
        </div>
        <ShimmerBlock className="h-10 w-10" rounded="rounded-full" />
      </div>

      {/* Stats row */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
          >
            <ShimmerBlock className="h-4 w-24" />
            <ShimmerBlock className="h-8 w-16" />
          </div>
        ))}
      </div>

      {/* Module grid */}
      <ModuleGridSkeleton count={6} />
    </div>
  );
}
