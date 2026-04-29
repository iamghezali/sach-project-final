import { zodResolver } from '@hookform/resolvers/zod';
import type { JSX } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import Form from '@/components/form/form';
import { FormCheckbox } from '@/components/form/form-checkbox';
import { FormField } from '@/components/form/form-field';
import { FormInput } from '@/components/form/form-input';
import { FormPasswordInput } from '@/components/form/form-password-input';
import { FormRadioGroup } from '@/components/form/form-radio-group';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { RegisterRequestSchema } from '@/features/auth/schema';
import type { RegisterRequest } from '@/features/auth/schema';

export default function RegisterForm(): JSX.Element {
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

    const onSubmit: SubmitHandler<RegisterRequest> = (values) => {
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

                    <Controller
                        control={form.control}
                        name="gender"
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="gender">Gender</FieldLabel>

                                <RadioGroup
                                    id="gender"
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    aria-invalid={fieldState.invalid}
                                >
                                    <Field orientation="horizontal">
                                        <RadioGroupItem
                                            id="male"
                                            value="male"
                                        />
                                        <FieldLabel htmlFor="male">Male</FieldLabel>
                                    </Field>

                                    <Field orientation="horizontal">
                                        <RadioGroupItem
                                            id="female"
                                            value="female"
                                        />
                                        <FieldLabel htmlFor="female">Female</FieldLabel>
                                    </Field>
                                </RadioGroup>

                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

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

                    <Button disabled={!form.formState.isValid && form.formState.isSubmitted}>Login</Button>
                </FieldGroup>
            </FieldSet>
        </Form>
    );
}
