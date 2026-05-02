import { useQuery } from '@tanstack/react-query';
import { attributesApi } from '@/features/dashboard/store/attributes/api';

export const attributeKeys = {
    all: () => ['attributes'] as const,
    lists: () => [...attributeKeys.all(), 'list'] as const,
    attributes: () => [...attributeKeys.all(), 'attribute'] as const,
    attribute: (id: number) => [...attributeKeys.attributes(), id] as const,
};

export function useAttributesList() {
    return useQuery({
        queryKey: attributeKeys.lists(),
        queryFn: attributesApi.list,
        staleTime: 1000 * 60 * 5,
    });
}

export function useAttributeWithValues(id: number) {
    return useQuery({
        queryKey: attributeKeys.attribute(id),
        queryFn: () => attributesApi.getAttributeWithValues(id),
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
    });
}
