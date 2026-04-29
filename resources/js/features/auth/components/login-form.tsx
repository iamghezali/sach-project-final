import { zodResolver } from '@hookform/resolvers/zod';
import type { JSX } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import Form from '@/components/form/form';
import { FormButton } from '@/components/form/form-button';
import { FormCheckbox } from '@/components/form/form-checkbox';
import { FormField } from '@/components/form/form-field';
import { FormInput } from '@/components/form/form-input';
import { FormPasswordInput } from '@/components/form/form-password-input';
import { FieldGroup, FieldSet } from '@/components/ui/field';
import { LoginRequestSchema } from '@/features/auth/schema';
import type { LoginRequest } from '@/features/auth/schema';

export default function LoginForm(): JSX.Element {
    const form = useForm<LoginRequest>({
        defaultValues: {
            email: '',
            password: '',
            remember: true,
        },
        resolver: zodResolver(LoginRequestSchema),
    });

    const onSubmit: SubmitHandler<LoginRequest> = (values) => {
        console.log(values);
    };

    return (
        <Form
            form={form}
            onSubmit={onSubmit}
        >
            <FieldSet>
                <FieldGroup>
                    <FormField
                        control={form.control}
                        name="email"
                    >
                        <FormField.Label>Email</FormField.Label>
                        <FormInput />
                        <FormField.Error />
                    </FormField>

                    <FormField
                        control={form.control}
                        name="password"
                    >
                        <FormField.Label>Password</FormField.Label>
                        <FormPasswordInput />
                        <FormField.Error />
                    </FormField>

                    <FormField
                        control={form.control}
                        name="remember"
                        orientation="horizontal"
                    >
                        <FormCheckbox />
                        <FormField.Label>Remember me.</FormField.Label>
                    </FormField>
                </FieldGroup>

                <FormButton control={form.control}>Login</FormButton>
            </FieldSet>
        </Form>
    );
}
