import { z } from 'zod';
import { apiResponseSchema } from '@/api/schema';

/**
 * Checkout Data
 */

const AddressSchema = z.object({
    full_name: z.string().min(1, 'Full name is required'),
    phone: z
        .string()
        .min(1, 'Phone number is required')
        .regex(/^\d{10}$/, 'Phone number must be 10 digits'),
    address_line_1: z.string().min(1, 'Address is required'),
    address_line_2: z.string().optional(),
    willaya: z.string().min(1, 'Willaya is required'),

    postal_code: z
        .string()
        .min(1, 'Postal code is required')
        .regex(/^\d{5}$/, 'Postal code must be 5 digits'),
    country: z.enum(['algeria']),
});

const OrderItemSchema = z.object({
    product_variant_id: z.int().min(1),
    quantity: z.int().min(1),
});

export const CheckoutDataSchema = z.object({
    shipping_address: AddressSchema,
    billing_address: AddressSchema,
    delivery_option: z.enum(['yalidine']),
    notes: z.string().optional(),
    payment_option: z.enum(['cod']),
    items: z.array(OrderItemSchema).nonempty(),
});

export type CheckoutData = z.infer<typeof CheckoutDataSchema>;

/**
 * Address
 */

export const AddressesSchema = CheckoutDataSchema.pick({
    shipping_address: true,
    billing_address: true,
});

export type Addresses = z.infer<typeof AddressesSchema>;

/**
 * Delivery Option
 */

export const DeliveryOptionSchema = CheckoutDataSchema.pick({
    delivery_option: true,
    notes: true,
});

export type DeliveryOption = z.infer<typeof DeliveryOptionSchema>;

/**
 * Payment Option
 */

export const PaymentOptionSchema = CheckoutDataSchema.pick({
    payment_option: true,
});

export type PaymentOption = z.infer<typeof PaymentOptionSchema>;

/**
 * Place Order Request
 */
export type OrderRequest = z.infer<typeof CheckoutDataSchema>;

/**
 * Order Response
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
        created_at: z.string(),
        shippingAddress: AddressResponseSchema,
        billingAddress: AddressResponseSchema,
        items: z.array(OrderItemResponseSchema),
    }),
);

export type OrderResponse = z.infer<typeof OrderResponseSchema>;
