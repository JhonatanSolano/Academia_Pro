"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import { FullScreenSkeleton } from "@/components/ui/Skeletons";

interface AuthGuardProps {
  children: React.ReactNode;
  /** If true, only admins can access */
  requireAdmin?: boolean;
}

/**
 * AuthGuard — wraps protected pages.
 *
 * While `loading` is true it renders a full-screen skeleton (zero layout shift).
 * Once resolved, if user is null → redirect to /login.
 * If requireAdmin and user.role !== 'admin' → redirect to student dashboard.
 */
export default function AuthGuard({
  children,
  requireAdmin = false,
}: AuthGuardProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    if (requireAdmin && user.role !== "admin") {
      router.replace("/dashboard");
    }
  }, [user, loading, requireAdmin, router]);

  // Show skeleton while auth state resolves
  if (loading) return <FullScreenSkeleton />;

  // Still redirecting
  if (!user) return <FullScreenSkeleton />;
  if (requireAdmin && user.role !== "admin") return <FullScreenSkeleton />;

  return <>{children}</>;
}
