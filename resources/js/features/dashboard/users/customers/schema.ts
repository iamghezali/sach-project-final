import { z } from 'zod';
import { apiPaginatedResponseSchema } from '@/api/schema';

export const CustomerSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    joined: z.string(),
});

export const CustomersListResponseSchema = apiPaginatedResponseSchema(CustomerSchema);
