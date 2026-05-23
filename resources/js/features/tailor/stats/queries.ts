import { useQuery } from '@tanstack/react-query';
import { statsApi } from '@/features/tailor/stats/api';

export const statsKeys = {
    all: () => ['tailor-orders'] as const,
    stats: () => [...statsKeys.all(), 'stats'] as const,
};

export function useTailorStats() {
    return useQuery({
        queryKey: statsKeys.stats(),
        queryFn: statsApi.getTailorStats,
        staleTime: 1000 * 60 * 5,
    });
}
