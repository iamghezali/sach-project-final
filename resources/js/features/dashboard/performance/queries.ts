import { useQuery } from '@tanstack/react-query';
import type { DateRangeOption } from '@/features/dashboard/performance/components/performance-card';

export function useMockQuery(key: string, value: number, dateRange: DateRangeOption) {
    return useQuery({
        queryKey: [key, dateRange],
        queryFn: () => new Promise<{ count: number }>((resolve) => setTimeout(() => resolve({ count: value }), 250)),
    });
}
