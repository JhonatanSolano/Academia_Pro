"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase/config";
import {
  getUserProfile,
  signInWithGoogle as fbSignIn,
  signOut as fbSignOut,
} from "@/lib/firebase/auth";
import type { UserProfile, AuthState } from "@/types";

/* ── Context value shape ── */
interface AuthContextValue extends AuthState {
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/* ── Provider ── */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    firebaseUser: null,
    loading: true,
    error: null,
  });

  // Listen to Firebase auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(getFirebaseAuth(), async (fbUser: User | null) => {
      if (!fbUser) {
        setState({
          user: null,
          firebaseUser: null,
          loading: false,
          error: null,
        });
        return;
      }

      try {
        const profile = await getUserProfile(fbUser.uid);
        setState({
          user: profile,
          firebaseUser: fbUser,
          loading: false,
          error: null,
        });
      } catch (err) {
        setState({
          user: null,
          firebaseUser: fbUser,
          loading: false,
          error: (err as Error).message,
        });
      }
    });

    return unsub;
  }, []);

  const signInWithGoogle = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const profile = await fbSignIn();
      setState((prev) => ({ ...prev, user: profile, loading: false }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: (err as Error).message,
      }));
    }
  }, []);

  const signOut = useCallback(async () => {
    await fbSignOut();
    setState({ user: null, firebaseUser: null, loading: false, error: null });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

/* ── Hook ── */
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
