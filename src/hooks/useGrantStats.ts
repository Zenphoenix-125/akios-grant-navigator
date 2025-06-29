import { useQuery } from '@tanstack/react-query';
import { grantService, GrantStats } from '@/services/api';

interface UseGrantStatsReturn {
  stats: GrantStats | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<unknown>;
}

export function useGrantStats(): UseGrantStatsReturn {
  const {
    data: stats = null,
    isLoading: loading,
    error,
    refetch
  } = useQuery({
    queryKey: ['grant-stats'],
    queryFn: () => grantService.getStats(),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return {
    stats,
    loading,
    error: error ? (error as Error).message : null,
    refetch
  };
} 