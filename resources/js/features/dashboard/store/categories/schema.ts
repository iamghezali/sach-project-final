import z from 'zod';
import { apiResponseSchema } from '@/api/schema';

/**
 * Attributes Response
 */
export const CategorySchema = z.object({
    id: z.int(),
    name: z.string(),
    slug: z.string(),
});

export const CategoriesListResponseSchema = apiResponseSchema(z.array(CategorySchema));

/**
 * Create new Attribute Request
 */
export const CreateCategoryRequestSchema = z.object({
    name: z.string().nonempty({ error: 'Name is required' }),
    slug: z.string().nonempty({ error: 'Slug is required' }),
});

export type CreateCategoryRequest = z.infer<typeof CreateCategoryRequestSchema>;

/**
 * Create new Attribute Response
 */
export const CreateCategoryResponseSchema = apiResponseSchema(CategorySchema);
