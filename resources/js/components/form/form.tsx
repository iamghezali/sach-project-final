import React from 'react';
import type { FieldValues, SubmitErrorHandler, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { PasswordVisibilityProvider } from '@/components/form/providers/password-visibility-provider';

type FormProps<T extends FieldValues> = Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> & {
    form: UseFormReturn<T>;
    onSubmit: SubmitHandler<T>;
    onError?: SubmitErrorHandler<T>;
    children: React.ReactNode;
};

export default function Form<T extends FieldValues>({ form, onSubmit, onError, children, ...props }: FormProps<T>) {
    return (
        <PasswordVisibilityProvider>
            <form
                onSubmit={form.handleSubmit(onSubmit, onError)}
                {...props}
            >
                {children}
            </form>
        </PasswordVisibilityProvider>
    );
}
