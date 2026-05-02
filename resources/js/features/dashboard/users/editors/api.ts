import { apiRequest } from '@/api/client';
import type { RegisterEditorRequest } from '@/features/dashboard/users/editors/schema';
import { EditorsListResponseSchema, RegisterEditorResponseSchema } from '@/features/dashboard/users/editors/schema';

export const editorsApi = {
    list: () =>
        apiRequest(EditorsListResponseSchema, {
            url: '/users/editors',
            method: 'get',
        }),

    register: (payload: RegisterEditorRequest) =>
        apiRequest(RegisterEditorResponseSchema, {
            url: '/users/editors',
            method: 'post',
            data: payload,
        }),
};
