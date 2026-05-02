import { useMutation, useQueryClient } from '@tanstack/react-query';
import { attributeKeys } from '@/features/dashboard/store/attributes/queries';
import type { CreateAttributeValueRequest } from '@/features/dashboard/store/attributes/schema';
import { attributesApi } from '@/features/dashboard/store/attributes/api';

export function useCreateAttribute() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: attributesApi.createAttribute,

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: attributeKeys.lists() });
        },
    });
}

export function useCreateAttributeValue() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: CreateAttributeValueRequest }) =>
            attributesApi.createAttributeValue(id, payload),

        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({
                queryKey: attributeKeys.attribute(id),
            });
        },
    });
}
