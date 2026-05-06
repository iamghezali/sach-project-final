import type { JSX } from 'react';
import React from 'react';
import { useFieldContext } from '@/components/form/form-field';
import { Field, FieldContent, FieldLabel } from '@/components/ui/field';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type FormRadioGroupItemProps<TValue extends string> = {
    value: TValue;
    children: React.ReactNode;
    disabled?: boolean;
} & Omit<React.ComponentProps<typeof FieldLabel>, 'value' | 'id' | 'disabled'>;

type FormRadioGroupChildren<TValue extends string> = {
    Item: (props: FormRadioGroupItemProps<TValue>) => JSX.Element;
};

interface FormRadioGroupProps<TValue extends string> extends Omit<
    React.ComponentProps<typeof RadioGroup>,
    'value' | 'onValueChange' | 'onBlur' | 'ref' | 'aria-invalid' | 'children'
> {
    field?: { value: TValue; [key: string]: any };
    variant?: React.ComponentProps<typeof FieldLabel>['variant'];
    children: ((components: FormRadioGroupChildren<TValue>) => React.ReactNode) | React.ReactNode;
}

export function FormCardRadioGroup<TValue extends string>({
    field: fieldProp,
    children,
    variant,
    ...props
}: FormRadioGroupProps<TValue>) {
    const fieldcontext = useFieldContext();

    const field = fieldProp ?? fieldcontext.field;
    const { fieldState, name } = fieldcontext;

    const Item: FormRadioGroupChildren<TValue>['Item'] = (itemProps) => (
        <RadioGroupFieldItem
            variant={variant}
            {...itemProps}
            name={name}
        />
    );

    return (
        <RadioGroup
            {...props}
            value={field.value}
            onValueChange={field.onChange}
            onBlur={field.onBlur}
            aria-invalid={fieldState.invalid}
        >
            {typeof children === 'function' ? children({ Item }) : children}
        </RadioGroup>
    );
}

type RadioGroupItemProps<TValue extends string> = {
    value: TValue;
    name: string;
    children: React.ReactNode;
    disabled?: boolean;
} & Omit<React.ComponentProps<typeof FieldLabel>, 'value' | 'id' | 'disabled'>;

function RadioGroupFieldItem<TValue extends string>({
    value,
    name,
    children,
    variant = 'default',
    disabled,
    ...itemProps
}: RadioGroupItemProps<TValue>) {
    const id = `${name}-${value}`;

    return (
        <FieldLabel
            htmlFor={id}
            {...itemProps}
            variant={variant}
        >
            <Field
                variant={variant}
                orientation="horizontal"
            >
                <RadioGroupItem
                    id={id}
                    value={value}
                    disabled={disabled}
                    variant={variant}
                />

                <FieldContent>{children}</FieldContent>
            </Field>
        </FieldLabel>
    );
}
