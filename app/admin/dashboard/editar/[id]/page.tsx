import { redirect } from "next/navigation";

/** Old route — inline editing now lives in the admin dashboard tree */
export default function EditarModuloPage() {
  redirect("/admin/dashboard");
}
