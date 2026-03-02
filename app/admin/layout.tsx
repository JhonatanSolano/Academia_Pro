import type { Metadata } from "next";
import { AuthProvider } from "@/lib/hooks/useAuth";
import AuthGuard from "@/components/auth/AuthGuard";
import AdminHeader from "@/components/admin/AdminHeader";
import { ToastProvider } from "@/components/admin/Toast";

export const metadata: Metadata = {
  title: "Panel Admin — Pódium Académico",
  description: "Panel de gestión de módulos para el profesor.",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AuthGuard requireAdmin>
        <ToastProvider>
          <div
            className="flex min-h-screen flex-col"
            style={{
              background:
                "linear-gradient(160deg, #0f172a 0%, #1e293b 100%)",
            }}
          >
            <AdminHeader />
            <main className="flex-1">{children}</main>
          </div>
        </ToastProvider>
      </AuthGuard>
    </AuthProvider>
  );
}
