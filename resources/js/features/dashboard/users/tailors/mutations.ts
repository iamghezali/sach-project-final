import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userKeys } from '@/features/dashboard/users/keys';
import { tailorsApi } from '@/features/dashboard/users/tailors/api';

export function useRegisterTailor() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: tailorsApi.register,

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: userKeys.all });
        },
    });
}
