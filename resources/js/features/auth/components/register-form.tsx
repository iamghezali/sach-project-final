import { zodResolver } from '@hookform/resolvers/zod';
import { usePage } from '@inertiajs/react';
import type { JSX } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import Form from '@/components/form/form';
import { FormButton } from '@/components/form/form-button';
import { FormCheckbox } from '@/components/form/form-checkbox';
import { FormField } from '@/components/form/form-field';
import { FormInput } from '@/components/form/form-input';
import { FormPasswordInput } from '@/components/form/form-password-input';
import { FormRadioGroup } from '@/components/form/form-radio-group';
import { FieldError, FieldGroup, FieldSet } from '@/components/ui/field';
import { useRegister } from '@/features/auth/mutations';
import { RegisterRequestSchema } from '@/features/auth/schema';
import type { RegisterRequest } from '@/features/auth/schema';

export default function RegisterForm(): JSX.Element {
    const { mutateAsync: register } = useRegister();
    const { url } = usePage();

    const form = useForm<RegisterRequest>({
        defaultValues: {
            first_name: '',
            last_name: '',
            phone: '',
            gender: 'male',
            email: '',
            password: '',
            password_confirmation: '',
            user_agreement: false,
        },
        resolver: zodResolver(RegisterRequestSchema),
    });

    const onSubmit: SubmitHandler<RegisterRequest> = async (values) => {
        await register(
            {
                noRedirect: url === '/shop/checkout',
                payload: values,
            },
            {
                onError: (error) => {
                    form.setError('root', { message: error.message });
                },
            },
        );
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
                        name="first_name"
                    >
                        <FormField.Label>First Name</FormField.Label>
                        <FormInput />
                        <FormField.Error />
                    </FormField>

                    <FormField
                        control={form.control}
                        name="last_name"
                    >
                        <FormField.Label>Last Name</FormField.Label>
                        <FormInput />
                        <FormField.Error />
                    </FormField>

                    <FormField
                        control={form.control}
                        name="phone"
                    >
                        <FormField.Label>Phone</FormField.Label>
                        <FormInput />
                        <FormField.Error />
                    </FormField>

                    <FormField
                        control={form.control}
                        name="gender"
                    >
                        {({ field }) => (
                            <>
                                <FormField.Label>Gender</FormField.Label>

                                <FormRadioGroup
                                    field={field}
                                    className="flex"
                                >
                                    {({ Item }) => (
                                        <>
                                            <Item value="male">Male</Item>
                                            <Item value="female">Female</Item>
                                        </>
                                    )}
                                </FormRadioGroup>
                                <FormField.Error />
                            </>
                        )}
                    </FormField>

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
                        name="password_confirmation"
                    >
                        <FormField.Label>Confirm password</FormField.Label>
                        <FormPasswordInput />
                        <FormField.Error />
                    </FormField>

                    <FormField
                        control={form.control}
                        name="user_agreement"
                        orientation="horizontal"
                    >
                        <FormCheckbox />
                        <FormField.Label>Agree to user agreement.</FormField.Label>

                        <FormField.Error />
                    </FormField>
                </FieldGroup>
            </FieldSet>

            {form.formState.errors.root && <FieldError>{form.formState.errors.root.message}</FieldError>}

            <FormButton control={form.control}>Register</FormButton>
        </Form>
    );
}
