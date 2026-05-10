import { apiRequest } from '@/api/client';
import {
    OrderFolderResponseSchema,
    OrderItemResponseSchema,
    OrderListResponseSchema,
} from '@/features/tailor/orders/schema';

export const ordersApi = {
    list: () =>
        apiRequest(OrderListResponseSchema, {
            url: '/tailor/orders/',
            method: 'get',
        }),

    getOrderFolder: (id: number) =>
        apiRequest(OrderFolderResponseSchema, {
            url: `/tailor/orders/${id}`,
            method: 'get',
        }),

    getOrderItem: (orderID: number, orderItemID: number) =>
        apiRequest(OrderItemResponseSchema, {
            url: `/tailor/orders/${orderID}/items/${orderItemID}/`,
            method: 'get',
        }),

    markOrderItemAsDone: (orderID: number, orderItemID: number) =>
        apiRequest(OrderItemResponseSchema, {
            url: `/tailor/orders/${orderID}/items/${orderItemID}/mark-done`,
            method: 'patch',
        }),
};
