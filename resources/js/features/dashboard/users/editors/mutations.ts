import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editorsApi } from '@/features/dashboard/users/editors/api';
import { userKeys } from '@/features/dashboard/users/keys';

export function useRegisterEditor() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: editorsApi.register,

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: userKeys.all });
        },
    });
}
