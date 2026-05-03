import type { JSX } from 'react';
import React from 'react';
import { useFieldContext } from '@/components/form/form-field';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

type FormToggleGroupItemProps<TValue extends string | number> = {
    value: TValue;
    children: React.ReactNode;
    disabled?: boolean;
} & Omit<React.ComponentProps<typeof ToggleGroupItem>, 'value' | 'disabled'>;

type FormToggleGroupChildren<TValue extends string | number> = {
    Item: (props: FormToggleGroupItemProps<TValue>) => JSX.Element;
};

type BaseProps<TValue extends string | number> = Omit<
    React.ComponentProps<typeof ToggleGroup>,
    'value' | 'onValueChange' | 'onBlur' | 'children' | 'type' | 'defaultValue'
> & {
    children: ((components: FormToggleGroupChildren<TValue>) => React.ReactNode) | React.ReactNode;
};

type FieldProps<TValue> = {
    value: TValue;
    onChange: (...event: any[]) => void;
    onBlur: () => void;
};

type FormToggleGroupProps<TValue extends string | number> =
    | (BaseProps<TValue> & { type?: 'single'; field?: FieldProps<TValue> })
    | (BaseProps<TValue> & { type: 'multiple'; field?: FieldProps<TValue[]> });

export function FormToggleGroup<TValue extends string | number>({
    field: fieldProp,
    children,
    type = 'single',
    ...props
}: FormToggleGroupProps<TValue>) {
    const fieldContext = useFieldContext();
    const field = fieldProp ?? fieldContext.field;

    const Item: FormToggleGroupChildren<TValue>['Item'] = ({ value, ...itemProps }) => (
        <ToggleGroupItem
            {...itemProps}
            value={String(value)}
        />
    );

    const convertValue = (val: string) => {
        if (typeof field.value === 'number') {
            return Number(val) as unknown as TValue;
        }

        if (Array.isArray(field.value) && typeof field.value[0] === 'number') {
            return Number(val) as unknown as TValue;
        }

        if (
            field.value === undefined ||
            field.value === null ||
            (Array.isArray(field.value) && field.value.length === 0)
        ) {
            const num = Number(val);

            if (!isNaN(num) && val.trim() !== '') {
                return num as unknown as TValue;
            }
        }

        return val as unknown as TValue;
    };

    const renderedChildren = typeof children === 'function' ? children({ Item }) : children;

    if (type === 'multiple') {
        const value = Array.isArray(field.value) ? field.value.map(String) : [];

        return (
            <ToggleGroup
                type="multiple"
                {...props}
                value={value}
                onValueChange={(val) => {
                    if (!val) {
                        return;
                    }

                    field.onChange(val.map(convertValue));
                }}
                onBlur={field.onBlur}
            >
                {renderedChildren}
            </ToggleGroup>
        );
    }

    const value = field.value !== undefined && field.value !== null ? String(field.value) : '';

    return (
        <ToggleGroup
            type="single"
            {...props}
            value={value}
            onValueChange={(val) => {
                if (!val) {
                    return;
                }

                field.onChange(convertValue(val));
            }}
            onBlur={field.onBlur}
        >
            {renderedChildren}
        </ToggleGroup>
    );
}
