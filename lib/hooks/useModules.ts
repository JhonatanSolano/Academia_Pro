"use client";

import { useEffect, useState, useCallback } from "react";
import {
  getPrograms,
  getProgramTree,
  getAllProgramTrees,
} from "@/lib/firebase/curriculum";
import type { Program, ProgramTree } from "@/types";

/** Fetch all programs (flat list) */
export function usePrograms() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrograms = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getPrograms();
      setPrograms(data);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrograms();
  }, [fetchPrograms]);

  return { programs, loading, error, refetch: fetchPrograms };
}

/** Fetch a single program tree (Program > Units > Topics > Contents) */
export function useProgramTree(programId: string | null) {
  const [tree, setTree] = useState<ProgramTree | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTree = useCallback(async () => {
    if (!programId) { setLoading(false); return; }
    setLoading(true);
    try {
      const data = await getProgramTree(programId);
      setTree(data);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [programId]);

  useEffect(() => {
    fetchTree();
  }, [fetchTree]);

  return { tree, loading, error, refetch: fetchTree };
}

/** Fetch ALL program trees */
export function useAllProgramTrees() {
  const [trees, setTrees] = useState<ProgramTree[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTrees = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllProgramTrees();
      setTrees(data);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTrees();
  }, [fetchTrees]);

  return { trees, loading, error, refetch: fetchTrees };
}
