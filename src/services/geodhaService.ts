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
  Timestamp, query, orderBy, limit,
} from 'firebase/firestore';
import {
  ref, uploadBytes, getDownloadURL, deleteObject,
} from 'firebase/storage';
import { db, storage } from '../lib/firebase';

// ── Collection names ──────────────────────────────────────────────────────────

const WARD_STATS_COL      = 'geodha_ward_stats';
const WARD_SNAPSHOTS_COL  = 'geodha_ward_stats_snapshots';
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
  /** Optional URL — rendered as a link in the ward card. */
  url?:     string;
  /** Custom label for the URL link; defaults to "Learn more" when omitted. */
  urlText?: string;
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
  /** Marks this testimonial as a critical/priority case — shown with a larger ! marker on the map. */
  critical_or_not:     boolean;
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

// ── Ward stats snapshots ──────────────────────────────────────────────────────

export interface WardStatsSnapshot {
  id:       string;
  label:    string;
  saved_at: Timestamp;
  wards:    Record<string, WardData>;
}

/** Save the current ward stats as a named snapshot (called before every publish). */
export async function saveWardStatsSnapshot(
  wards: Record<string, WardData>,
  label: string,
): Promise<string> {
  const ref = await addDoc(collection(db, WARD_SNAPSHOTS_COL), {
    wards,
    label,
    saved_at: serverTimestamp(),
  });
  return ref.id;
}

/** Return the 10 most recent snapshots, newest first. */
export async function listWardStatsSnapshots(): Promise<WardStatsSnapshot[]> {
  const q    = query(collection(db, WARD_SNAPSHOTS_COL), orderBy('saved_at', 'desc'), limit(10));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as WardStatsSnapshot));
}

/** Restore a snapshot: read it and overwrite the live summary document. */
export async function restoreWardStatsSnapshot(snapshotId: string): Promise<void> {
  const snap = await getDoc(doc(db, WARD_SNAPSHOTS_COL, snapshotId));
  if (!snap.exists()) throw new Error('Snapshot not found.');
  const { wards } = snap.data() as { wards: Record<string, WardData> };
  await setWardStats(wards);
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
 * Path: testimonials/{testimonialId}/{filename}
 *
 * NOTE: this path must match the Storage security rules:
 *   match /testimonials/{allPaths=**} { allow write: if ... }
 */
export async function uploadTestimonialImage(
  file: File,
  testimonialId: string,
): Promise<string> {
  const safeName   = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
  const path       = `testimonials/${testimonialId}/${safeName}`;
  const storageRef = ref(storage, path);

  // Diagnostics — visible in browser DevTools console
  const { currentUser } = (await import('../lib/firebase')).auth;
  console.group('📤 uploadTestimonialImage');
  console.log('bucket :', storage.app.options.storageBucket);
  console.log('path   :', path);
  console.log('auth uid:', currentUser?.uid ?? '⚠️  NOT SIGNED IN');
  console.log('file   :', file.name, `(${(file.size / 1024).toFixed(1)} KB)`);
  console.groupEnd();

  const TIMEOUT_MS = 30_000;
  const upload = uploadBytes(storageRef, file)
    .then((snap) => {
      console.log('✅ uploadBytes succeeded, fetching download URL…');
      return getDownloadURL(snap.ref);
    })
    .catch((err) => {
      console.error('❌ uploadBytes failed:', err.code, err.message);
      throw err;
    });

  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error(
      `Image upload timed out (30 s). Bucket: "${storage.app.options.storageBucket}". ` +
      'Check: 1) Storage bucket name in .env.local is correct, ' +
      '2) Firebase Storage is enabled (Build → Storage → Get Started), ' +
      '3) Storage rules cover "testimonials/" path.'
    )), TIMEOUT_MS)
  );
  return Promise.race([upload, timeout]);
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