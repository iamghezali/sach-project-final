import z from 'zod';
import { apiPaginatedResponseSchema, apiResponseSchema } from '@/api/schema';

// -------------- Listing

export const OrderSchema = z.object({
    id: z.number(),
    title: z.string(),
    status: z.string(),
    status_label: z.string(),
    offer_total: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
});

export const OrderListResponseSchema = apiPaginatedResponseSchema(OrderSchema);

// -------------- Order Folder

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

const OrderItemSchema = z.object({
    id: z.number(),
    clothing_order_id: z.number(),
    status: z.string(),
    status_label: z.string(),
    information: ItemInformationSchema,
    measurements: MeasurementsSchema,
    updated_at: z.string(),
    offer_price: z.string().nullable(),
    offer_due_date: z.string().nullable(),
});

const OrderFolderSchema = OrderSchema.extend({
    items: z.array(OrderItemSchema),
});

export const OrderFolderResponseSchema = apiResponseSchema(OrderFolderSchema);

export type OrderItem = z.infer<typeof OrderItemSchema>;
export type Measurements = z.infer<typeof MeasurementsSchema>;

export const OrderItemResponseSchema = apiResponseSchema(OrderItemSchema);
