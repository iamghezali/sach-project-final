import { apiRequest } from '@/api/client';
import { CustomOrderListResponseSchema } from '@/features/dashboard/orders/custom-orders/schema';

export const customOrdersApi = {
    list: () =>
        apiRequest(CustomOrderListResponseSchema, {
            url: '/custom-orders/',
            method: 'get',
        }),
};
