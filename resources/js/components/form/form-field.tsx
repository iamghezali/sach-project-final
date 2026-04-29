import { createContext, useContext } from 'react';
import type {
    ControllerFieldState,
    ControllerRenderProps,
    FieldValues,
    FieldPath,
    UseFormReturn,
} from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { FieldError } from '@/components/ui/field';
import { Field, FieldLabel } from '@/components/ui/field';

export interface FieldContextValue {
    field: ControllerRenderProps<FieldValues, string>;
    fieldState: ControllerFieldState;
    id: string;
    name: string;
}

const FieldContext = createContext<FieldContextValue | null>(null);

export function useFieldContext(): FieldContextValue {
    const ctx = useContext(FieldContext);

    if (!ctx) {
        throw new Error('useFieldContext must be used within <FormField>');
    }

    return ctx;
}

interface RootProps<TValues extends FieldValues, TName extends FieldPath<TValues>> extends React.ComponentProps<
    typeof Field
> {
    control: UseFormReturn<TValues>['control'];
    name: TName;
    id?: string;
    children: React.ReactNode;
}

export function Root<TValues extends FieldValues, TName extends FieldPath<TValues>>({
    control,
    name,
    id,
    children,
    ...props
}: RootProps<TValues, TName>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <FieldContext.Provider
                    value={{
                        fieldState,
                        field: field as ControllerRenderProps<FieldValues, string>,
                        name,
                        id: id ?? name,
                    }}
                >
                    <Field
                        data-invalid={fieldState.invalid}
                        {...props}
                    >
                        {children}
                    </Field>
                </FieldContext.Provider>
            )}
        />
    );
}

function Label({ children, ...props }: React.ComponentProps<typeof FieldLabel>) {
    const { id } = useFieldContext();

    return (
        <FieldLabel
            htmlFor={id}
            {...props}
        >
            {children}
        </FieldLabel>
    );
}

function ErrorMessage({ ...props }: React.ComponentProps<typeof FieldError>) {
    const { fieldState } = useFieldContext();

    if (!fieldState.error) {
        return null;
    }

    return (
        <FieldError
            errors={[fieldState.error]}
            {...props}
        />
    );
}

export const FormField = Object.assign(Root, {
    Label,
    Error: ErrorMessage,
});
