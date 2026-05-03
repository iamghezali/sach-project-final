import { z } from 'zod';
import { apiResponseSchema } from '@/api/schema';

export const AttributeValueSchema = z.object({
    id: z.number(),
    value: z.string(),
    slug: z.string(),
});

export const AttributeSchema = z.object({
    id: z.number(),
    name: z.string(),
    values: z.array(AttributeValueSchema),
});

export const ImageSchema = z.object({
    url: z.string(),
    order: z.int(),
});

export const ProductVariantSchema = z.object({
    id: z.number(),
    product_id: z.number(),
    sku: z.string(),
    price: z.string(),
    is_default: z.boolean(),
    is_in_stock: z.boolean(),
    attribute_value_ids: z.array(z.number()),
    images: z.array(ImageSchema),
});

export const ProductSchema = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    description: z.string().nullable(),
    is_available: z.boolean(),
    starting_from: z.string().nullable(),
    attributes: z.array(AttributeSchema),
    variants: z.array(ProductVariantSchema),
});

export const ProductResponseSchema = apiResponseSchema(ProductSchema);

export type AttributeValue = z.infer<typeof AttributeValueSchema>;
export type Attribute = z.infer<typeof AttributeSchema>;
export type ProductVariant = z.infer<typeof ProductVariantSchema>;
export type Product = z.infer<typeof ProductSchema>;
export type ProductResponse = z.infer<typeof ProductResponseSchema>;

export const VariantSelectionSchema = z.object({
    quantity: z.number().min(1, { error: 'Quantity must be at least 1' }),
    attributes: z.record(z.string(), z.number({ error: 'Please select an option' })),
});

export type VariantSelection = z.infer<typeof VariantSelectionSchema>;
