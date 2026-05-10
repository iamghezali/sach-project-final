import { apiRequest } from '@/api/client';
import { OrderListResponseSchema } from '@/features/tailor/orders/schema';

export const ordersApi = {
    list: () =>
        apiRequest(OrderListResponseSchema, {
            url: '/tailor/orders/',
            method: 'get',
        }),
};
