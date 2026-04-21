/**
 * Percentile-based severity classification.
 * Break points at the 20th, 40th, 60th, and 80th percentiles of non-zero values.
 * Produces 6 bands (0 = no data/zero, 1–5 = low → critical).
 */

export type BandLevel = 0 | 1 | 2 | 3 | 4 | 5;
export type ClassifyFn = (value: number) => BandLevel;

/** Compute a classify function from a full array of raw values. */
export function computeScale(values: number[]): ClassifyFn {
  const nonZero = values.filter((v) => v > 0).sort((a, b) => a - b);
  if (nonZero.length === 0) return () => 0;

  const pct = (p: number): number => {
    const idx = Math.floor((p / 100) * nonZero.length);
    return nonZero[Math.min(idx, nonZero.length - 1)];
  };

  // Raw break values at the four percentile marks
  const raw = [pct(20), pct(40), pct(60), pct(80)];

  // Deduplicate: enforce minimum gap of 1 between consecutive breaks
  const breaks: number[] = [];
  for (let i = 0; i < raw.length; i++) {
    const floor = i === 0 ? raw[i] : breaks[i - 1] + 1;
    breaks.push(Math.max(raw[i], floor));
  }

  return (value: number): BandLevel => {
    if (value <= 0) return 0;
    if (value <= breaks[0]) return 1;
    if (value <= breaks[1]) return 2;
    if (value <= breaks[2]) return 3;
    if (value <= breaks[3]) return 4;
    return 5;
  };
}

// ── Band styling ──────────────────────────────────────────────────────────────

export interface BandConfig {
  label:    string;
  mapColor: string;   // polygon fill on white basemap
  dot:      string;   // coloured dot for legend / stats
  badgeBg:  string;   // badge background
  badgeFg:  string;   // badge text (primary)
  descFg:   string;   // subdued secondary text on badgeBg (avoids invalid hex concat)
  cardBg:   string;   // light card background for problem tiles
}

export const BAND: Record<BandLevel, BandConfig> = {
  0: { label: 'Clean / Less Data', mapColor: '#d1fae5', dot: '#6ee7b7', badgeBg: '#ecfdf5', badgeFg: '#065f46', descFg: '#047857',                cardBg: '#ecfdf5' },
  1: { label: 'Clean / Less Data', mapColor: '#86efac', dot: '#4ade80', badgeBg: '#dcfce7', badgeFg: '#166534', descFg: '#166534',                cardBg: '#dcfce7' },
  2: { label: 'Moderate',          mapColor: '#fde68a', dot: '#fbbf24', badgeBg: '#fef9c3', badgeFg: '#78350f', descFg: '#92400e',                cardBg: '#fffbeb' },
  3: { label: 'High',              mapColor: '#fb923c', dot: '#f97316', badgeBg: '#ffedd5', badgeFg: '#7c2d12', descFg: '#9a3412',                cardBg: '#fff7ed' },
  4: { label: 'Severe',            mapColor: '#f87171', dot: '#ef4444', badgeBg: '#fee2e2', badgeFg: '#7f1d1d', descFg: '#991b1b',                cardBg: '#fff1f2' },
  5: { label: 'Critical',          mapColor: '#b91c1c', dot: '#991b1b', badgeBg: '#991b1b', badgeFg: '#fff',    descFg: 'rgba(255,255,255,0.82)', cardBg: '#fff1f2' },
};
