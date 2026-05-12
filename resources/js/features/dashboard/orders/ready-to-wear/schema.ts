import z from 'zod';
import { apiPaginatedResponseSchema } from '@/api/schema';

const CustomerSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
});

// -------------- Listing

export const OrderSchema = z.object({
    id: z.number(),
    total: z.string(),
    status: z.string(),
    status_label: z.string(),
    createdAt: z.string(),
    customer: CustomerSchema,
    notes: z.string(),
});

export const OrdersListResponseSchema = apiPaginatedResponseSchema(OrderSchema);
