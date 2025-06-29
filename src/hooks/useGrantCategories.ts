import { useQuery } from '@tanstack/react-query';
import { grantService } from '@/services/api';

interface UseGrantCategoriesReturn {
  categories: string[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<unknown>;
}

export function useGrantCategories(): UseGrantCategoriesReturn {
  const {
    data: categories = [],
    isLoading: loading,
    error,
    refetch
  } = useQuery({
    queryKey: ['grant-categories'],
    queryFn: () => grantService.getCategories(),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
  });

  return {
    categories,
    loading,
    error: error ? (error as Error).message : null,
    refetch
  };
} 