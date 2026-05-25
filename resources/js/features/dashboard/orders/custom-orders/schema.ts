import z from 'zod';
import { apiNoContentSchema, apiPaginatedResponseSchema, apiResponseSchema } from '@/api/schema';

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

const CustomOrderItemMediaSchema = z.object({
    uuid: z.string(),
    url: z.string(),
    order: z.number(),
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
    images: z.array(CustomOrderItemMediaSchema),
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
export type CustomOrderItemMedia = z.infer<typeof CustomOrderItemMediaSchema>;

// -------------- Assign

export const AssignToTailorRequestSchema = z.object({
    tailor_email: z.email().nullable(),
    item_id: z.number().int().positive().nullable(),
});

export type AssignToTailorRequest = z.infer<typeof AssignToTailorRequestSchema>;

export const AssignToTailorResponseSchema = apiNoContentSchema;

// -------------- Attach Offer

export const AttachOfferToItemRequestSchema = z.object({
    item_id: z.number().int().positive(),
    offer_price: z.number(),
    offer_due_date: z.iso.date(),
});

export type AttachOfferToItemRequest = z.infer<typeof AttachOfferToItemRequestSchema>;
export const AttachOfferToItemResponseSchema = apiResponseSchema(ClothingOrderItemSchema);

// -------------- Update Folder Status

export const FolderStatusSchema = z.enum([
    'pending',
    'offered',
    'negotiating',
    'accepted',
    'in_progress',
    'completed',
    'quality_check',
    'on_shipping',
    'shipped',
    'cancelled',
]);

export type FolderStatus = z.infer<typeof FolderStatusSchema>;

export const UpdateFolderStatusRequestSchema = z.object({
    status: FolderStatusSchema,
});

export type UpdateFolderStatusRequest = z.infer<typeof UpdateFolderStatusRequestSchema>;
export const UpdateFolderStatusResponseSchema = apiResponseSchema(CustomOrderSchema.omit({ user: true }));

// -------------- Update Item Status

export const ItemStatusSchema = z.enum([
    'pending',
    'offered',
    'negotiating',
    'accepted',
    'in_progress',
    'completed',
    'quality_check',
    'on_shipping',
    'shipped',
    'cancelled',
]);

export type ItemStatus = z.infer<typeof ItemStatusSchema>;

export const UpdateItemStatusRequestSchema = z.object({
    status: ItemStatusSchema,
});

export type UpdateItemStatusRequest = z.infer<typeof UpdateItemStatusRequestSchema>;
export const UpdateItemStatusResponseSchema = apiResponseSchema(ClothingOrderItemSchema);
