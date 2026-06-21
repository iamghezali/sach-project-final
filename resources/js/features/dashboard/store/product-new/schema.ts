import z from 'zod';

export const CreateProductInformationRequestSchema = z.object({
    title: z.string(),
    description: z.string(),
});

export type CreateProductInformationRequest = z.infer<typeof CreateProductInformationRequestSchema>;

export const SetProductQuantityRequestSchema = z.object({
    quantity: z.number().min(0),
});

export type SetProductQuantityRequest = z.infer<typeof SetProductQuantityRequestSchema>;

export const SetProductPriceRequestSchema = z.object({
    price: z.number().min(0),
});

export type SetProductPriceRequest = z.infer<typeof SetProductPriceRequestSchema>;
