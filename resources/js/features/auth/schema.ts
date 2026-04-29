import { z } from 'zod';

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
