import { useQuery } from '@tanstack/react-query';

export function useMockQuery(key: string, value: number) {
    return useQuery({
        queryKey: [key],
        queryFn: () => new Promise<{ count: number }>((resolve) => setTimeout(() => resolve({ count: value }), 250)),
    });
}
