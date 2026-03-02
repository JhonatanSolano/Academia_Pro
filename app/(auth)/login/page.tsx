"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";
import { FullScreenSkeleton } from "@/components/ui/Skeletons";

export default function LoginPage() {
  const { user, loading, signInWithGoogle, error } = useAuth();
  const router = useRouter();

  // If already authenticated → go to dashboard
  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [user, loading, router]);

  if (loading) return <FullScreenSkeleton />;
  if (user) return <FullScreenSkeleton />; // brief flash while redirecting

  return (
    <div
      className="flex min-h-screen items-center justify-center px-4"
      style={{
        background: "linear-gradient(135deg, #4f46e5 0%, #1e293b 100%)",
      }}
    >
      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex w-full max-w-sm flex-col items-center gap-8 rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl"
      >
        {/* Logo */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/20">
            <GraduationCap className="h-7 w-7 text-accent" aria-hidden="true" />
          </div>
          <h1 className="text-xl font-bold text-text-inverse">Pódium Académico</h1>
          <p className="text-center text-sm text-slate-400">
            Preparación estratégica para Preunal y Preicfes
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="w-full rounded-lg bg-error/15 px-4 py-2 text-center text-sm text-error">
            {error}
          </div>
        )}

        {/* Google Sign-In */}
        <button
          onClick={signInWithGoogle}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 shadow-md transition-all hover:shadow-lg"
        >
          {/* Google icon – inline SVG */}
          <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continuar con Google
        </button>

        {/* Footer */}
        <p className="text-center text-xs text-slate-500">
          Al continuar, aceptas nuestros{" "}
          <a href="#" className="text-brand hover:underline">
            Términos de uso
          </a>{" "}
          y{" "}
          <a href="#" className="text-brand hover:underline">
            Política de privacidad
          </a>
          .
        </p>
      </motion.div>
    </div>
  );
}
