import z from 'zod';
import { apiPaginatedResponseSchema, apiResponseSchema } from '@/api/schema';

const CustomerSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
});

const AddressSchema = z.object({
    id: z.number(),
    fullName: z.string(),
    addressLine1: z.string(),
    addressLine2: z.string().nullable(),
    willaya: z.string(),
    postalCode: z.string(),
    country: z.string(),
    phone: z.string(),
});

export type Address = z.infer<typeof AddressSchema>;

const ProductVariantSchema = z.object({
    id: z.number(),
    sku: z.string(),
    price: z.string(),
});

const OrderItemSchema = z.object({
    id: z.number(),
    productName: z.string(),
    variantName: z.string(),
    sku: z.string(),
    quantity: z.number(),
    unitPrice: z.string(),
    subtotal: z.string(),
    productVariant: ProductVariantSchema,
});

// -------------- Listing

export const OrderSchema = z.object({
    id: z.number(),
    total: z.string(),
    status: z.string(),
    status_label: z.string(),
    createdAt: z.string(),
    customer: CustomerSchema,
    notes: z.string().nullable(),
});

export const OrdersListResponseSchema = apiPaginatedResponseSchema(OrderSchema);

// -------------- Order Detail

export const OrderDetailsSchema = OrderSchema.extend({
    shippingAddress: AddressSchema,
    billingAddress: AddressSchema,
    items: z.array(OrderItemSchema),
});

export const OrderDetailsResponseSchema = apiResponseSchema(OrderDetailsSchema);
