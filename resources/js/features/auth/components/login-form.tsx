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
import { FieldContent, FieldError, FieldGroup, FieldSet } from '@/components/ui/field';
import GoogleButton from '@/features/auth/components/google-button';
import { useLogin } from '@/features/auth/mutations';
import { LoginRequestSchema } from '@/features/auth/schema';
import type { LoginRequest } from '@/features/auth/schema';

export default function LoginForm(): JSX.Element {
    const { mutateAsync: login } = useLogin();
    const { url } = usePage();

    const form = useForm<LoginRequest>({
        defaultValues: {
            email: '',
            password: '',
            remember: true,
        },
        resolver: zodResolver(LoginRequestSchema),
    });

    const onSubmit: SubmitHandler<LoginRequest> = async (values) => {
        await login(
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
        <div>
            <h1 className="text-[2rem]/tight font-semibold text-brand-neutral-1000">Login</h1>

            <div className="mt-2 flex flex-col gap-6">
                <span className="block text-xl font-medium text-brand-neutral-1000">Sign in with</span>
                <GoogleButton disabled>Sign in with Google</GoogleButton>

                <span className="block text-xl/tight font-medium text-brand-neutral-1000 uppercase">Or</span>
            </div>

            <div className="mt-6">
                <Form
                    form={form}
                    onSubmit={onSubmit}
                    className="flex flex-col gap-6"
                >
                    <FieldSet>
                        <FieldGroup className="gap-6">
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

                            <div>
                                <FormField
                                    control={form.control}
                                    name="password"
                                >
                                    <FormPasswordInput placeholder="Password" />
                                    <FormField.Error />
                                </FormField>

                                <Link
                                    className="mt-3 block text-brand-neutral-1000 underline"
                                    href="#"
                                >
                                    Forget your password?
                                </Link>
                            </div>

                            <FormField
                                control={form.control}
                                name="remember"
                                orientation="horizontal"
                            >
                                <FormCheckbox variant="brand-primary" />
                                <FieldContent>
                                    <FormField.Label>
                                        <span className="text-base font-normal text-pretty">
                                            Keep me logged in - applies to all log in options below.{' '}
                                            <Link
                                                className="underline"
                                                href="#"
                                            >
                                                More info
                                            </Link>
                                        </span>
                                    </FormField.Label>
                                </FieldContent>
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
                        Login
                        <ArrowRightIcon strokeWidth={3} />
                    </FormButton>

                    <div>
                        <span className="text-pretty">
                            By clicking 'Log In' you agree to our website Sache Terms & Conditions, Sache{' '}
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

                        <span className="mt-3 block">
                            No Account?{' '}
                            <Link
                                className="underline"
                                href="/register"
                            >
                                Register
                            </Link>
                            .
                        </span>
                    </div>
                </Form>
            </div>
        </div>
    );
}
