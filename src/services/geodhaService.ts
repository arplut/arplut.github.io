/**
 * geodhaService.ts
 * All Firestore + Storage operations for the GEODHA dashboard.
 *
 * Collections (prefixed "geodha_" to avoid clashes with existing app data):
 *   geodha_ward_stats/summary        — single doc: { wards: Record<string, WardData> }
 *   geodha_recommended_actions/{cat} — one doc per category
 *   geodha_testimonials/{id}         — one doc per testimonial / documented case
 */

import {
  collection, doc,
  getDoc, getDocs,
  setDoc, addDoc, updateDoc, deleteDoc,
  serverTimestamp, deleteField,
  Timestamp,
} from 'firebase/firestore';
import {
  ref, uploadBytes, getDownloadURL, deleteObject,
} from 'firebase/storage';
import { db, storage } from '../lib/firebase';

// ── Collection names ──────────────────────────────────────────────────────────

const WARD_STATS_COL      = 'geodha_ward_stats';
const ACTIONS_COL         = 'geodha_recommended_actions';
const TESTIMONIALS_COL    = 'geodha_testimonials';

// ── Shared types ──────────────────────────────────────────────────────────────

export interface WardData {
  ward_num:  number;
  ward_name: string;
  total_reports: number;
  total_open:    number;
  total_closed:  number;
  garbage_dump:                          number;
  garbage_dump_open:                     number;
  garbage_dump_closed:                   number;
  garbage_vehicle_not_arrived:           number;
  garbage_vehicle_not_arrived_open:      number;
  garbage_vehicle_not_arrived_closed:    number;
  burning_of_garbage:                    number;
  burning_of_garbage_open:               number;
  burning_of_garbage_closed:             number;
  severity_total:        number;
  severity_garbage_dump: number;
  severity_vehicle:      number;
  severity_burning:      number;
}

export type ProblemCategory =
  | 'garbage_dump'
  | 'garbage_vehicle_not_arrived'
  | 'burning_of_garbage';

export interface ActionStep {
  emoji:   string;
  heading: string;
  detail:  string;
}

export interface RecommendedActionDoc {
  category:  ProblemCategory;
  icon:      string;
  label:     string;
  violation: string;
  steps:     ActionStep[];
  updated_at?: Timestamp;
}

export type TestimonialTag =
  | 'garbage_dump'
  | 'vehicle_not_arrived'
  | 'burning'
  | 'waterlogging'
  | 'other';

export interface TestimonialDoc {
  id:                  string;   // Firestore document ID
  ward_num:            number;
  ward_name:           string;
  title:               string;
  quote:               string;
  source:              string;
  locality:            string;
  date:                string;   // ISO date string
  tags:                TestimonialTag[];
  images:              string[]; // Storage download URLs
  has_exact_location:  boolean;
  exact_lat?:          number;
  exact_lng?:          number;
  created_at?:         Timestamp;
  updated_at?:         Timestamp;
}

// ── Ward stats ────────────────────────────────────────────────────────────────

/** Fetch all ward statistics from Firestore (single document read). */
export async function getWardStats(): Promise<Record<string, WardData>> {
  const snap = await getDoc(doc(db, WARD_STATS_COL, 'summary'));
  if (!snap.exists()) throw new Error('Ward stats not found. Run the seed script first.');
  const data = snap.data() as { wards: Record<string, WardData> };
  return data.wards;
}

/** Admin: overwrite the entire ward stats document. */
export async function setWardStats(wards: Record<string, WardData>): Promise<void> {
  await setDoc(doc(db, WARD_STATS_COL, 'summary'), {
    wards,
    updated_at: serverTimestamp(),
  });
}

// ── Recommended actions ───────────────────────────────────────────────────────

/** Fetch all three recommended action categories. */
export async function getRecommendedActions(): Promise<Record<ProblemCategory, RecommendedActionDoc>> {
  const snap = await getDocs(collection(db, ACTIONS_COL));
  if (snap.empty) throw new Error('Recommended actions not found. Run the seed script first.');
  const result = {} as Record<ProblemCategory, RecommendedActionDoc>;
  snap.forEach((d) => {
    const data = d.data() as RecommendedActionDoc;
    result[data.category] = { ...data };
  });
  return result;
}

/** Admin: save updated action (full overwrite of one category doc). */
export async function updateRecommendedAction(
  category: ProblemCategory,
  data: Omit<RecommendedActionDoc, 'updated_at'>,
): Promise<void> {
  await setDoc(doc(db, ACTIONS_COL, category), {
    ...data,
    updated_at: serverTimestamp(),
  });
}

// ── Testimonials ──────────────────────────────────────────────────────────────

/** Fetch all testimonials / documented cases. */
export async function getTestimonials(): Promise<TestimonialDoc[]> {
  const snap = await getDocs(collection(db, TESTIMONIALS_COL));
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<TestimonialDoc, 'id'>) }));
}

/**
 * Strip undefined values from an object — Firestore rejects them.
 * For the optional geo fields (exact_lat / exact_lng), use deleteField()
 * when has_exact_location is being set to false so they're removed from
 * the document rather than silently ignored.
 */
function sanitiseTestimonialPayload(
  data: Record<string, unknown>,
): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(data)) {
    if (v !== undefined) out[k] = v;
  }
  // If location flag is explicitly disabled, erase any stored coordinates
  if ('has_exact_location' in out && out['has_exact_location'] === false) {
    out['exact_lat'] = deleteField();
    out['exact_lng'] = deleteField();
  }
  return out;
}

/** Admin: add a new testimonial. Returns the new document ID. */
export async function addTestimonial(
  data: Omit<TestimonialDoc, 'id' | 'created_at' | 'updated_at'>,
): Promise<string> {
  const payload = sanitiseTestimonialPayload(data as Record<string, unknown>);
  const docRef = await addDoc(collection(db, TESTIMONIALS_COL), {
    ...payload,
    created_at: serverTimestamp(),
    updated_at: serverTimestamp(),
  });
  return docRef.id;
}

/** Admin: update an existing testimonial. */
export async function updateTestimonial(
  id: string,
  data: Partial<Omit<TestimonialDoc, 'id' | 'created_at'>>,
): Promise<void> {
  const payload = sanitiseTestimonialPayload(data as Record<string, unknown>);
  await updateDoc(doc(db, TESTIMONIALS_COL, id), {
    ...payload,
    updated_at: serverTimestamp(),
  });
}

/** Admin: delete a testimonial and all its Storage images. */
export async function deleteTestimonial(id: string, imageUrls: string[]): Promise<void> {
  // Delete images from Storage
  await Promise.allSettled(imageUrls.map((url) => {
    try {
      const storageRef = ref(storage, url);
      return deleteObject(storageRef);
    } catch {
      return Promise.resolve();
    }
  }));
  await deleteDoc(doc(db, TESTIMONIALS_COL, id));
}

// ── Image upload ──────────────────────────────────────────────────────────────

/**
 * Upload an image file for a testimonial.
 * Returns the public download URL.
 * Path: geodha/testimonials/{testimonialId}/{filename}
 */
export async function uploadTestimonialImage(
  file: File,
  testimonialId: string,
): Promise<string> {
  const safeName  = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
  const storageRef = ref(storage, `geodha/testimonials/${testimonialId}/${safeName}`);
  const snapshot  = await uploadBytes(storageRef, file);
  return getDownloadURL(snapshot.ref);
}

/**
 * Delete a single image from Storage by its download URL.
 * Silently swallows errors (e.g. already deleted).
 */
export async function deleteTestimonialImage(url: string): Promise<void> {
  try {
    await deleteObject(ref(storage, url));
  } catch {
    // ignore
  }
}
