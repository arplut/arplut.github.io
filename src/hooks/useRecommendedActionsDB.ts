import { useState, useEffect } from 'react';
import { getRecommendedActions } from '@/services/geodhaService';
import type { RecommendedActionDoc, ProblemCategory } from '@/services/geodhaService';

export interface UseRecommendedActionsResult {
  actions: Record<ProblemCategory, RecommendedActionDoc> | null;
  loading: boolean;
  error:   string | null;
}

export function useRecommendedActionsDB(): UseRecommendedActionsResult {
  const [actions, setActions] = useState<Record<ProblemCategory, RecommendedActionDoc> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    getRecommendedActions()
      .then((data) => { if (!cancelled) setActions(data); })
      .catch((err)  => { if (!cancelled) setError((err as Error).message); })
      .finally(()   => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, []);

  return { actions, loading, error };
}
