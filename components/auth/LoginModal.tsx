"use client";

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { AuthProvider, useAuth } from "@/lib/hooks/useAuth";
import LoginForm from "./LoginForm";

/* ── Inner component that watches auth state ── */
function LoginModalInner({ onClose }: { onClose: () => void }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  // When user logs in → redirect by role and close modal
  useEffect(() => {
    if (!loading && user) {
      const target =
        user.role === "admin" ? "/admin/dashboard" : "/dashboard";
      router.push(target);
    }
  }, [user, loading, router]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <LoginForm />
  );
}

/* ── Modal wrapper with backdrop ── */
interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginModal({ open, onClose }: LoginModalProps) {
  // Prevent body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleBackdrop = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose],
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          style={{
            background: "linear-gradient(135deg, rgba(79,70,229,0.85) 0%, rgba(30,41,59,0.95) 100%)",
          }}
          onClick={handleBackdrop}
          role="dialog"
          aria-modal="true"
          aria-label="Iniciar sesión"
        >
          {/* Grid overlay — same as login page */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
            aria-hidden="true"
          />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 rounded-full p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Login form */}
          <AuthProvider>
            <LoginModalInner onClose={onClose} />
          </AuthProvider>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
