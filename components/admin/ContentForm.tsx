"use client";

import { useState, useCallback, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Save, X, Plus, Trash2 } from "lucide-react";
import type { Content, ContentType, Question } from "@/types";
import { CONTENT_TYPE_LABELS } from "@/types";
import {
  createContent,
  updateContent,
  uploadContentFile,
} from "@/lib/firebase/curriculum";
import FileUploader from "./FileUploader";
import { useToast } from "./Toast";

const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-text-inverse placeholder-slate-500 outline-none transition-colors focus:border-brand [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

const selectCls =
  "w-full rounded-xl border border-white/10 bg-[#1e293b] px-4 py-2.5 text-sm text-text-inverse outline-none transition-colors focus:border-brand";

function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

function emptyQuestion(): Question {
  return {
    id: generateId(),
    text: "",
    options: [
      { label: "A", text: "" },
      { label: "B", text: "" },
      { label: "C", text: "" },
      { label: "D", text: "" },
    ],
    correctAnswer: "A",
  };
}

interface ContentFormProps {
  parentIds: { topicId: string; unitId: string; programId: string };
  content?: Content;
  onSaved: () => void;
  onCancel: () => void;
}

export default function ContentForm({
  parentIds,
  content,
  onSaved,
  onCancel,
}: ContentFormProps) {
  const { toast } = useToast();
  const isEditing = !!content;

  const [title, setTitle] = useState(content?.title ?? "");
  const [type, setType] = useState<ContentType>(content?.type ?? "theory");
  const [order, setOrder] = useState(content?.order ?? 0);
  const [body, setBody] = useState(content?.body ?? "");
  const [videoUrl, setVideoUrl] = useState(content?.videoUrl ?? "");
  const [pdfUrl, setPdfUrl] = useState(content?.pdfUrl ?? "");
  const [questions, setQuestions] = useState<Question[]>(
    content?.questions ?? [emptyQuestion()]
  );
  const [saving, setSaving] = useState(false);

  /* PDF upload */
  const handlePdfUpload = useCallback(
    async (file: File): Promise<string> => {
      const id = content?.id ?? "temp-" + generateId();
      const url = await uploadContentFile(file, id);
      setPdfUrl(url);
      return url;
    },
    [content?.id]
  );

  /* Question management */
  const addQuestion = () => setQuestions((p) => [...p, emptyQuestion()]);
  const removeQuestion = (id: string) =>
    setQuestions((p) => p.filter((q) => q.id !== id));

  const updateQuestionField = (id: string, field: string, value: unknown) =>
    setQuestions((p) =>
      p.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    );

  const updateOptionText = (qId: string, idx: number, text: string) =>
    setQuestions((p) =>
      p.map((q) => {
        if (q.id !== qId) return q;
        const opts = [...q.options];
        opts[idx] = { ...opts[idx], text };
        return { ...q, options: opts };
      })
    );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast("El título es requerido", "error");
      return;
    }
    setSaving(true);
    try {
      const data = {
        ...parentIds,
        title: title.trim(),
        type,
        order,
        body: ["theory", "example", "exercise"].includes(type) ? body : undefined,
        videoUrl: type === "video" ? videoUrl.trim() || undefined : undefined,
        pdfUrl: type === "pdf" ? pdfUrl || undefined : undefined,
        questions: type === "quiz" ? questions : undefined,
      };

      if (isEditing && content) {
        await updateContent(content.id, data);
        toast("Contenido actualizado");
      } else {
        await createContent(data);
        toast("Contenido creado");
      }
      onSaved();
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
      className="space-y-4 rounded-xl border border-accent/20 bg-accent/[0.03] p-4"
    >
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-text-inverse">
          {isEditing ? "Editar contenido" : "Nuevo contenido"}
        </h4>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg p-1 text-slate-400 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-400">Título</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Nombre del contenido"
            className={inputCls}
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-400">Tipo</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as ContentType)}
            className={selectCls}
          >
            {Object.entries(CONTENT_TYPE_LABELS).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </div>
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
      </div>

      {/* ── Polymorphic fields ── */}

      {/* Theory / Example / Exercise → textarea */}
      {["theory", "example", "exercise"].includes(type) && (
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-400">
            Contenido (Markdown)
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Escribe el contenido aquí..."
            rows={6}
            className={inputCls}
          />
        </div>
      )}

      {/* Video → URL input */}
      {type === "video" && (
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-400">
            URL del video (YouTube)
          </label>
          <input
            type="url"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=…"
            className={inputCls}
          />
        </div>
      )}

      {/* PDF → FileUploader */}
      {type === "pdf" && (
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-400">
            Archivo PDF
          </label>
          <FileUploader
            currentUrl={pdfUrl || undefined}
            onUpload={handlePdfUpload}
            onClear={() => setPdfUrl("")}
          />
        </div>
      )}

      {/* Quiz → Questions builder */}
      {type === "quiz" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">
              Preguntas ({questions.length})
            </span>
            <button
              type="button"
              onClick={addQuestion}
              className="flex items-center gap-1 rounded-lg bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-slate-300 hover:bg-white/20"
            >
              <Plus className="h-3 w-3" /> Agregar
            </button>
          </div>

          {questions.map((q, qi) => (
            <div
              key={q.id}
              className="space-y-2 rounded-lg border border-white/10 bg-white/[0.02] p-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-brand-light">
                  {qi + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeQuestion(q.id)}
                  className="rounded p-0.5 text-slate-500 hover:text-error"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
              <textarea
                value={q.text}
                onChange={(e) =>
                  updateQuestionField(q.id, "text", e.target.value)
                }
                placeholder="Escribe la pregunta..."
                rows={2}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-text-inverse placeholder-slate-500 outline-none focus:border-brand"
              />
              <div className="grid gap-2 sm:grid-cols-2">
                {q.options.map((opt, oi) => (
                  <div key={opt.label} className="flex items-center gap-2">
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                        q.correctAnswer === opt.label
                          ? "bg-success/20 text-success"
                          : "bg-white/10 text-slate-400"
                      }`}
                    >
                      {opt.label}
                    </span>
                    <input
                      type="text"
                      value={opt.text}
                      onChange={(e) =>
                        updateOptionText(q.id, oi, e.target.value)
                      }
                      placeholder={`Opción ${opt.label}`}
                      className="flex-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-sm text-text-inverse placeholder-slate-500 outline-none focus:border-brand"
                    />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-400">Correcta:</span>
                <select
                  value={q.correctAnswer}
                  onChange={(e) =>
                    updateQuestionField(q.id, "correctAnswer", e.target.value)
                  }
                  className="rounded border border-white/10 bg-[#1e293b] px-2 py-1 text-xs text-text-inverse outline-none focus:border-brand"
                >
                  {q.options.map((o) => (
                    <option key={o.label} value={o.label}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}

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
