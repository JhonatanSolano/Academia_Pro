"use client";

import { redirect } from "next/navigation";

/**
 * @deprecated  Replaced by NodeForm + ContentForm + HierarchyTree.
 * Kept as a stub to avoid dangling import errors during migration cleanup.
 */
export default function ModuleForm() {
  redirect("/admin/dashboard");
  return null;
}
