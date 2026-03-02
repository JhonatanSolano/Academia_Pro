import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium — Pódium Académico",
  description:
    "Desbloquea todos los módulos de preparación Preunal y Preicfes. Pago único, sin suscripción.",
};

export default function PremiumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
