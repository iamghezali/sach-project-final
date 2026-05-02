import { z } from 'zod';

export const apiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
    z.union([
        z.object({
            message: z.string().optional(),
            data: dataSchema,
        }),
    ]);

export const apiPaginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
    z.object({
        data: z.array(itemSchema),
        links: z.array(
            z.object({
                url: z.string().nullable(),
                label: z.string(),
                page: z.number().nullable(),
                active: z.boolean(),
            }),
        ),
        meta: z.object({
            current_page: z.number(),
            first_page_url: z.string().nullable(),
            from: z.number().nullable(),
            last_page: z.number(),
            last_page_url: z.string().nullable(),
            next_page_url: z.string().nullable(),
            path: z.string(),
            per_page: z.number(),
            prev_page_url: z.string().nullable(),
            to: z.number().nullable(),
            total: z.number(),
        }),
    });

export const apiNoContentSchema = z.void();
