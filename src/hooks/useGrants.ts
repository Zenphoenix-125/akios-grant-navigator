import { useQuery } from '@tanstack/react-query';
import { grantService, Grant, GrantFilters } from '@/services/api';

interface UseGrantsReturn {
  grants: Grant[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<unknown>;
}

export function useGrants(filters?: GrantFilters): UseGrantsReturn {
  const {
    data: grants = [],
    isLoading: loading,
    error,
    refetch
  } = useQuery({
    queryKey: ['grants', filters],
    queryFn: () => grantService.discoverGrants(filters),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24, // 24 hours (formerly cacheTime)
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
  });

  return {
    grants,
    loading,
    error: error ? (error as Error).message : null,
    refetch
  };
} 