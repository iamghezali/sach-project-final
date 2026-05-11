import { apiRequest } from '@/api/client';
import { OrderResponseSchema, OrdersListResponseSchema } from '@/features/shop/orders/schema';

export const ordersApi = {
    list: (page: number = 1) =>
        apiRequest(OrdersListResponseSchema, {
            url: '/shop/orders',
            method: 'get',
            params: { page },
        }),

    getOrder: (id: string) =>
        apiRequest(OrderResponseSchema, {
            url: `/shop/orders/${id}`,
            method: 'get',
        }),
};
