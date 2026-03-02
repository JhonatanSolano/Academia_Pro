"use client";

import { useCallback, useState, useRef } from "react";
import { Upload, FileText, X, Loader2 } from "lucide-react";

interface FileUploaderProps {
  currentUrl?: string;
  onUpload: (file: File) => Promise<string>;
  onClear: () => void;
}

export default function FileUploader({
  currentUrl,
  onUpload,
  onClear,
}: FileUploaderProps) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    async (file: File) => {
      if (file.type !== "application/pdf") return;
      setUploading(true);
      try {
        await onUpload(file);
        setFileName(file.name);
      } finally {
        setUploading(false);
      }
    },
    [onUpload]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  if (currentUrl) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
        <FileText className="h-5 w-5 shrink-0 text-accent" />
        <span className="flex-1 truncate text-sm text-slate-300">
          {fileName ?? "PDF subido"}
        </span>
        <a
          href={currentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-xs font-medium text-accent hover:underline"
        >
          Ver
        </a>
        <button
          type="button"
          onClick={() => {
            onClear();
            setFileName(null);
          }}
          className="shrink-0 rounded-lg p-1 text-slate-400 hover:bg-white/10 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`flex cursor-pointer flex-col items-center gap-3 rounded-xl border-2 border-dashed p-8 transition-all ${
        dragging
          ? "border-accent bg-accent/5"
          : "border-white/15 bg-white/5 hover:border-white/30"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        onChange={handleChange}
        className="hidden"
      />
      {uploading ? (
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      ) : (
        <Upload className="h-8 w-8 text-slate-400" />
      )}
      <p className="text-sm text-slate-400">
        {uploading
          ? "Subiendo..."
          : "Arrastra un PDF o haz clic para seleccionar"}
      </p>
    </div>
  );
}
