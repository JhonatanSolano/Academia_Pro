"use client";

import { Crown, BookOpen } from "lucide-react";

interface StatusToggleProps {
  value: "free" | "premium";
  onChange: (value: "free" | "premium") => void;
}

export default function StatusToggle({ value, onChange }: StatusToggleProps) {
  return (
    <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 p-1">
      <button
        type="button"
        onClick={() => onChange("free")}
        className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
          value === "free"
            ? "bg-success/20 text-success shadow-sm"
            : "text-slate-400 hover:text-slate-300"
        }`}
      >
        <BookOpen className="h-4 w-4" />
        Gratis
      </button>
      <button
        type="button"
        onClick={() => onChange("premium")}
        className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
          value === "premium"
            ? "bg-premium/20 text-premium shadow-sm"
            : "text-slate-400 hover:text-slate-300"
        }`}
      >
        <Crown className="h-4 w-4" />
        Premium
      </button>
    </div>
  );
}
