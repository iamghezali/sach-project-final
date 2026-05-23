import { useQuery } from '@tanstack/react-query';
import { authApi } from '@/features/auth/api';

export const authKeys = {
    all: ['auth'] as const,
    user: () => [...authKeys.all, 'user'] as const,
};

export function useCurrentUser() {
    return useQuery({
        queryKey: authKeys.user(),
        queryFn: async () => {
            try {
                return await authApi.getUser();
            } catch (error: any) {
                if (error?.status === 401) {
                    return null;
                }

                throw error;
            }
        },
        staleTime: 1000 * 60 * 5,
        retry: (failureCount, error: any) => {
            if (error?.status === 401) {
                return false;
            }

            return failureCount < 2;
        },
    });
}
