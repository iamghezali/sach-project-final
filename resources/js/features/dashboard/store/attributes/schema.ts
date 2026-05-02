import z from 'zod';
import { apiResponseSchema } from '@/api/schema';

/**
 * Attributes Response
 */
export const AttributeSchema = z.object({
    id: z.int(),
    name: z.string(),
    slug: z.string(),
});

export const AttributesListResponseSchema = apiResponseSchema(z.array(AttributeSchema));

/**
 * Create new Attribute Request
 */
export const CreateAttributeRequestSchema = z.object({
    name: z.string().nonempty({ error: 'Name is required' }),
    slug: z.string().nonempty({ error: 'Slug is required' }),
});

export type CreateAttributeRequest = z.infer<typeof CreateAttributeRequestSchema>;

/**
 * Create new Attribute Response
 */
export const CreateAttributeResponseSchema = apiResponseSchema(AttributeSchema);

/**
 * Attribute Values Response
 */
const AttributeValueSchema = z.object({
    id: z.int(),
    value: z.string(),
    slug: z.string(),
    position: z.int(),
});

export const AttributeWithValuesListResponseSchema = apiResponseSchema(
    AttributeSchema.extend({
        values: z.array(AttributeValueSchema),
    }),
);

/**
 * Create new Attribute Value Request
 */
export const CreateAttributeValueRequestSchema = z.object({
    value: z.string().nonempty({ error: 'Value is required' }),
    slug: z.string().nonempty({ error: 'Slug is required' }),
});

export type CreateAttributeValueRequest = z.infer<typeof CreateAttributeValueRequestSchema>;

/**
 * Create new Attribute Value Response
 */
export const CreateAttributeValueResponseSchema = apiResponseSchema(AttributeValueSchema);
