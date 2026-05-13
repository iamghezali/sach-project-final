import z from 'zod';
import { apiResponseSchema } from '@/api/schema';

const minimumDueDate = (): Date => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 5);

    return date;
};

export const minimumDueDateString = (): string => {
    const date = minimumDueDate();

    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60 * 1000);

    return localDate.toISOString().split('T')[0];
};

/**
 * Custom Order Folder
 */
export const CreateCustomOrderFolderSchema = z.object({
    title: z.string().nonempty({ error: 'Order Title is Required.' }),
});

export type CreateCustomOrderFolder = z.infer<typeof CreateCustomOrderFolderSchema>;

/**
 * Custom Order Item Information
 */
export const CreateOrderItemInformationSchema = z.object({
    title: z.string().nonempty({ error: 'Item Title is Required.' }),
    item_is_for: z.enum(['individual', 'company', 'wholesale']),
    item_type: z.enum(['clothing', 'living_rooms']),
    item_for_gender: z.enum(['male', 'female']),
    looking_for: z.string().nonempty({ error: 'This field is Required.' }),
    provide_fabric: z.boolean(),
    description: z.string().nonempty({ error: 'Description is required.' }),
    quantity: z.number().min(1, { error: 'Quantity must be at least 1' }),
    preferred_due_date: z
        .string()
        .min(1, { message: 'Due date is required' })
        .refine(
            (val) => {
                const selectedDate = new Date(val);

                return selectedDate >= minimumDueDate();
            },
            { message: 'Due date must be at least 5 days from today' },
        ),
});

export type CreateOrderItemInformation = z.infer<typeof CreateOrderItemInformationSchema>;

/**
 * Custom Order Item Measurements
 */
const BaseMeasurementsSchema = z.object({
    fitting_preference: z.string().nullable(),
});

const StandardSizeSchema = BaseMeasurementsSchema.extend({
    measurement_type: z.literal('standard'),
    size: z.enum(['xs', 's', 'm', 'l', 'xl']),
});

const CustomSizeSchema = BaseMeasurementsSchema.extend({
    measurement_type: z.literal('custom'),
    height: z.number().min(1, { error: 'Minimum value 1' }),
    waist: z.number().min(1, { error: 'Minimum value 1' }),
    chest: z.number().min(1, { error: 'Minimum value 1' }),
    shoulder: z.number().min(1, { error: 'Minimum value 1' }),
});

export const CreateOrderItemMeasurementsSchema = z.discriminatedUnion('measurement_type', [
    StandardSizeSchema,
    CustomSizeSchema,
]);

export type CreateOrderItemMeasurements = z.infer<typeof CreateOrderItemMeasurementsSchema>;

/**
 * Custom Clothing Order (request)
 */
export const CustomOrderItemSchema = z.object({
    information: CreateOrderItemInformationSchema,
    measurements: CreateOrderItemMeasurementsSchema,
    images: z.array(z.instanceof(File)).min(1, {
        message: 'Please upload at least one reference image for this item.',
    }),
});

export type CustomOrderItem = z.infer<typeof CustomOrderItemSchema>;

export const CustomOrderSchema = CreateCustomOrderFolderSchema.extend({
    items: z.array(CustomOrderItemSchema).min(1),
});

export type CustomOrder = z.infer<typeof CustomOrderSchema>;

// Internal form schema — only used by the measurements form component
export const MeasurementsFormSchema = z
    .object({
        measurement_type: z.enum(['standard', 'custom']),
        size: z.enum(['xs', 's', 'm', 'l', 'xl']),
        fitting_preference: z.string().nullable(),
        shoulder: z.number(),
        waist: z.number(),
        chest: z.number(),
        height: z.number(),
    })
    .superRefine((data, ctx) => {
        if (data.measurement_type !== 'custom') {
            return;
        }

        (['shoulder', 'waist', 'chest', 'height'] as const).forEach((field) => {
            if (!data[field] || data[field] < 1) {
                ctx.addIssue({
                    code: 'custom',
                    path: [field],
                    message: 'Minimum value 1',
                });
            }
        });
    });

export type MeasurementsForm = z.infer<typeof MeasurementsFormSchema>;

/**
 * Custom Order Response
 */
const CustomOrderImageResponseSchema = z.object({
    uuid: z.string(),
    url: z.string(),
    order: z.number(),
});

const CustomOrderItemResponseSchema = z.object({
    id: z.number(),
    status: z.string(),
    status_label: z.string(),
    information: CreateOrderItemInformationSchema,
    measurements: CreateOrderItemMeasurementsSchema,
    images: z.array(CustomOrderImageResponseSchema),
    offer_price: z.string().nullable(),
    offer_due_date: z.string().nullable(),
});

export const PlaceCustomOrderResponseSchema = apiResponseSchema(
    z.object({
        id: z.number(),
        title: z.string(),
        status: z.string(),
        status_label: z.string(),
        offer_total: z.string(),
        created_at: z.string(),
        items: z.array(CustomOrderItemResponseSchema),
    }),
);

export type PlaceCustomOrderResponse = z.infer<typeof PlaceCustomOrderResponseSchema>;
