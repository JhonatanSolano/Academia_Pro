"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Crown,
  TrendingUp,
  Layers,
  Lock,
  Play,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/hooks/useAuth";
import { usePrograms } from "@/lib/hooks/useModules";
import { isPremiumActive, canAccessContent } from "@/types";
import type { Program } from "@/types";
import { DashboardSkeleton } from "@/components/ui/Skeletons";

export default function StudentDashboardPage() {
  const { user } = useAuth();
  const { programs, loading } = usePrograms();

  const premium = user ? isPremiumActive(user) : false;
  const freeCount = programs.filter((p) => p.type === "free").length;
  const premiumCount = programs.filter((p) => p.type === "premium").length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-text-inverse sm:text-3xl">
          Hola, {user?.displayName?.split(" ")[0] ?? "Estudiante"} 👋
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          {premium
            ? "Tienes acceso completo a todos los programas."
            : "Explora los programas gratuitos o desbloquea premium."}
        </p>
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mb-10 grid gap-4 sm:grid-cols-3"
      >
        <StatCard
          icon={<Layers className="h-5 w-5 text-accent" />}
          label="Programas disponibles"
          value={programs.length}
        />
        <StatCard
          icon={<BookOpen className="h-5 w-5 text-success" />}
          label="Gratuitos"
          value={freeCount}
        />
        <StatCard
          icon={<TrendingUp className="h-5 w-5 text-brand-light" />}
          label="Tu estado"
          value={premium ? "Premium" : "Gratis"}
        />
      </motion.div>

      {/* Program grid */}
      <section aria-label="Programas disponibles">
        <h2 className="mb-6 text-lg font-bold text-text-inverse">
          Programas disponibles
        </h2>

        {loading ? (
          <DashboardSkeleton />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((prog, i) => (
              <ProgramCard
                key={prog.id}
                program={prog}
                hasAccess={canAccessContent(prog, user)}
                index={i}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

/* ── Program card ── */
function ProgramCard({
  program,
  hasAccess,
  index,
}: {
  program: Program;
  hasAccess: boolean;
  index: number;
}) {
  const isFree = program.type === "free";

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/[0.08] hover:shadow-xl hover:shadow-brand/5"
    >
      {/* Badge */}
      <div className="flex items-center gap-2">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
            isFree
              ? "bg-success/15 text-success"
              : "bg-premium/15 text-premium"
          }`}
        >
          {isFree ? (
            <>
              <BookOpen className="h-3 w-3" aria-hidden="true" /> Gratis
            </>
          ) : (
            <>
              <Crown className="h-3 w-3" aria-hidden="true" /> Premium
            </>
          )}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold leading-snug text-text-inverse">
        {program.title}
      </h3>

      {/* Description */}
      <p className="line-clamp-2 text-sm leading-relaxed text-slate-400">
        {program.description || "Sin descripción"}
      </p>

      {/* CTA */}
      {hasAccess ? (
        <Link
          href={`/programa/${program.id}`}
          className="mt-auto inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-light"
        >
          <Play className="h-4 w-4" aria-hidden="true" />
          Estudiar
        </Link>
      ) : (
        <Link
          href="/premium"
          className="mt-auto inline-flex items-center gap-2 rounded-xl border border-premium/30 bg-premium/10 px-5 py-2.5 text-sm font-semibold text-premium transition-colors hover:bg-premium/20"
        >
          <Lock className="h-4 w-4" aria-hidden="true" />
          Desbloquear
        </Link>
      )}
    </motion.article>
  );
}

/* ── Small stat card ── */
function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
        {icon}
      </div>
      <div>
        <p className="text-xs font-medium text-slate-400">{label}</p>
        <p className="text-lg font-bold text-text-inverse">{value}</p>
      </div>
    </div>
  );
}
