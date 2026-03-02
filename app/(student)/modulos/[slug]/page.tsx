import { redirect } from "next/navigation";

/** Old route — programs now use /programa/[programId] */
export default function ModuleViewerPage() {
  redirect("/dashboard");
}
