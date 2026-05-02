import { useQuery } from '@tanstack/react-query';
import { editorsApi } from '@/features/dashboard/users/editors/api';
import { userKeys } from '@/features/dashboard/users/keys';

export const editorKeys = {
    all: () => [...userKeys.all, 'editors'] as const,
    lists: () => [...editorKeys.all(), 'list'] as const,
};

export function useEditorsList() {
    return useQuery({
        queryKey: editorKeys.lists(),
        queryFn: editorsApi.list,
        staleTime: 1000 * 60 * 5,
    });
}
