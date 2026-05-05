import type { VariantProps } from 'class-variance-authority';
import type { JSX } from 'react';
import React from 'react';
import { useFieldContext } from '@/components/form/form-field';
import { Field, FieldLabel } from '@/components/ui/field';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { radioGroupItemVariants } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

type RadioGroupVariantProps = VariantProps<typeof radioGroupItemVariants>;

type FormRadioGroupItemProps<TValue extends string> = {
    value: TValue;
    children: React.ReactNode;
    disabled?: boolean;
} & Omit<React.ComponentProps<typeof Field>, 'value' | 'id' | 'disabled'>;

type FormRadioGroupChildren<TValue extends string> = {
    Item: (props: FormRadioGroupItemProps<TValue>) => JSX.Element;
};

interface FormRadioGroupProps<TValue extends string>
    extends
        Omit<
            React.ComponentProps<typeof RadioGroup>,
            'value' | 'onValueChange' | 'onBlur' | 'ref' | 'aria-invalid' | 'children'
        >,
        RadioGroupVariantProps {
    field?: { value: TValue; [key: string]: any };
    children: ((components: FormRadioGroupChildren<TValue>) => React.ReactNode) | React.ReactNode;
}

export function FormRadioGroup<TValue extends string>({
    field: fieldProp,
    variant,
    children,
    ...props
}: FormRadioGroupProps<TValue>) {
    const fieldcontext = useFieldContext();

    const field = fieldProp ?? fieldcontext.field;
    const { fieldState, name } = fieldcontext;

    const Item: FormRadioGroupChildren<TValue>['Item'] = (itemProps) => (
        <RadioGroupFieldItem
            {...itemProps}
            name={name}
            variant={variant}
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
    variant?: RadioGroupVariantProps['variant'];
} & Omit<React.ComponentProps<typeof Field>, 'value' | 'id' | 'disabled'>;

function RadioGroupFieldItem<TValue extends string>({
    value,
    name,
    children,
    disabled,
    variant,
    className,
    ...itemProps
}: RadioGroupItemProps<TValue>) {
    const id = `${name}-${value}`;

    return (
        <Field
            orientation="horizontal"
            className={cn('w-auto *:data-[slot=field-label]:flex-none', className)}
            {...itemProps}
        >
            <RadioGroupItem
                value={value}
                id={id}
                disabled={disabled}
                variant={variant}
            />
            <FieldLabel
                htmlFor={id}
                className="w-auto"
            >
                {children}
            </FieldLabel>
        </Field>
    );
}
