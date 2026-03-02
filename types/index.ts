/* ── Pódium Académico — Domain Types ── */

/** Firestore user profile document */
export interface UserProfile {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  role: "free" | "premium" | "admin";
  premiumUntil: Date | null;
  createdAt: Date;
}

/** Whether a user currently has active premium access */
export function isPremiumActive(user: UserProfile): boolean {
  if (user.role === "admin") return true;
  if (user.role !== "premium" || !user.premiumUntil) return false;
  return new Date(user.premiumUntil) > new Date();
}

/* ── 4-Level Hierarchy ── */

/** Level 1 — Program (Producto) */
export interface Program {
  id: string;
  title: string;
  slug: string;
  description: string;
  type: "free" | "premium";
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

/** Level 2 — Unit (Bloque Académico) */
export interface Unit {
  id: string;
  programId: string;
  title: string;
  slug: string;
  description: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

/** Level 3 — Topic (Clase Real) */
export interface Topic {
  id: string;
  unitId: string;
  programId: string;
  title: string;
  slug: string;
  description: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

/** Content types — polymorphic discriminator */
export type ContentType =
  | "theory"
  | "example"
  | "exercise"
  | "quiz"
  | "video"
  | "pdf";

export const CONTENT_TYPE_LABELS: Record<ContentType, string> = {
  theory: "Teoría",
  example: "Ejemplo resuelto",
  exercise: "Ejercicio",
  quiz: "Quiz",
  video: "Video",
  pdf: "PDF",
};

/** Question option for quiz */
export interface QuestionOption {
  label: string;
  text: string;
}

/** Single multiple-choice question */
export interface Question {
  id: string;
  text: string;
  options: QuestionOption[];
  correctAnswer: string;
}

/** Level 4 — Content (Entidad Polimórfica) */
export interface Content {
  id: string;
  topicId: string;
  unitId: string;
  programId: string;
  title: string;
  type: ContentType;
  order: number;
  /** Used by: theory, example, exercise */
  body?: string;
  /** Used by: video */
  videoUrl?: string;
  /** Used by: pdf */
  pdfUrl?: string;
  /** Used by: quiz */
  questions?: Question[];
  createdAt: Date;
  updatedAt: Date;
}

/* ── Hierarchical tree (denormalized for UI) ── */

export interface TopicWithContents extends Topic {
  contents: Content[];
}

export interface UnitWithTopics extends Unit {
  topics: TopicWithContents[];
}

export interface ProgramTree extends Program {
  units: UnitWithTopics[];
}

/* ── Access helpers ── */

/** Check if user can access content based on the program's type */
export function canAccessContent(
  program: Program,
  user: UserProfile | null
): boolean {
  if (program.type === "free") return true;
  if (!user) return false;
  return isPremiumActive(user);
}

/* ── Progress tracking ── */

/** Student completion record (stored per-user) */
export interface ContentCompletion {
  contentId: string;
  topicId: string;
  unitId: string;
  programId: string;
  completedAt: Date;
}

/** Auth hook state */
export type AuthState = {
  user: UserProfile | null;
  firebaseUser: import("firebase/auth").User | null;
  loading: boolean;
  error: string | null;
};

