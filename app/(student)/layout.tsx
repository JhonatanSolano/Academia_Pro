import type { Metadata } from "next";
import { AuthProvider } from "@/lib/hooks/useAuth";
import AuthGuard from "@/components/auth/AuthGuard";
import DashboardHeader from "@/components/modules/DashboardHeader";

export const metadata: Metadata = {
  title: "Dashboard — Pódium Académico",
  description:
    "Tu panel de estudio. Accede a módulos gratuitos y premium de Preunal y Preicfes.",
  robots: { index: false, follow: false },
};

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AuthGuard>
        <div
          className="flex min-h-screen flex-col"
          style={{
            background: "linear-gradient(160deg, #0f172a 0%, #1e293b 100%)",
          }}
        >
          <DashboardHeader />
          <main className="flex-1">{children}</main>
        </div>
      </AuthGuard>
    </AuthProvider>
  );
}
