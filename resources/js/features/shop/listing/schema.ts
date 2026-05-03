import z from 'zod';
import { apiPaginatedResponseSchema } from '@/api/schema';

export const ProductSchema = z.object({
    id: z.int(),
    name: z.string(),
    slug: z.string(),
    description: z.string().nullable(),
    is_available: z.boolean(),
    starting_from: z.string(),
    thumbnail: z.string(),
});

export const ProductListResponseSchema = apiPaginatedResponseSchema(ProductSchema);
export type Product = z.infer<typeof ProductSchema>;
