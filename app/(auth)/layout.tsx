import type { Metadata } from "next";
import { AuthProvider } from "@/lib/hooks/useAuth";

export const metadata: Metadata = {
  title: "Iniciar sesión — Pódium Académico",
  description:
    "Inicia sesión con Google para acceder a tu preparación Preunal y Preicfes.",
  robots: { index: false, follow: false },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}
