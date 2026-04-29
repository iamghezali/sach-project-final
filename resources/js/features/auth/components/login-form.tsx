import { zodResolver } from '@hookform/resolvers/zod';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useState } from 'react';
import type { JSX } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group';
import { LoginRequestSchema } from '@/features/auth/schema';
import type { LoginRequest } from '@/features/auth/schema';

export default function LoginForm(): JSX.Element {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const toggle = () => setShowPassword((prev) => !prev);

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
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldSet>
                <FieldGroup>
                    <Controller
                        control={form.control}
                        name="email"
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="email">Email</FieldLabel>

                                <Input
                                    {...field}
                                    id="email"
                                    type="text"
                                    aria-invalid={fieldState.invalid}
                                />

                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    <Controller
                        control={form.control}
                        name="password"
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="password">Password</FieldLabel>

                                <InputGroup>
                                    <InputGroupInput
                                        {...field}
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                    />

                                    <InputGroupAddon align="inline-end">
                                        <InputGroupButton
                                            size="icon-sm"
                                            className="bg-transparent hover:bg-transparent"
                                            onClick={toggle}
                                        >
                                            {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                                        </InputGroupButton>
                                    </InputGroupAddon>
                                </InputGroup>

                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    <Controller
                        control={form.control}
                        name="remember"
                        render={({ field, fieldState }) => (
                            <Field
                                data-invalid={fieldState.invalid}
                                orientation="horizontal"
                            >
                                <Checkbox
                                    id="remember"
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />

                                <FieldLabel htmlFor="remember">Remember me</FieldLabel>

                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                </FieldGroup>
            </FieldSet>

            <Button disabled={!form.formState.isValid && form.formState.isSubmitted}>Login</Button>
        </form>
    );
}
