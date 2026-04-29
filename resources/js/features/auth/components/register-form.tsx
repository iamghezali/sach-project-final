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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { RegisterRequestSchema } from '@/features/auth/schema';
import type { RegisterRequest } from '@/features/auth/schema';

export default function RegisterForm(): JSX.Element {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const toggle = () => setShowPassword((prev) => !prev);

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
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldSet>
                <FieldGroup>
                    <Controller
                        control={form.control}
                        name="first_name"
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="first_name">First Name</FieldLabel>

                                <Input
                                    {...field}
                                    id="first_name"
                                    type="text"
                                    aria-invalid={fieldState.invalid}
                                />

                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    <Controller
                        control={form.control}
                        name="last_name"
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="last_name">Last Name</FieldLabel>

                                <Input
                                    {...field}
                                    id="last_name"
                                    type="text"
                                    aria-invalid={fieldState.invalid}
                                />

                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    <Controller
                        control={form.control}
                        name="phone"
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="phone">Phone</FieldLabel>

                                <Input
                                    {...field}
                                    id="phone"
                                    type="text"
                                    aria-invalid={fieldState.invalid}
                                />

                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

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
                        name="password_confirmation"
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="password_confirmation">Confirm Password</FieldLabel>

                                <InputGroup>
                                    <InputGroupInput
                                        {...field}
                                        id="password_confirmation"
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
                        name="user_agreement"
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

                                <FieldLabel htmlFor="remember">Agree to user agreement</FieldLabel>

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
