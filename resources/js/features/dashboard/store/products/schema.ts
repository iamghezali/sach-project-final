import z from 'zod';
import { apiNoContentSchema, apiPaginatedResponseSchema, apiResponseSchema } from '@/api/schema';

/**
 * Product Status Schema
 */
export const ProductStatusSchema = z.enum(['published', 'draft', 'archived']);
export type ProductStatus = z.infer<typeof ProductStatusSchema>;

export const ProductStatusLabelSchema = z.enum(['Published', 'Draft', 'Archived']);

/**
 * Product Schema
 */
export const ProductSchema = z.object({
    id: z.int(),
    name: z.string(),
    slug: z.string(),
    description: z.string().nullable(),
    status: ProductStatusSchema,
    status_label: ProductStatusLabelSchema,
    is_available: z.boolean(),
    starting_from: z.string(),
});

export const ProductsListResponseSchema = apiPaginatedResponseSchema(ProductSchema);

/**
 * Create Product Request
 */
export const CreateProductRequestSchema = z.object({
    name: z.string().nonempty({ error: 'Product Name is Required' }),
    slug: z.string().nonempty({ error: 'Slug is Required' }),
});

export type CreateProductRequest = z.infer<typeof CreateProductRequestSchema>;

/**
 * Create Product Response
 */
export const CreateProductResponseSchema = apiResponseSchema(ProductSchema);

/**
 * Product Details Response
 */
export const AttributeValueSchema = z.object({
    id: z.int(),
    value: z.string(),
    slug: z.string(),
});

export const AttributeSchema = z.object({
    id: z.int(),
    name: z.string(),
    values: z.array(AttributeValueSchema),
});

export type Attribute = z.infer<typeof AttributeSchema>;

export const ProductVariantSchema = z.object({
    id: z.int(),
    product_id: z.number(),
    sku: z.string(),
    price: z.string(),
    stock_quantity: z.number(),
    is_active: z.boolean(),
    is_default: z.boolean(),
    is_in_stock: z.boolean(),
    variant_values: z.array(z.string()),
    attribute_value_ids: z.array(z.number()),
});

export const ProductDetailsResponseSchema = apiResponseSchema(
    ProductSchema.extend({
        attributes: z.array(AttributeSchema),
        active_attributes: z.array(AttributeSchema),
        variants: z.array(ProductVariantSchema),
    }),
);

export type ProductDetailsResponse = z.infer<typeof ProductDetailsResponseSchema>;

/**
 * Update Product Request
 */
export const UpdateProductRequestSchema = z.object({
    name: z.string().nonempty({ error: 'Product Name is Required' }).optional(),
    slug: z.string().nonempty({ error: 'Slug is Required' }).optional(),
    description: z.string().nullable().optional(),
});

export type UpdateProductRequest = z.infer<typeof UpdateProductRequestSchema>;

/**
 * Update Product Response
 */
export const UpdateProductResponseSchema = apiResponseSchema(ProductSchema);

/**
 * Change Product Status Request
 */
export const ChangeProductStatusRequestSchema = z.object({
    status: ProductStatusSchema,
});

export type ChangeProductStatusRequest = z.infer<typeof ChangeProductStatusRequestSchema>;

/**
 * Change Product Status Response
 */
export const ChangeProductStatusResponseSchema = apiResponseSchema(ProductSchema);

/**
 * Create Product Variant Request
 */
export const CreateProductVariantRequestSchema = (attributeCount: number) =>
    z.object({
        sku: z.string().nonempty({ error: 'SKU is required' }),
        stock_quantity: z.number().min(1, { error: 'Quantity must be a positive value' }),
        price: z.number().min(1, { error: 'Price must be a positive value' }),
        attribute_value_ids: z.array(z.number()).length(attributeCount, {
            message: `Select exactly ${attributeCount} attribute value${attributeCount > 1 ? 's' : ''}`,
        }),
    });

export type CreateProductVariantRequest = z.infer<ReturnType<typeof CreateProductVariantRequestSchema>>;

/**
 * Create Product Variant Response
 */
export const CreateProductVariantResponseSchema = apiResponseSchema(ProductVariantSchema);

/**
 * Assign Attributes Request
 */
export const AssignAttributesRequestSchema = z.object({
    attribute_ids: z.array(z.int()),
});

export type AssignAttributesRequest = z.infer<typeof AssignAttributesRequestSchema>;

/**
 * Assign Attributes Response
 */
export const AssignAttributesResponseSchema = apiNoContentSchema;
