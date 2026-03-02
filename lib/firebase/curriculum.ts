import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  serverTimestamp,
  Timestamp,
  writeBatch,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirebaseDb, getFirebaseStorage } from "./config";
import type {
  Program,
  Unit,
  Topic,
  Content,
  ProgramTree,
  UnitWithTopics,
  TopicWithContents,
  ContentCompletion,
} from "@/types";

/* ── Collection names ── */
const PROGRAMS = "programs";
const UNITS = "units";
const TOPICS = "topics";
const CONTENTS = "contents";

/* ── Timestamp helper ── */
function ts(val: unknown): Date {
  return val ? (val as Timestamp).toDate() : new Date();
}

/** Remove undefined values before Firestore write */
function clean(obj: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined)
  );
}

/* ═══════════════════════════════════════════
   PROGRAMS  (Level 1)
   ═══════════════════════════════════════════ */

function parseProgram(id: string, d: Record<string, unknown>): Program {
  return {
    id,
    title: d.title as string,
    slug: d.slug as string,
    description: (d.description as string) ?? "",
    type: (d.type as "free" | "premium") ?? "free",
    order: (d.order as number) ?? 0,
    createdAt: ts(d.createdAt),
    updatedAt: ts(d.updatedAt),
  };
}

export async function getPrograms(): Promise<Program[]> {
  const q = query(collection(getFirebaseDb(), PROGRAMS), orderBy("order"));
  const snap = await getDocs(q);
  return snap.docs.map((s) => parseProgram(s.id, s.data()));
}

export async function getProgramById(id: string): Promise<Program | null> {
  const snap = await getDoc(doc(getFirebaseDb(), PROGRAMS, id));
  if (!snap.exists()) return null;
  return parseProgram(snap.id, snap.data());
}

export type ProgramInput = Omit<Program, "id" | "createdAt" | "updatedAt">;

export async function createProgram(data: ProgramInput): Promise<string> {
  const ref = await addDoc(
    collection(getFirebaseDb(), PROGRAMS),
    clean({ ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() })
  );
  return ref.id;
}

export async function updateProgram(
  id: string,
  data: Partial<ProgramInput>
): Promise<void> {
  await updateDoc(
    doc(getFirebaseDb(), PROGRAMS, id),
    clean({ ...data, updatedAt: serverTimestamp() })
  );
}

export async function deleteProgram(id: string): Promise<void> {
  // Cascade: delete all units → topics → contents under this program
  const units = await getUnits(id);
  const db = getFirebaseDb();
  const batch = writeBatch(db);
  for (const unit of units) {
    const topics = await getTopics(unit.id);
    for (const topic of topics) {
      const contents = await getContents(topic.id);
      for (const content of contents) {
        batch.delete(doc(db, CONTENTS, content.id));
      }
      batch.delete(doc(db, TOPICS, topic.id));
    }
    batch.delete(doc(db, UNITS, unit.id));
  }
  batch.delete(doc(db, PROGRAMS, id));
  await batch.commit();
}

/* ═══════════════════════════════════════════
   UNITS  (Level 2)
   ═══════════════════════════════════════════ */

function parseUnit(id: string, d: Record<string, unknown>): Unit {
  return {
    id,
    programId: d.programId as string,
    title: d.title as string,
    slug: d.slug as string,
    description: (d.description as string) ?? "",
    order: (d.order as number) ?? 0,
    createdAt: ts(d.createdAt),
    updatedAt: ts(d.updatedAt),
  };
}

export async function getUnits(programId: string): Promise<Unit[]> {
  const q = query(
    collection(getFirebaseDb(), UNITS),
    where("programId", "==", programId)
  );
  const snap = await getDocs(q);
  return snap.docs
    .map((s) => parseUnit(s.id, s.data()))
    .sort((a, b) => a.order - b.order);
}

export async function getUnitById(id: string): Promise<Unit | null> {
  const snap = await getDoc(doc(getFirebaseDb(), UNITS, id));
  if (!snap.exists()) return null;
  return parseUnit(snap.id, snap.data());
}

export type UnitInput = Omit<Unit, "id" | "createdAt" | "updatedAt">;

export async function createUnit(data: UnitInput): Promise<string> {
  const ref = await addDoc(
    collection(getFirebaseDb(), UNITS),
    clean({ ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() })
  );
  return ref.id;
}

export async function updateUnit(
  id: string,
  data: Partial<UnitInput>
): Promise<void> {
  await updateDoc(
    doc(getFirebaseDb(), UNITS, id),
    clean({ ...data, updatedAt: serverTimestamp() })
  );
}

export async function deleteUnit(id: string): Promise<void> {
  const topics = await getTopics(id);
  const db = getFirebaseDb();
  const batch = writeBatch(db);
  for (const topic of topics) {
    const contents = await getContents(topic.id);
    for (const c of contents) batch.delete(doc(db, CONTENTS, c.id));
    batch.delete(doc(db, TOPICS, topic.id));
  }
  batch.delete(doc(db, UNITS, id));
  await batch.commit();
}

/* ═══════════════════════════════════════════
   TOPICS  (Level 3)
   ═══════════════════════════════════════════ */

function parseTopic(id: string, d: Record<string, unknown>): Topic {
  return {
    id,
    unitId: d.unitId as string,
    programId: d.programId as string,
    title: d.title as string,
    slug: d.slug as string,
    description: (d.description as string) ?? "",
    order: (d.order as number) ?? 0,
    createdAt: ts(d.createdAt),
    updatedAt: ts(d.updatedAt),
  };
}

export async function getTopics(unitId: string): Promise<Topic[]> {
  const q = query(
    collection(getFirebaseDb(), TOPICS),
    where("unitId", "==", unitId)
  );
  const snap = await getDocs(q);
  return snap.docs
    .map((s) => parseTopic(s.id, s.data()))
    .sort((a, b) => a.order - b.order);
}

export async function getTopicById(id: string): Promise<Topic | null> {
  const snap = await getDoc(doc(getFirebaseDb(), TOPICS, id));
  if (!snap.exists()) return null;
  return parseTopic(snap.id, snap.data());
}

export type TopicInput = Omit<Topic, "id" | "createdAt" | "updatedAt">;

export async function createTopic(data: TopicInput): Promise<string> {
  const ref = await addDoc(
    collection(getFirebaseDb(), TOPICS),
    clean({ ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() })
  );
  return ref.id;
}

export async function updateTopic(
  id: string,
  data: Partial<TopicInput>
): Promise<void> {
  await updateDoc(
    doc(getFirebaseDb(), TOPICS, id),
    clean({ ...data, updatedAt: serverTimestamp() })
  );
}

export async function deleteTopic(id: string): Promise<void> {
  const contents = await getContents(id);
  const db = getFirebaseDb();
  const batch = writeBatch(db);
  for (const c of contents) batch.delete(doc(db, CONTENTS, c.id));
  batch.delete(doc(db, TOPICS, id));
  await batch.commit();
}

/* ═══════════════════════════════════════════
   CONTENTS  (Level 4 — Polymorphic)
   ═══════════════════════════════════════════ */

function parseContent(id: string, d: Record<string, unknown>): Content {
  return {
    id,
    topicId: d.topicId as string,
    unitId: d.unitId as string,
    programId: d.programId as string,
    title: d.title as string,
    type: d.type as Content["type"],
    order: (d.order as number) ?? 0,
    body: (d.body as string) || undefined,
    videoUrl: (d.videoUrl as string) || undefined,
    pdfUrl: (d.pdfUrl as string) || undefined,
    questions: (d.questions as Content["questions"]) || undefined,
    createdAt: ts(d.createdAt),
    updatedAt: ts(d.updatedAt),
  };
}

export async function getContents(topicId: string): Promise<Content[]> {
  const q = query(
    collection(getFirebaseDb(), CONTENTS),
    where("topicId", "==", topicId)
  );
  const snap = await getDocs(q);
  return snap.docs
    .map((s) => parseContent(s.id, s.data()))
    .sort((a, b) => a.order - b.order);
}

export async function getContentById(id: string): Promise<Content | null> {
  const snap = await getDoc(doc(getFirebaseDb(), CONTENTS, id));
  if (!snap.exists()) return null;
  return parseContent(snap.id, snap.data());
}

export type ContentInput = Omit<Content, "id" | "createdAt" | "updatedAt">;

export async function createContent(data: ContentInput): Promise<string> {
  const ref = await addDoc(
    collection(getFirebaseDb(), CONTENTS),
    clean({ ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() })
  );
  return ref.id;
}

export async function updateContent(
  id: string,
  data: Partial<ContentInput>
): Promise<void> {
  await updateDoc(
    doc(getFirebaseDb(), CONTENTS, id),
    clean({ ...data, updatedAt: serverTimestamp() })
  );
}

export async function deleteContent(id: string): Promise<void> {
  await deleteDoc(doc(getFirebaseDb(), CONTENTS, id));
}

/* ═══════════════════════════════════════════
   FULL TREE ASSEMBLY
   ═══════════════════════════════════════════ */

/** Build the full program tree (Program > Units > Topics > Contents) */
export async function getProgramTree(
  programId: string
): Promise<ProgramTree | null> {
  const program = await getProgramById(programId);
  if (!program) return null;

  const units = await getUnits(programId);
  const unitsWithTopics: UnitWithTopics[] = [];

  for (const unit of units) {
    const topics = await getTopics(unit.id);
    const topicsWithContents: TopicWithContents[] = [];

    for (const topic of topics) {
      const contents = await getContents(topic.id);
      topicsWithContents.push({ ...topic, contents });
    }

    unitsWithTopics.push({ ...unit, topics: topicsWithContents });
  }

  return { ...program, units: unitsWithTopics };
}

/** Get all program trees */
export async function getAllProgramTrees(): Promise<ProgramTree[]> {
  const programs = await getPrograms();
  const trees: ProgramTree[] = [];
  for (const p of programs) {
    const tree = await getProgramTree(p.id);
    if (tree) trees.push(tree);
  }
  return trees;
}

/* ═══════════════════════════════════════════
   STORAGE — File Upload
   ═══════════════════════════════════════════ */

/** Upload a PDF to Firebase Storage and return the download URL */
export async function uploadContentFile(
  file: File,
  contentId: string
): Promise<string> {
  const storageRef = ref(
    getFirebaseStorage(),
    `contents/${contentId}/${file.name}`
  );
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}

/* ═══════════════════════════════════════════
   PROGRESS TRACKING
   ═══════════════════════════════════════════ */

export async function getCompletions(
  userId: string,
  programId: string
): Promise<ContentCompletion[]> {
  const q = query(
    collection(getFirebaseDb(), `users/${userId}/completions`),
    where("programId", "==", programId)
  );
  const snap = await getDocs(q);
  return snap.docs.map((s) => {
    const d = s.data();
    return {
      contentId: d.contentId as string,
      topicId: d.topicId as string,
      unitId: d.unitId as string,
      programId: d.programId as string,
      completedAt: ts(d.completedAt),
    };
  });
}

export async function markContentComplete(
  userId: string,
  completion: Omit<ContentCompletion, "completedAt">
): Promise<void> {
  const colRef = collection(getFirebaseDb(), `users/${userId}/completions`);
  await addDoc(colRef, {
    ...completion,
    completedAt: serverTimestamp(),
  });
}
