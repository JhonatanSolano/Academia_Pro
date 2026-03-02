"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Plus,
  Pencil,
  Trash2,
  BookOpen,
  Crown,
  Layers,
  FolderOpen,
  FileText,
  Video,
  HelpCircle,
  FileDown,
  Lightbulb,
  GraduationCap,
} from "lucide-react";
import type {
  ProgramTree,
  UnitWithTopics,
  TopicWithContents,
  Content,
  ContentType,
} from "@/types";
import { CONTENT_TYPE_LABELS } from "@/types";
import {
  deleteProgram,
  deleteUnit,
  deleteTopic,
  deleteContent,
  updateProgram,
  updateUnit,
  updateTopic,
  createUnit,
  createTopic,
} from "@/lib/firebase/curriculum";
import NodeForm from "./NodeForm";
import ContentForm from "./ContentForm";
import { useToast } from "./Toast";

/* ── Content type icons ── */
const contentIcon: Record<ContentType, React.ReactNode> = {
  theory: <FileText className="h-3.5 w-3.5 text-accent" />,
  example: <Lightbulb className="h-3.5 w-3.5 text-warning" />,
  exercise: <GraduationCap className="h-3.5 w-3.5 text-brand-light" />,
  quiz: <HelpCircle className="h-3.5 w-3.5 text-success" />,
  video: <Video className="h-3.5 w-3.5 text-error" />,
  pdf: <FileDown className="h-3.5 w-3.5 text-premium" />,
};

/* ═══════════════════════════════════════════
   HIERARCHY TREE
   ═══════════════════════════════════════════ */

interface HierarchyTreeProps {
  trees: ProgramTree[];
  onRefresh: () => void;
}

export default function HierarchyTree({ trees, onRefresh }: HierarchyTreeProps) {
  const [addingProgram, setAddingProgram] = useState(false);

  return (
    <div className="space-y-3" role="tree" aria-label="Jerarquía curricular">
      {trees.map((program) => (
        <ProgramNode key={program.id} program={program} onRefresh={onRefresh} />
      ))}

      <AnimatePresence>
        {addingProgram && (
          <NodeForm
            level="program"
            onSave={async (data) => {
              const { createProgram } = await import("@/lib/firebase/curriculum");
              await createProgram({ ...data, type: data.type ?? "free" });
              setAddingProgram(false);
              onRefresh();
            }}
            onCancel={() => setAddingProgram(false)}
          />
        )}
      </AnimatePresence>

      {!addingProgram && (
        <button
          onClick={() => setAddingProgram(true)}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-white/15 bg-white/[0.02] py-4 text-sm font-medium text-slate-400 transition-colors hover:border-white/30 hover:text-white"
        >
          <Plus className="h-4 w-4" /> Nuevo programa
        </button>
      )}
    </div>
  );
}

/* ── Program (Level 1) ── */
function ProgramNode({
  program,
  onRefresh,
}: {
  program: ProgramTree;
  onRefresh: () => void;
}) {
  const { toast } = useToast();
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [addingUnit, setAddingUnit] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`¿Eliminar "${program.title}" y todo su contenido?`)) return;
    try {
      await deleteProgram(program.id);
      toast("Programa eliminado");
      onRefresh();
    } catch (err) {
      toast((err as Error).message, "error");
    }
  };

  return (
    <div
      className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md"
      role="treeitem"
      aria-level={1}
      aria-expanded={expanded}
    >
      {/* Header */}
      <div className="flex items-center gap-3 p-4">
        <button
          onClick={() => setExpanded(!expanded)}
          className="rounded-lg p-1 text-slate-400 transition-transform hover:text-white"
          aria-label={expanded ? "Colapsar" : "Expandir"}
        >
          <ChevronRight
            className={`h-4 w-4 transition-transform ${expanded ? "rotate-90" : ""}`}
          />
        </button>

        <Layers className="h-4 w-4 shrink-0 text-brand-light" />

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="truncate font-semibold text-text-inverse">
              {program.title}
            </span>
            <Badge type={program.type} />
            <span className="text-[10px] text-slate-500">
              {program.units.length} unidades
            </span>
          </div>
          {program.description && (
            <p className="truncate text-xs text-slate-500">
              {program.description}
            </p>
          )}
        </div>

        <Actions
          onEdit={() => setEditing(true)}
          onDelete={handleDelete}
          onAdd={() => {
            setExpanded(true);
            setAddingUnit(true);
          }}
          addLabel="Unidad"
        />
      </div>

      {/* Edit form */}
      <AnimatePresence>
        {editing && (
          <div className="px-4 pb-4">
            <NodeForm
              level="program"
              initial={{
                title: program.title,
                slug: program.slug,
                description: program.description,
                order: program.order,
                type: program.type,
              }}
              onSave={async (data) => {
                await updateProgram(program.id, data);
                toast("Programa actualizado");
                setEditing(false);
                onRefresh();
              }}
              onCancel={() => setEditing(false)}
            />
          </div>
        )}
      </AnimatePresence>

      {/* Children */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2 border-t border-white/5 px-4 pb-4 pt-2"
          >
            {program.units.map((unit) => (
              <UnitNode
                key={unit.id}
                unit={unit}
                programId={program.id}
                onRefresh={onRefresh}
              />
            ))}

            <AnimatePresence>
              {addingUnit && (
                <NodeForm
                  level="unit"
                  onSave={async (data) => {
                    await createUnit({
                      ...data,
                      programId: program.id,
                    });
                    toast("Unidad creada");
                    setAddingUnit(false);
                    onRefresh();
                  }}
                  onCancel={() => setAddingUnit(false)}
                />
              )}
            </AnimatePresence>

            {!addingUnit && (
              <AddBtn
                label="Agregar unidad"
                onClick={() => setAddingUnit(true)}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Unit (Level 2) ── */
function UnitNode({
  unit,
  programId,
  onRefresh,
}: {
  unit: UnitWithTopics;
  programId: string;
  onRefresh: () => void;
}) {
  const { toast } = useToast();
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [addingTopic, setAddingTopic] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`¿Eliminar unidad "${unit.title}"?`)) return;
    try {
      await deleteUnit(unit.id);
      toast("Unidad eliminada");
      onRefresh();
    } catch (err) {
      toast((err as Error).message, "error");
    }
  };

  return (
    <div
      className="rounded-xl border border-white/[0.06] bg-white/[0.02]"
      role="treeitem"
      aria-level={2}
      aria-expanded={expanded}
    >
      <div className="flex items-center gap-3 p-3">
        <button
          onClick={() => setExpanded(!expanded)}
          className="rounded p-0.5 text-slate-500 hover:text-white"
        >
          <ChevronRight
            className={`h-3.5 w-3.5 transition-transform ${expanded ? "rotate-90" : ""}`}
          />
        </button>
        <FolderOpen className="h-3.5 w-3.5 shrink-0 text-accent" />
        <div className="min-w-0 flex-1">
          <span className="truncate text-sm font-medium text-text-inverse">
            {unit.title}
          </span>
          <span className="ml-2 text-[10px] text-slate-500">
            {unit.topics.length} temas
          </span>
        </div>
        <Actions
          onEdit={() => setEditing(true)}
          onDelete={handleDelete}
          onAdd={() => {
            setExpanded(true);
            setAddingTopic(true);
          }}
          addLabel="Tema"
          small
        />
      </div>

      <AnimatePresence>
        {editing && (
          <div className="px-3 pb-3">
            <NodeForm
              level="unit"
              initial={{
                title: unit.title,
                slug: unit.slug,
                description: unit.description,
                order: unit.order,
              }}
              onSave={async (data) => {
                await updateUnit(unit.id, data);
                toast("Unidad actualizada");
                setEditing(false);
                onRefresh();
              }}
              onCancel={() => setEditing(false)}
            />
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2 border-t border-white/[0.04] px-3 pb-3 pt-2"
          >
            {unit.topics.map((topic) => (
              <TopicNode
                key={topic.id}
                topic={topic}
                unitId={unit.id}
                programId={programId}
                onRefresh={onRefresh}
              />
            ))}

            <AnimatePresence>
              {addingTopic && (
                <NodeForm
                  level="topic"
                  onSave={async (data) => {
                    await createTopic({
                      ...data,
                      unitId: unit.id,
                      programId,
                    });
                    toast("Tema creado");
                    setAddingTopic(false);
                    onRefresh();
                  }}
                  onCancel={() => setAddingTopic(false)}
                />
              )}
            </AnimatePresence>

            {!addingTopic && (
              <AddBtn
                label="Agregar tema"
                onClick={() => setAddingTopic(true)}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Topic (Level 3) ── */
function TopicNode({
  topic,
  unitId,
  programId,
  onRefresh,
}: {
  topic: TopicWithContents;
  unitId: string;
  programId: string;
  onRefresh: () => void;
}) {
  const { toast } = useToast();
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [addingContent, setAddingContent] = useState(false);
  const [editingContent, setEditingContent] = useState<Content | null>(null);

  const handleDelete = async () => {
    if (!confirm(`¿Eliminar tema "${topic.title}"?`)) return;
    try {
      await deleteTopic(topic.id);
      toast("Tema eliminado");
      onRefresh();
    } catch (err) {
      toast((err as Error).message, "error");
    }
  };

  const handleDeleteContent = async (c: Content) => {
    if (!confirm(`¿Eliminar contenido "${c.title}"?`)) return;
    try {
      await deleteContent(c.id);
      toast("Contenido eliminado");
      onRefresh();
    } catch (err) {
      toast((err as Error).message, "error");
    }
  };

  return (
    <div
      className="rounded-lg border border-white/[0.04] bg-white/[0.01]"
      role="treeitem"
      aria-level={3}
      aria-expanded={expanded}
    >
      <div className="flex items-center gap-2 p-2.5">
        <button
          onClick={() => setExpanded(!expanded)}
          className="rounded p-0.5 text-slate-500 hover:text-white"
        >
          <ChevronRight
            className={`h-3 w-3 transition-transform ${expanded ? "rotate-90" : ""}`}
          />
        </button>
        <BookOpen className="h-3 w-3 shrink-0 text-success" />
        <div className="min-w-0 flex-1">
          <span className="truncate text-xs font-medium text-text-inverse">
            {topic.title}
          </span>
          <span className="ml-2 text-[10px] text-slate-500">
            {topic.contents.length} contenidos
          </span>
        </div>
        <Actions
          onEdit={() => setEditing(true)}
          onDelete={handleDelete}
          onAdd={() => {
            setExpanded(true);
            setAddingContent(true);
          }}
          addLabel="Contenido"
          small
        />
      </div>

      <AnimatePresence>
        {editing && (
          <div className="px-2.5 pb-2.5">
            <NodeForm
              level="topic"
              initial={{
                title: topic.title,
                slug: topic.slug,
                description: topic.description,
                order: topic.order,
              }}
              onSave={async (data) => {
                await updateTopic(topic.id, data);
                toast("Tema actualizado");
                setEditing(false);
                onRefresh();
              }}
              onCancel={() => setEditing(false)}
            />
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-1.5 border-t border-white/[0.03] px-2.5 pb-2.5 pt-2"
          >
            {/* Content items (Level 4) */}
            {topic.contents.map((c) => (
              <div key={c.id} role="treeitem" aria-level={4}>
                {editingContent?.id === c.id ? (
                  <ContentForm
                    parentIds={{ topicId: topic.id, unitId, programId }}
                    content={c}
                    onSaved={() => {
                      setEditingContent(null);
                      onRefresh();
                    }}
                    onCancel={() => setEditingContent(null)}
                  />
                ) : (
                  <div className="flex items-center gap-2 rounded-lg px-2.5 py-2 transition-colors hover:bg-white/[0.03]">
                    {contentIcon[c.type]}
                    <span className="flex-1 truncate text-xs text-slate-300">
                      {c.title}
                    </span>
                    <span className="rounded bg-white/5 px-1.5 py-0.5 text-[9px] font-medium uppercase text-slate-500">
                      {CONTENT_TYPE_LABELS[c.type]}
                    </span>
                    <button
                      onClick={() => setEditingContent(c)}
                      className="rounded p-1 text-slate-500 hover:text-accent"
                      title="Editar"
                    >
                      <Pencil className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => handleDeleteContent(c)}
                      className="rounded p-1 text-slate-500 hover:text-error"
                      title="Eliminar"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </div>
            ))}

            <AnimatePresence>
              {addingContent && (
                <ContentForm
                  parentIds={{ topicId: topic.id, unitId, programId }}
                  onSaved={() => {
                    setAddingContent(false);
                    onRefresh();
                  }}
                  onCancel={() => setAddingContent(false)}
                />
              )}
            </AnimatePresence>

            {!addingContent && (
              <AddBtn
                label="Agregar contenido"
                onClick={() => setAddingContent(true)}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Shared small components ── */

function Badge({ type }: { type: "free" | "premium" }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
        type === "free"
          ? "bg-success/15 text-success"
          : "bg-premium/15 text-premium"
      }`}
    >
      {type === "free" ? (
        <>
          <BookOpen className="h-2.5 w-2.5" /> Gratis
        </>
      ) : (
        <>
          <Crown className="h-2.5 w-2.5" /> Premium
        </>
      )}
    </span>
  );
}

function Actions({
  onEdit,
  onDelete,
  onAdd,
  addLabel,
  small,
}: {
  onEdit: () => void;
  onDelete: () => void;
  onAdd: () => void;
  addLabel: string;
  small?: boolean;
}) {
  const sz = small ? "h-3.5 w-3.5" : "h-4 w-4";
  const p = small ? "p-1" : "p-1.5";
  return (
    <div className="flex shrink-0 items-center gap-0.5">
      <button
        onClick={onAdd}
        className={`rounded-lg ${p} text-slate-500 transition-colors hover:bg-white/10 hover:text-accent`}
        title={`Agregar ${addLabel}`}
      >
        <Plus className={sz} />
      </button>
      <button
        onClick={onEdit}
        className={`rounded-lg ${p} text-slate-500 transition-colors hover:bg-white/10 hover:text-accent`}
        title="Editar"
      >
        <Pencil className={sz} />
      </button>
      <button
        onClick={onDelete}
        className={`rounded-lg ${p} text-slate-500 transition-colors hover:bg-white/10 hover:text-error`}
        title="Eliminar"
      >
        <Trash2 className={sz} />
      </button>
    </div>
  );
}

function AddBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-white/10 py-2 text-[11px] font-medium text-slate-500 transition-colors hover:border-white/25 hover:text-slate-300"
    >
      <Plus className="h-3 w-3" /> {label}
    </button>
  );
}
