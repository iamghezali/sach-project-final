import z from 'zod';
import { apiPaginatedResponseSchema, apiResponseSchema } from '@/api/schema';

// ------------------- RTW

/**
 * List Order Response
 */
const ListOrderItemSchema = z.object({
    id: z.number(),
    total: z.string(),
    notes: z.string().nullable().optional(),
    status: z.string(),
    status_label: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
});

export const OrdersListResponseSchema = apiPaginatedResponseSchema(ListOrderItemSchema);
export type ListOrderItem = z.infer<typeof ListOrderItemSchema>;

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
        created_at: z.string(),
        updated_at: z.string(),
        shippingAddress: AddressResponseSchema,
        billingAddress: AddressResponseSchema,
        items: z.array(OrderItemResponseSchema),
    }),
);

// ------------------- CUSTOM

/**
 * List Custom Order Response
 */

const ListCustomOrderItemSchema = z.object({
    id: z.number(),
    title: z.string(),
    status: z.string(),
    status_label: z.string(),
    offer_total: z.string(),
    created_at: z.string(),
});

export const CustomOrdersListResponseSchema = apiPaginatedResponseSchema(ListCustomOrderItemSchema);
export type ListCustomOrderItem = z.infer<typeof ListCustomOrderItemSchema>;

// --------------------------------------------------

/**
 * Resolve Custom Order
 */
export const ResolveCustomOrderOfferRequestSchema = z.object({
    accept: z.boolean(),
});

export type ResolveCustomOrderOfferRequest = z.infer<typeof ResolveCustomOrderOfferRequestSchema>;
export const ResolveCustomOrderOfferResponseSchema = apiResponseSchema(ListCustomOrderItemSchema);

// ------------------- CUSTOM FOLDER & ITEMS

const OrderItemMediaSchema = z.object({
    uuid: z.string(),
    url: z.string(),
    order: z.number(),
});

const StandardMeasurementsSchema = z.object({
    measurement_type: z.literal('standard'),
    fitting_preference: z.string().nullable(),
    size: z.string(),
});

const CustomMeasurementsSchema = z.object({
    measurement_type: z.literal('custom'),
    fitting_preference: z.string().nullable(),
    shoulder: z.number(),
    height: z.number(),
    waist: z.number(),
    chest: z.number(),
});

const MeasurementsSchema = z.discriminatedUnion('measurement_type', [
    StandardMeasurementsSchema,
    CustomMeasurementsSchema,
]);

const ItemInformationSchema = z.object({
    title: z.string(),
    item_is_for: z.string(),
    item_type: z.string(),
    item_for_gender: z.string(),
    looking_for: z.string(),
    description: z.string(),
    provide_fabric: z.boolean(),
    quantity: z.number().positive(),
    preferred_due_date: z.string(),
});

export const CustomOrderItemSchema = z.object({
    id: z.number(),
    status: z.string(),
    status_label: z.string(),
    information: ItemInformationSchema,
    measurements: MeasurementsSchema,
    images: z.array(OrderItemMediaSchema),
    offer_price: z.string().nullable(),
    offer_due_date: z.string().nullable(),
});

export const CustomOrderFolderSchema = ListCustomOrderItemSchema.extend({
    items: z.array(CustomOrderItemSchema),
});

export const CustomOrderFolderResponseSchema = apiResponseSchema(CustomOrderFolderSchema);
export const CustomOrderItemResponseSchema = apiResponseSchema(CustomOrderItemSchema);

export type CustomOrderItem = z.infer<typeof CustomOrderItemSchema>;
export type CustomMeasurements = z.infer<typeof MeasurementsSchema>;
