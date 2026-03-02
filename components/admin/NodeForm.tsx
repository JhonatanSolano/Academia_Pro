"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Save, X } from "lucide-react";
import { useToast } from "@/components/admin/Toast";

const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-text-inverse placeholder-slate-500 outline-none transition-colors focus:border-brand [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

const selectCls =
  "w-full rounded-xl border border-white/10 bg-[#1e293b] px-4 py-2.5 text-sm text-text-inverse outline-none transition-colors focus:border-brand";

/* ── Slugify ── */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/* ── Node Form — used for Programs, Units, and Topics ── */

interface NodeFormProps {
  level: "program" | "unit" | "topic";
  initial?: { title: string; slug: string; description: string; order: number; type?: "free" | "premium" };
  onSave: (data: {
    title: string;
    slug: string;
    description: string;
    order: number;
    type?: "free" | "premium";
  }) => Promise<void>;
  onCancel: () => void;
}

const levelLabels: Record<string, string> = {
  program: "Programa",
  unit: "Unidad",
  topic: "Tema",
};

export default function NodeForm({
  level,
  initial,
  onSave,
  onCancel,
}: NodeFormProps) {
  const { toast } = useToast();
  const isEditing = !!initial;

  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [order, setOrder] = useState(initial?.order ?? 0);
  const [type, setType] = useState<"free" | "premium">(
    initial?.type ?? "free"
  );
  const [saving, setSaving] = useState(false);

  const handleTitleChange = (v: string) => {
    setTitle(v);
    if (!isEditing) setSlug(slugify(v));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast("El título es requerido", "error");
      return;
    }
    setSaving(true);
    try {
      await onSave({
        title: title.trim(),
        slug: slug.trim() || slugify(title),
        description: description.trim(),
        order,
        ...(level === "program" ? { type } : {}),
      });
    } catch (err) {
      toast((err as Error).message, "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="space-y-4 rounded-xl border border-white/10 bg-white/[0.03] p-4"
    >
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-text-inverse">
          {isEditing ? `Editar ${levelLabels[level]}` : `Nuevo ${levelLabels[level]}`}
        </h4>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg p-1 text-slate-400 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-400">Título</label>
          <input
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder={`Nombre del ${levelLabels[level].toLowerCase()}`}
            className={inputCls}
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-400">Slug</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="auto-generado"
            className={inputCls}
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-medium text-slate-400">
          Descripción
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción breve..."
          rows={2}
          className={inputCls}
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-400">Orden</label>
          <input
            type="number"
            value={order}
            onChange={(e) => setOrder(Number(e.target.value))}
            min={0}
            className={inputCls}
          />
        </div>
        {level === "program" && (
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-400">Tipo</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as "free" | "premium")}
              className={selectCls}
            >
              <option value="free">Gratis</option>
              <option value="premium">Premium</option>
            </select>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={saving}
        className="flex items-center gap-2 rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-light disabled:opacity-50"
      >
        <Save className="h-4 w-4" />
        {saving ? "Guardando\u2026" : "Guardar"}
      </button>
    </motion.form>
  );
}
