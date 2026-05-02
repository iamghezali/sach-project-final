import { z } from 'zod';
import { apiPaginatedResponseSchema, apiResponseSchema } from '@/api/schema';

/**
 * List of Tailors
 */
export const TailorSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    joined: z.string(),
});

export const TailorsListResponseSchema = apiPaginatedResponseSchema(TailorSchema);

/**
 * Register new Tailor Request
 */
export const RegisterTailorRequestSchema = z.object({
    email: z
        .string()
        .nonempty({ error: 'Email is required' })
        .pipe(z.email({ error: 'Please enter a valid email.' })),
});

export type RegisterTailorRequest = z.infer<typeof RegisterTailorRequestSchema>;

/**
 * Register new Tailor Response
 */

export const RegisterTailorResponseSchema = apiResponseSchema(
    z.object({
        user: TailorSchema.extend({
            role: z.string(),
        }),
    }),
);
