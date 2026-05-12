import { apiRequest } from '@/api/client';
import { OrdersListResponseSchema } from '@/features/dashboard/orders/ready-to-wear/schema';

export const ordersApi = {
    list: (page: number = 1) =>
        apiRequest(OrdersListResponseSchema, {
            url: '/orders/',
            method: 'get',
            params: { page },
        }),
};
