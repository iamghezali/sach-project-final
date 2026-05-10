import { apiRequest } from '@/api/client';
import {
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
};
