import { useState, useEffect } from 'react';
import { getWardStats } from '@/services/geodhaService';
import type { WardData } from '@/services/geodhaService';

export interface UseWardStatsResult {
  wardDataMap:   Record<number, WardData>;
  baselineLabel: string | null;
  loading:       boolean;
  error:         string | null;
}

export function useWardStats(): UseWardStatsResult {
  const [wardDataMap,   setWardDataMap]   = useState<Record<number, WardData>>({});
  const [baselineLabel, setBaselineLabel] = useState<string | null>(null);
  const [loading,       setLoading]       = useState(true);
  const [error,         setError]         = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    getWardStats()
      .then(({ wards, baseline_label }) => {
        if (cancelled) return;
        const map: Record<number, WardData> = {};
        for (const [k, v] of Object.entries(wards)) map[parseInt(k)] = v;
        setWardDataMap(map);
        setBaselineLabel(baseline_label ?? null);
      })
      .catch((err) => {
        if (!cancelled) setError((err as Error).message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, []);

  return { wardDataMap, baselineLabel, loading, error };
}
