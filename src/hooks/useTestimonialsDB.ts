import { useState, useEffect, useCallback } from 'react';
import { getTestimonials } from '@/services/geodhaService';
import type { TestimonialDoc } from '@/services/geodhaService';

export interface UseTestimonialsResult {
  testimonials: TestimonialDoc[];
  loading:      boolean;
  error:        string | null;
  refetch:      () => void;
}

export function useTestimonialsDB(): UseTestimonialsResult {
  const [testimonials, setTestimonials] = useState<TestimonialDoc[]>([]);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState<string | null>(null);
  const [tick,         setTick]         = useState(0);

  const refetch = useCallback(() => setTick((t) => t + 1), []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    getTestimonials()
      .then((data) => { if (!cancelled) setTestimonials(data); })
      .catch((err)  => { if (!cancelled) setError((err as Error).message); })
      .finally(()   => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [tick]);

  return { testimonials, loading, error, refetch };
}
