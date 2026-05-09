import { apiRequest } from '@/api/client';
import { OrderResponseSchema, OrdersListResponseSchema } from '@/features/shop/orders/schema';

export const ordersApi = {
    list: () =>
        apiRequest(OrdersListResponseSchema, {
            url: '/shop/orders',
            method: 'get',
        }),

    getOrder: (id: string) =>
        apiRequest(OrderResponseSchema, {
            url: `/shop/orders/${id}`,
            method: 'get',
        }),
};
