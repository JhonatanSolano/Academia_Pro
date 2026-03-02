import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { getFirebaseAuth, getFirebaseDb } from "./config";
import type { UserProfile } from "@/types";

const googleProvider = new GoogleAuthProvider();

/** Sign in with Google — creates Firestore profile on first login */
export async function signInWithGoogle(): Promise<UserProfile> {
  const result = await signInWithPopup(getFirebaseAuth(), googleProvider);
  const { uid, email, displayName, photoURL } = result.user;

  const userRef = doc(getFirebaseDb(), "users", uid);
  const snap = await getDoc(userRef);

  if (snap.exists()) {
    return snap.data() as UserProfile;
  }

  // First-time user → create profile
  const newProfile: UserProfile = {
    uid,
    email: email ?? "",
    displayName,
    photoURL,
    role: "free",
    premiumUntil: null,
    createdAt: new Date(),
  };

  await setDoc(userRef, {
    ...newProfile,
    createdAt: serverTimestamp(),
  });

  return newProfile;
}

/** Sign out */
export async function signOut(): Promise<void> {
  await firebaseSignOut(getFirebaseAuth());
}

/** Get user profile from Firestore */
export async function getUserProfile(
  uid: string
): Promise<UserProfile | null> {
  const snap = await getDoc(doc(getFirebaseDb(), "users", uid));
  if (!snap.exists()) return null;

  const data = snap.data();
  return {
    ...data,
    premiumUntil: data.premiumUntil
      ? (data.premiumUntil as Timestamp).toDate()
      : null,
    createdAt: data.createdAt
      ? (data.createdAt as Timestamp).toDate()
      : new Date(),
  } as UserProfile;
}
