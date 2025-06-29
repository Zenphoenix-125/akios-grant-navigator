import { useState, useEffect, useCallback } from 'react';
import { grantService, Grant, GrantFilters } from '@/services/api';

interface UseGrantsReturn {
  grants: Grant[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useGrants(filters?: GrantFilters): UseGrantsReturn {
  const [grants, setGrants] = useState<Grant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGrants = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await grantService.discoverGrants(filters);
      setGrants(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch grants';
      setError(errorMessage);
      console.error('Error fetching grants:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchGrants();
  }, [fetchGrants]);

  return {
    grants,
    loading,
    error,
    refetch: fetchGrants
  };
} 