import z from 'zod';
import { apiPaginatedResponseSchema, apiResponseSchema } from '@/api/schema';

/**
 * List Response
 */
const ListOrderItemSchema = z.object({
    id: z.number(),
    total: z.string(),
    notes: z.string().nullable().optional(),
    status: z.string(),
    createdAt: z.string(),
});

export const OrdersListResponseSchema = apiPaginatedResponseSchema(ListOrderItemSchema);

// --------------------------------------------------

/**
 * Order Response Schema
 */
export const AddressResponseSchema = z.object({
    id: z.number(),
    fullName: z.string(),
    phone: z.string(),
    addressLine1: z.string(),
    addressLine2: z.string().nullable(),
    willaya: z.string(),
    postalCode: z.string(),
    country: z.string(),
});

export const ProductVariantResponseSchema = z.object({
    id: z.number(),
    sku: z.string(),
    price: z.string(),
});

export const OrderItemResponseSchema = z.object({
    id: z.number(),
    productName: z.string(),
    variantName: z.string(),
    sku: z.string(),
    quantity: z.number(),
    unitPrice: z.string(),
    subtotal: z.string(),
    productVariant: ProductVariantResponseSchema,
});

export const OrderResponseSchema = apiResponseSchema(
    z.object({
        id: z.number(),
        total: z.string(),
        notes: z.string().nullable(),
        createdAt: z.string(),
        shippingAddress: AddressResponseSchema,
        billingAddress: AddressResponseSchema,
        items: z.array(OrderItemResponseSchema),
    }),
);
