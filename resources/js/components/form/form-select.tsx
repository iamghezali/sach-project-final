import type { JSX } from 'react';
import React from 'react';
import { useFieldContext } from '@/components/form/form-field';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type SupportedTypes = string | number | boolean;

type FormSelectItemProps<TValue extends SupportedTypes> = {
    value: TValue;
    children: React.ReactNode;
    disabled?: boolean;
} & Omit<React.ComponentProps<typeof SelectItem>, 'value'>;

type FormSelectChildren<TValue extends SupportedTypes> = {
    Item: (props: FormSelectItemProps<TValue>) => JSX.Element;
};

interface FormSelectProps<TValue extends SupportedTypes> extends Omit<
    React.ComponentProps<typeof Select>,
    'value' | 'onValueChange' | 'children'
> {
    field?: {
        value: TValue;
        onChange: (value: TValue) => void;
        [key: string]: any;
    };
    placeholder?: string;
    children: ((components: FormSelectChildren<TValue>) => React.ReactNode) | React.ReactNode;
}

export function FormSelect<TValue extends SupportedTypes>({
    field: fieldProp,
    children,
    placeholder,
    ...props
}: FormSelectProps<TValue>) {
    const fieldcontext = useFieldContext();
    const field = fieldProp ?? fieldcontext.field;
    const { fieldState } = fieldcontext;

    const handleValueChange = (stringValue: string) => {
        let transformedValue: SupportedTypes = stringValue;

        if (stringValue === 'true') {
            transformedValue = true;
        } else if (stringValue === 'false') {
            transformedValue = false;
        } else if (!isNaN(Number(stringValue)) && stringValue.trim() !== '') {
            transformedValue = Number(stringValue);
        }

        field.onChange(transformedValue as TValue);
    };

    // Helper to ensure the Select component gets a string
    const safeValue = field.value !== undefined && field.value !== null ? String(field.value) : undefined;

    const Item: FormSelectChildren<TValue>['Item'] = ({ value, ...itemProps }) => (
        <SelectItem
            {...itemProps}
            value={String(value)}
        />
    );

    return (
        <Select
            {...props}
            value={safeValue}
            onValueChange={handleValueChange}
        >
            <SelectTrigger aria-invalid={fieldState?.invalid}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent>
                <SelectGroup>{typeof children === 'function' ? children({ Item }) : children}</SelectGroup>
            </SelectContent>
        </Select>
    );
}
