import { apiRequest } from '@/api/client';
import { StatsResponseSchema } from '@/features/tailor/stats/schema';

export const statsApi = {
    getTailorStats: () =>
        apiRequest(StatsResponseSchema, {
            url: '/tailor/orders/stats',
            method: 'get',
        }),
};
