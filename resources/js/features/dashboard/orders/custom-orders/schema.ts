import z from 'zod';
import { apiPaginatedResponseSchema } from '@/api/schema';

const UserSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
});

export const CustomOrderSchema = z.object({
    id: z.number(),
    title: z.string(),
    status: z.string(),
    status_label: z.string(),
    offer_total: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
    user: UserSchema,
});

export const CustomOrderListResponseSchema = apiPaginatedResponseSchema(CustomOrderSchema);
