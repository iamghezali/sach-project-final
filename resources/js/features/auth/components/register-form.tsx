import { zodResolver } from '@hookform/resolvers/zod';
import { Link, usePage } from '@inertiajs/react';
import { ArrowRightIcon } from 'lucide-react';
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
import { FieldContent, FieldDescription, FieldError, FieldGroup, FieldSet } from '@/components/ui/field';
import GoogleButton from '@/features/auth/components/google-button';
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
                noRedirect: url.startsWith('/shop/checkout'),
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
        <div className="text-brand-neutral-1000">
            <h1 className="font-rubik text-4xl/tight font-semibold">Register</h1>

            <div className="mt-2 flex flex-col gap-6">
                <span className="block text-xl font-medium">Sign up with</span>
                <GoogleButton disabled>Sign up with Google</GoogleButton>

                <span className="block text-xl/tight font-medium uppercase">Or</span>
            </div>

            <div className="mt-6">
                <Form
                    form={form}
                    onSubmit={onSubmit}
                    className="flex flex-col gap-6"
                >
                    <FieldSet>
                        <FieldGroup>
                            <FormField
                                control={form.control}
                                name="first_name"
                            >
                                <FormInput
                                    variant="brand-primary"
                                    placeholder="First Name"
                                />
                                <FormField.Error />
                            </FormField>

                            <FormField
                                control={form.control}
                                name="last_name"
                            >
                                <FormInput
                                    variant="brand-primary"
                                    placeholder="Last Name"
                                />
                                <FormField.Error />
                            </FormField>

                            <FormField
                                control={form.control}
                                name="phone"
                            >
                                <FormInput
                                    variant="brand-primary"
                                    placeholder="Phone"
                                />
                                <FormField.Error />
                            </FormField>

                            <FormField
                                control={form.control}
                                name="gender"
                                className="gap-5"
                            >
                                {({ field }) => (
                                    <>
                                        <FormField.Label className="text-2xl font-semibold">Gender</FormField.Label>

                                        <FormRadioGroup
                                            field={field}
                                            className="flex gap-8"
                                            variant="brand-primary"
                                        >
                                            {({ Item }) => (
                                                <>
                                                    <Item value="male">
                                                        <span className="text-base">Male</span>
                                                    </Item>
                                                    <Item value="female">
                                                        <span className="text-base">Female</span>
                                                    </Item>
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
                                <FormInput
                                    variant="brand-primary"
                                    placeholder="Email"
                                />
                                <FormField.Error />
                            </FormField>

                            <FormField
                                control={form.control}
                                name="password"
                            >
                                <FormPasswordInput placeholder="Password" />
                                <FieldDescription className="/80 mt-1 block text-xs leading-4 text-pretty">
                                    Minimum 8 characters with at least one uppercase, one lowercase, one special
                                    character and a number.
                                </FieldDescription>
                                <FormField.Error />
                            </FormField>

                            <FormField
                                control={form.control}
                                name="password_confirmation"
                            >
                                <FormPasswordInput placeholder="Confirm password" />
                                <FormField.Error />
                            </FormField>

                            <FormField
                                control={form.control}
                                name="user_agreement"
                                orientation="horizontal"
                            >
                                <FormCheckbox variant="brand-primary" />
                                <FieldContent>
                                    <FormField.Label>
                                        {' '}
                                        <span className="text-base leading-5.5 font-normal text-pretty">
                                            By clicking 'Register' you agree to our website Sache Terms & Conditions,
                                            Sache{' '}
                                            <Link
                                                className="underline"
                                                href="#"
                                            >
                                                Privacy Notice
                                            </Link>{' '}
                                            and{' '}
                                            <Link
                                                className="underline"
                                                href="#"
                                            >
                                                Terms & Conditions.
                                            </Link>
                                        </span>
                                    </FormField.Label>
                                </FieldContent>

                                <FormField.Error />
                            </FormField>
                        </FieldGroup>
                    </FieldSet>

                    {form.formState.errors.root && <FieldError>{form.formState.errors.root.message}</FieldError>}

                    <FormButton
                        control={form.control}
                        className="w-full justify-between px-4 uppercase"
                        size="brand-lg"
                        variant="brand-neutral"
                    >
                        Register
                        <ArrowRightIcon strokeWidth={3} />
                    </FormButton>

                    <span className="mt-3 block">
                        Have an Account?{' '}
                        <Link
                            className="underline"
                            href="/login"
                        >
                            Login
                        </Link>
                        .
                    </span>
                </Form>
            </div>
        </div>
    );
}
