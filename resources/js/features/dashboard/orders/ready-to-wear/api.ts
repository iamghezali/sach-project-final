import { apiRequest } from '@/api/client';
import type { UpdateOrderStatusRequest } from '@/features/dashboard/orders/ready-to-wear/schema';
import {
    OrderDetailsResponseSchema,
    OrdersListResponseSchema,
    UpdateOrderStatusResponseSchema,
} from '@/features/dashboard/orders/ready-to-wear/schema';

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

    updateOrderStatus: (orderID: number, payload: UpdateOrderStatusRequest) =>
        apiRequest(UpdateOrderStatusResponseSchema, {
            url: `/orders/${orderID}/status`,
            method: 'patch',
            data: payload,
        }),
};
