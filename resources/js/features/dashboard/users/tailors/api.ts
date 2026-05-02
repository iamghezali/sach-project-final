import { apiRequest } from '@/api/client';
import type { RegisterTailorRequest } from '@/features/dashboard/users/tailors/schema';
import { RegisterTailorResponseSchema, TailorsListResponseSchema } from '@/features/dashboard/users/tailors/schema';

export const tailorsApi = {
    list: () =>
        apiRequest(TailorsListResponseSchema, {
            url: '/users/tailors',
            method: 'get',
        }),

    register: (payload: RegisterTailorRequest) =>
        apiRequest(RegisterTailorResponseSchema, {
            url: '/users/tailors',
            method: 'post',
            data: payload,
        }),
};
