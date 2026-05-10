import z from 'zod';
import { apiPaginatedResponseSchema } from '@/api/schema';

// -------------- Listing

export const OrderSchema = z.object({
    id: z.number(),
    title: z.string(),
    status: z.string(),
    status_label: z.string(),
    offer_total: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
});

export const OrderListResponseSchema = apiPaginatedResponseSchema(OrderSchema);
