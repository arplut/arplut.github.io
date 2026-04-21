import { useState, useEffect } from 'react';
import { getWardStats } from '@/services/geodhaService';
import type { WardData } from '@/services/geodhaService';

export interface UseWardStatsResult {
  wardDataMap: Record<number, WardData>;
  loading:     boolean;
  error:       string | null;
}

export function useWardStats(): UseWardStatsResult {
  const [wardDataMap, setWardDataMap] = useState<Record<number, WardData>>({});
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    getWardStats()
      .then((wards) => {
        if (cancelled) return;
        // Keys in Firestore are strings; convert to number
        const map: Record<number, WardData> = {};
        for (const [k, v] of Object.entries(wards)) map[parseInt(k)] = v;
        setWardDataMap(map);
      })
      .catch((err) => {
        if (!cancelled) setError((err as Error).message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, []);

  return { wardDataMap, loading, error };
}
