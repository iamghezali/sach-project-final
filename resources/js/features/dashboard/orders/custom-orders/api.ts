import { apiRequest } from '@/api/client';
import type { AssignToTailorRequest } from '@/features/dashboard/orders/custom-orders/schema';
import {
    AssignToTailorResponseSchema,
    CustomOrderFolderResponseSchema,
    CustomOrderListResponseSchema,
} from '@/features/dashboard/orders/custom-orders/schema';

export const customOrdersApi = {
    list: () =>
        apiRequest(CustomOrderListResponseSchema, {
            url: '/custom-orders/',
            method: 'get',
        }),

    getCustomOrderFolder: (id: number) =>
        apiRequest(CustomOrderFolderResponseSchema, {
            url: `/custom-orders/${id}`,
            method: 'get',
        }),

    assignToTailor: (id: number, payload: AssignToTailorRequest) =>
        apiRequest(AssignToTailorResponseSchema, {
            url: `/custom-orders/${id}/assign`,
            method: 'patch',
            data: payload,
        }),
};
