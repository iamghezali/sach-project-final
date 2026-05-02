import { useQuery } from '@tanstack/react-query';
import { userKeys } from '@/features/dashboard/users/keys';
import { tailorsApi } from '@/features/dashboard/users/tailors/api';

export const tailorKeys = {
    all: () => [...userKeys.all, 'tailors'] as const,
    lists: () => [...tailorKeys.all(), 'list'] as const,
};

export function useTailorsList() {
    return useQuery({
        queryKey: tailorKeys.lists(),
        queryFn: tailorsApi.list,
        staleTime: 1000 * 60 * 5,
    });
}
