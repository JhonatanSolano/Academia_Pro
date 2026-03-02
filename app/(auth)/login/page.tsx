"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import { FullScreenSkeleton } from "@/components/ui/Skeletons";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // If already authenticated → route by role
  useEffect(() => {
    if (!loading && user) {
      router.replace(user.role === "admin" ? "/admin/dashboard" : "/dashboard");
    }
  }, [user, loading, router]);

  if (loading) return <FullScreenSkeleton />;
  if (user) return <FullScreenSkeleton />;

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

      <div className="relative z-10">
        <LoginForm />
      </div>
    </div>
  );
}
