import { z } from 'zod';
import { apiNoContentSchema, apiResponseSchema } from '@/api/schema';

const UserSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
});

/**
 * Login Request
 */
export const LoginRequestSchema = z.object({
    email: z
        .string()
        .nonempty({ error: 'Email is required' })
        .pipe(z.email({ error: 'Please enter a valid email.' })),
    password: z.string().nonempty({ error: 'Password is required' }),
    remember: z.boolean(),
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;

/**
 * Login Response
 */
export const LoginResponseSchema = apiResponseSchema(
    z.object({
        user: UserSchema,
    }),
).and(
    z.object({
        redirectTo: z.string(),
    }),
);

/**
 * Register Request
 */
export const RegisterRequestSchema = z
    .object({
        first_name: z.string().nonempty({ error: 'First Name is required' }),
        last_name: z.string().nonempty({ error: 'Last Name is required' }),
        phone: z
            .string()
            .nonempty({ error: 'Phone number is required' })
            .regex(/^\d{10}$/, 'Please enter a valid phone number.'),
        gender: z.enum(['male', 'female']),
        email: z
            .string()
            .nonempty({ error: 'Email is required' })
            .pipe(z.email({ error: 'Please enter a valid email.' })),
        password: z.string().nonempty({ error: 'Password is required' }),
        password_confirmation: z.string().nonempty({ error: 'Password Confirmation is required' }),
        user_agreement: z.boolean().refine((val) => val === true, {
            error: 'You have to agree to continue.',
        }),
    })
    .refine((data) => data.password === data.password_confirmation, {
        error: 'Passwords do not match',
        path: ['password_confirmation'],
    });

export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;

/**
 * Register Response
 */
export const RegisterResponseSchema = apiResponseSchema(
    z.object({
        user: UserSchema.extend({
            joined: z.string(),
        }),
    }),
).and(
    z.object({
        redirectTo: z.string(),
    }),
);

/**
 * User Query Response
 */
export const UserResponseSchema = apiResponseSchema(
    z.object({
        user: UserSchema,
    }),
);

/**
 * Logout Response
 */
export const LogoutResponseSchema = apiNoContentSchema;
