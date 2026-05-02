import { z } from 'zod';
import { apiPaginatedResponseSchema, apiResponseSchema } from '@/api/schema';

export const EditorSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    joined: z.string(),
});

export const EditorsListResponseSchema = apiPaginatedResponseSchema(EditorSchema);

/**
 * Register new Editor Request
 */
export const RegisterEditorRequestSchema = z.object({
    email: z
        .string()
        .nonempty({ error: 'Email is required' })
        .pipe(z.email({ error: 'Please enter a valid email.' })),
});

export type RegisterEditorRequest = z.infer<typeof RegisterEditorRequestSchema>;

/**
 * Register new Editor Response
 */
export const RegisterEditorResponseSchema = apiResponseSchema(
    z.object({
        user: EditorSchema.extend({
            role: z.string(),
        }),
    }),
);
