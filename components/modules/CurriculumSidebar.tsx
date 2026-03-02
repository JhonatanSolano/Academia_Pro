"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  FolderOpen,
  BookOpen,
  FileText,
  Video,
  HelpCircle,
  FileDown,
  Lightbulb,
  GraduationCap,
  CheckCircle2,
  Menu,
  X,
} from "lucide-react";
import type {
  ProgramTree,
  UnitWithTopics,
  TopicWithContents,
  Content,
  ContentType,
  ContentCompletion,
} from "@/types";

/* ── Content type icons ── */
const typeIcon: Record<ContentType, React.ReactNode> = {
  theory: <FileText className="h-3.5 w-3.5" />,
  example: <Lightbulb className="h-3.5 w-3.5" />,
  exercise: <GraduationCap className="h-3.5 w-3.5" />,
  quiz: <HelpCircle className="h-3.5 w-3.5" />,
  video: <Video className="h-3.5 w-3.5" />,
  pdf: <FileDown className="h-3.5 w-3.5" />,
};

interface CurriculumSidebarProps {
  tree: ProgramTree;
  completions: ContentCompletion[];
  activeContentId: string | null;
  onSelectContent: (content: Content) => void;
}

export default function CurriculumSidebar({
  tree,
  completions,
  activeContentId,
  onSelectContent,
}: CurriculumSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const completedIds = new Set(completions.map((c) => c.contentId));

  const sidebar = (
    <nav
      className="flex h-full flex-col overflow-y-auto border-r border-white/10 bg-primary/95 backdrop-blur-md"
      aria-label="Navegación del programa"
    >
      {/* Program title */}
      <div className="border-b border-white/10 p-4">
        <h2 className="text-sm font-bold text-text-inverse">{tree.title}</h2>
        <p className="mt-0.5 text-[11px] text-slate-500">
          {tree.units.length} unidades ·{" "}
          {tree.units.reduce((a, u) => a + u.topics.length, 0)} temas
        </p>
      </div>

      {/* Unit/Topic/Content tree */}
      <div className="flex-1 space-y-1 p-3">
        {tree.units.map((unit) => (
          <SidebarUnit
            key={unit.id}
            unit={unit}
            completedIds={completedIds}
            activeContentId={activeContentId}
            onSelectContent={(c) => {
              onSelectContent(c);
              setMobileOpen(false);
            }}
          />
        ))}
      </div>

      {/* Progress bar */}
      <ProgressBar completedIds={completedIds} tree={tree} />
    </nav>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed bottom-4 left-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white shadow-lg md:hidden"
        aria-label="Abrir menú"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-50 w-72 md:hidden"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute right-2 top-2 z-10 rounded-lg p-2 text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
              {sidebar}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <aside className="hidden w-72 shrink-0 md:block">{sidebar}</aside>
    </>
  );
}

/* ── Unit row ── */
function SidebarUnit({
  unit,
  completedIds,
  activeContentId,
  onSelectContent,
}: {
  unit: UnitWithTopics;
  completedIds: Set<string>;
  activeContentId: string | null;
  onSelectContent: (c: Content) => void;
}) {
  const [open, setOpen] = useState(true);

  const totalContents = unit.topics.reduce(
    (a, t) => a + t.contents.length,
    0
  );
  const doneContents = unit.topics.reduce(
    (a, t) => a + t.contents.filter((c) => completedIds.has(c.id)).length,
    0
  );

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-xs font-semibold uppercase tracking-wider text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
      >
        <ChevronRight
          className={`h-3 w-3 shrink-0 transition-transform ${open ? "rotate-90" : ""}`}
        />
        <FolderOpen className="h-3.5 w-3.5 shrink-0 text-accent" />
        <span className="flex-1 truncate">{unit.title}</span>
        <span className="text-[10px] text-slate-600">
          {doneContents}/{totalContents}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="ml-3 border-l border-white/5 pl-2"
          >
            {unit.topics.map((topic) => (
              <SidebarTopic
                key={topic.id}
                topic={topic}
                completedIds={completedIds}
                activeContentId={activeContentId}
                onSelectContent={onSelectContent}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Topic row ── */
function SidebarTopic({
  topic,
  completedIds,
  activeContentId,
  onSelectContent,
}: {
  topic: TopicWithContents;
  completedIds: Set<string>;
  activeContentId: string | null;
  onSelectContent: (c: Content) => void;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className="mt-0.5">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-1.5 rounded-md px-2 py-1.5 text-left text-[11px] font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
      >
        <ChevronRight
          className={`h-2.5 w-2.5 shrink-0 transition-transform ${open ? "rotate-90" : ""}`}
        />
        <BookOpen className="h-3 w-3 shrink-0 text-success" />
        <span className="flex-1 truncate">{topic.title}</span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="ml-3 space-y-px border-l border-white/[0.04] pl-2"
          >
            {topic.contents.map((content) => {
              const done = completedIds.has(content.id);
              const active = content.id === activeContentId;

              return (
                <button
                  key={content.id}
                  onClick={() => onSelectContent(content)}
                  className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[11px] transition-colors ${
                    active
                      ? "bg-brand/20 text-brand-light font-semibold"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {typeIcon[content.type]}
                  <span className="flex-1 truncate">{content.title}</span>
                  {done && (
                    <CheckCircle2 className="h-3 w-3 shrink-0 text-success" />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Progress bar ── */
function ProgressBar({
  completedIds,
  tree,
}: {
  completedIds: Set<string>;
  tree: ProgramTree;
}) {
  const total = tree.units.reduce(
    (a, u) => a + u.topics.reduce((b, t) => b + t.contents.length, 0),
    0
  );
  const done = tree.units.reduce(
    (a, u) =>
      a +
      u.topics.reduce(
        (b, t) => b + t.contents.filter((c) => completedIds.has(c.id)).length,
        0
      ),
    0
  );
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <div className="border-t border-white/10 p-4">
      <div className="mb-1.5 flex items-center justify-between text-[11px]">
        <span className="font-medium text-slate-400">Progreso</span>
        <span className="font-semibold text-text-inverse">{pct}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-brand to-accent"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6 }}
        />
      </div>
      <p className="mt-1 text-[10px] text-slate-500">
        {done} de {total} completados
      </p>
    </div>
  );
}
