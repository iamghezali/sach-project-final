import { apiRequest } from '@/api/client';
import { OrderFolderResponseSchema, OrderListResponseSchema } from '@/features/tailor/orders/schema';

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
};
