import z from 'zod';
import { apiPaginatedResponseSchema, apiResponseSchema } from '@/api/schema';

const UserSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
});

const TailorSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
});

// -------------- Listing

export const CustomOrderSchema = z.object({
    id: z.number(),
    title: z.string(),
    status: z.string(),
    status_label: z.string(),
    offer_total: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
    user: UserSchema,
});

export const CustomOrderListResponseSchema = apiPaginatedResponseSchema(CustomOrderSchema);

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

const ClothingOrderItemSchema = z.object({
    id: z.number(),
    clothing_order_id: z.number(),
    tailor_id: z.number().nullable(),
    status: z.string(),
    status_label: z.string(),
    information: ItemInformationSchema,
    measurements: MeasurementsSchema,
    created_at: z.string(),
    updated_at: z.string(),
    offer_price: z.string().nullable(),
    offer_due_date: z.string().nullable(),
    tailor: TailorSchema.nullable(),
});

const CustomOrderFolderSchema = CustomOrderSchema.extend({
    items: z.array(ClothingOrderItemSchema),
});

export const CustomOrderFolderResponseSchema = apiResponseSchema(CustomOrderFolderSchema);

export type CustomOrder = z.infer<typeof CustomOrderSchema>;
export type CustomOrderListResponse = z.infer<typeof CustomOrderListResponseSchema>;
export type CustomOrderFolder = z.infer<typeof CustomOrderFolderSchema>;
export type ClothingOrderItem = z.infer<typeof ClothingOrderItemSchema>;
export type ItemInformation = z.infer<typeof ItemInformationSchema>;
export type Measurements = z.infer<typeof MeasurementsSchema>;
export type StandardMeasurements = z.infer<typeof StandardMeasurementsSchema>;
export type CustomMeasurements = z.infer<typeof CustomMeasurementsSchema>;
