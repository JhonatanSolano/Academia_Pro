"use client";

import { motion } from "framer-motion";
import { Layers, BookOpen, Crown, Package } from "lucide-react";
import { useAllProgramTrees } from "@/lib/hooks/useModules";
import { DashboardSkeleton } from "@/components/ui/Skeletons";
import HierarchyTree from "@/components/admin/HierarchyTree";

export default function AdminDashboardPage() {
  const { trees, loading, error, refetch } = useAllProgramTrees();

  const freeCount = trees.filter((p) => p.type === "free").length;
  const premiumCount = trees.filter((p) => p.type === "premium").length;
  const totalUnits = trees.reduce((a, p) => a + p.units.length, 0);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-text-inverse sm:text-3xl">
          Jerarquía curricular
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Programa → Unidad → Tema → Contenido
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mb-8 grid gap-4 sm:grid-cols-4"
      >
        <StatCard
          icon={<Layers className="h-5 w-5 text-accent" />}
          label="Programas"
          value={trees.length}
        />
        <StatCard
          icon={<Package className="h-5 w-5 text-brand-light" />}
          label="Unidades"
          value={totalUnits}
        />
        <StatCard
          icon={<BookOpen className="h-5 w-5 text-success" />}
          label="Gratuitos"
          value={freeCount}
        />
        <StatCard
          icon={<Crown className="h-5 w-5 text-premium" />}
          label="Premium"
          value={premiumCount}
        />
      </motion.div>

      {/* HierarchyTree */}
      {loading ? (
        <DashboardSkeleton />
      ) : error ? (
        <p className="text-center text-sm text-error">{error}</p>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <HierarchyTree trees={trees} onRefresh={refetch} />
        </motion.div>
      )}
    </div>
  );
}

/* ── Stat card ── */
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
