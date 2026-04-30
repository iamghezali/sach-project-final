import type { JSX } from 'react';
import React from 'react';
import { useFieldContext } from '@/components/form/form-field';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

type FormToggleGroupItemProps<TValue extends string> = {
    value: TValue;
    children: React.ReactNode;
    disabled?: boolean;
} & Omit<React.ComponentProps<typeof ToggleGroupItem>, 'value' | 'disabled'>;

type FormToggleGroupChildren<TValue extends string> = {
    Item: (props: FormToggleGroupItemProps<TValue>) => JSX.Element;
};

type BaseProps<TValue extends string> = Omit<
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

type FormToggleGroupProps<TValue extends string> =
    | (BaseProps<TValue> & { type?: 'single'; field?: FieldProps<TValue> })
    | (BaseProps<TValue> & { type: 'multiple'; field?: FieldProps<TValue[]> });

export function FormToggleGroup<TValue extends string>({
    field: fieldProp,
    children,
    type = 'single',
    ...props
}: FormToggleGroupProps<TValue>) {
    const fieldContext = useFieldContext();
    const field = fieldProp ?? fieldContext.field;

    const Item: FormToggleGroupChildren<TValue>['Item'] = (itemProps) => <ToggleGroupItem {...itemProps} />;

    const renderedChildren = typeof children === 'function' ? children({ Item }) : children;

    if (type === 'multiple') {
        return (
            <ToggleGroup
                type="multiple"
                {...props}
                value={field.value}
                onValueChange={(val) => {
                    if (!val) {
                        return;
                    }

                    field.onChange(val);
                }}
                onBlur={field.onBlur}
            >
                {renderedChildren}
            </ToggleGroup>
        );
    }

    return (
        <ToggleGroup
            type="single"
            {...props}
            value={field.value}
            onValueChange={(val) => {
                if (!val) {
                    return;
                }

                field.onChange(val);
            }}
            onBlur={field.onBlur}
        >
            {renderedChildren}
        </ToggleGroup>
    );
}
