import { apiRequest } from '@/api/client';
import { OrderDetailsResponseSchema, OrdersListResponseSchema } from '@/features/dashboard/orders/ready-to-wear/schema';

export const ordersApi = {
    list: (page: number = 1) =>
        apiRequest(OrdersListResponseSchema, {
            url: '/orders/',
            method: 'get',
            params: { page },
        }),

    getOrderDetails: (orderID: number) =>
        apiRequest(OrderDetailsResponseSchema, {
            url: `/orders/${orderID}`,
            method: 'get',
        }),
};
