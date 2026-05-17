import z from 'zod';
import { apiResponseSchema } from '@/api/schema';

export const ProductSchema = z.object({
    id: z.int(),
    name: z.string(),
    slug: z.string(),
    description: z.string().nullable(),
    is_available: z.boolean(),
    starting_from: z.string(),
    thumbnail: z.string().nullable(),
});

export const ProductCategoryResponseSchema = apiResponseSchema(z.array(ProductSchema));
