"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { CheckCircle, ChevronRight, FileDown, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Content, Question } from "@/types";

interface ContentRendererProps {
  content: Content;
  completed: boolean;
  onMarkComplete: () => void;
}

export default function ContentRenderer({
  content,
  completed,
  onMarkComplete,
}: ContentRendererProps) {
  return (
    <motion.div
      key={content.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mx-auto max-w-3xl"
    >
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-accent">
            {content.type === "theory"
              ? "Teoría"
              : content.type === "example"
                ? "Ejemplo resuelto"
                : content.type === "exercise"
                  ? "Ejercicio"
                  : content.type === "quiz"
                    ? "Quiz"
                    : content.type === "video"
                      ? "Video"
                      : "PDF"}
          </p>
          <h1 className="text-xl font-bold text-text-inverse sm:text-2xl">
            {content.title}
          </h1>
        </div>
        {!completed && (
          <button
            onClick={onMarkComplete}
            className="flex shrink-0 items-center gap-1.5 rounded-xl bg-success/15 px-4 py-2 text-xs font-semibold text-success transition-colors hover:bg-success/25"
          >
            <CheckCircle className="h-4 w-4" /> Completar
          </button>
        )}
        {completed && (
          <span className="flex shrink-0 items-center gap-1.5 rounded-xl bg-success/15 px-4 py-2 text-xs font-semibold text-success">
            <CheckCircle className="h-4 w-4" /> Completado
          </span>
        )}
      </div>

      {/* Body (theory, example, exercise) */}
      {content.body && (
        <div className="markdown-body rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content.body}
          </ReactMarkdown>
        </div>
      )}

      {/* Video */}
      {content.type === "video" && content.videoUrl && (
        <VideoPlayer url={content.videoUrl} title={content.title} />
      )}

      {/* PDF */}
      {content.type === "pdf" && content.pdfUrl && (
        <PDFViewer url={content.pdfUrl} title={content.title} />
      )}

      {/* Quiz */}
      {content.type === "quiz" && content.questions && (
        <QuizEngine
          questions={content.questions}
          onComplete={onMarkComplete}
          completed={completed}
        />
      )}
    </motion.div>
  );
}

/* ═══════════════════════
   VIDEO PLAYER
   ═══════════════════════ */
function VideoPlayer({ url, title }: { url: string; title: string }) {
  const embedUrl = url.includes("watch?v=")
    ? url.replace("watch?v=", "embed/")
    : url.includes("youtu.be/")
      ? url.replace("youtu.be/", "www.youtube.com/embed/")
      : url;

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/20">
      <div className="relative aspect-video">
        <iframe
          src={embedUrl}
          title={`Video — ${title}`}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}

/* ═══════════════════════
   PDF VIEWER
   ═══════════════════════ */
function PDFViewer({ url, title }: { url: string; title: string }) {
  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/10">
        <iframe
          src={url}
          title={`PDF — ${title}`}
          className="h-[70vh] w-full"
        />
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-xl bg-brand/15 px-4 py-2.5 text-sm font-semibold text-brand-light transition-colors hover:bg-brand/25"
      >
        <FileDown className="h-4 w-4" /> Descargar PDF
      </a>
    </div>
  );
}

/* ═══════════════════════
   QUIZ ENGINE
   ═══════════════════════ */
function QuizEngine({
  questions,
  onComplete,
  completed: alreadyCompleted,
}: {
  questions: Question[];
  onComplete: () => void;
  completed: boolean;
}) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const q = questions[currentIdx];
  const totalQ = questions.length;
  const isLast = currentIdx === totalQ - 1;

  const handleSelect = useCallback(
    (label: string) => {
      if (showResults) return;
      setAnswers((prev) => ({ ...prev, [currentIdx]: label }));
    },
    [currentIdx, showResults]
  );

  const handleNext = () => {
    if (isLast) {
      setShowResults(true);
      if (!alreadyCompleted) onComplete();
    } else {
      setCurrentIdx((i) => i + 1);
    }
  };

  const correctCount = questions.filter(
    (q, i) => answers[i] === q.correctAnswer
  ).length;
  const pct = Math.round((correctCount / totalQ) * 100);

  if (showResults) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-md">
        <p className="text-4xl font-bold text-text-inverse">{pct}%</p>
        <p className="mt-2 text-sm text-slate-400">
          {correctCount} de {totalQ} respuestas correctas
        </p>
        <button
          onClick={() => {
            setShowResults(false);
            setCurrentIdx(0);
            setAnswers({});
          }}
          className="mt-6 rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-light"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (!q) return null;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
      {/* Progress */}
      <div className="mb-4 flex items-center justify-between text-xs text-slate-500">
        <span>
          Pregunta {currentIdx + 1} de {totalQ}
        </span>
        <div className="flex gap-1">
          {questions.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-4 rounded-full ${
                i === currentIdx
                  ? "bg-brand"
                  : answers[i] !== undefined
                    ? "bg-white/20"
                    : "bg-white/5"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Question text */}
      <p className="mb-6 text-base font-semibold text-text-inverse">
        {q.text}
      </p>

      {/* Options */}
      <div className="space-y-2">
        {q.options.map((opt) => {
          const selected = answers[currentIdx] === opt.label;
          return (
            <button
              key={opt.label}
              onClick={() => handleSelect(opt.label)}
              className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all ${
                selected
                  ? "border-brand bg-brand/15 text-brand-light"
                  : "border-white/10 text-slate-300 hover:border-white/20 hover:bg-white/5"
              }`}
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  selected
                    ? "bg-brand text-white"
                    : "bg-white/10 text-slate-400"
                }`}
              >
                {opt.label}
              </span>
              <span>{opt.text}</span>
            </button>
          );
        })}
      </div>

      {/* Next */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleNext}
          disabled={answers[currentIdx] === undefined}
          className="flex items-center gap-1.5 rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-light disabled:opacity-40"
        >
          {isLast ? "Ver resultados" : "Siguiente"}
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
