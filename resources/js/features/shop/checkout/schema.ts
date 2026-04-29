import { z } from 'zod';

/**
 * Order Request
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
