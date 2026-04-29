import type { Combobox as ComboboxPrimitive } from '@base-ui/react';
import type { JSX } from 'react';
import type { FieldValues, Path, PathValue } from 'react-hook-form';
import { useFieldContext } from '@/components/form/form-field';
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from '@/components/ui/combobox';

type ComboboxOption<TValue extends string> = {
    label: string;
    value: TValue;
    disabled?: boolean;
};

type OmittedComboboxProps = 'value' | 'onValueChange' | 'items' | 'itemToStringValue';

interface FormComboboxProps<T extends FieldValues, TName extends Path<T>> extends Omit<
    ComboboxPrimitive.Root.Props<ComboboxOption<PathValue<T, TName>>>,
    OmittedComboboxProps
> {
    placeholder?: string;
    emptyText?: string;
    options: ComboboxOption<PathValue<T, TName>>[];
}

export default function FormCombobox<T extends FieldValues, TName extends Path<T>>({
    placeholder = 'Search...',
    emptyText = 'No results found.',
    options,
    disabled,
    readOnly,
    ...props
}: FormComboboxProps<T, TName>): JSX.Element {
    const { field, fieldState } = useFieldContext();

    return (
        <Combobox
            {...props}
            disabled={disabled}
            readOnly={readOnly}
            items={options}
            itemToStringValue={(option) => option.label}
            value={options.find((o) => o.value === field.value) ?? null}
            onValueChange={(option) => field.onChange(option?.value ?? '')}
        >
            <ComboboxInput
                aria-invalid={fieldState.invalid}
                placeholder={placeholder}
                onBlur={field.onBlur}
                disabled={disabled}
                readOnly={readOnly}
            />
            <ComboboxContent>
                <ComboboxEmpty>{emptyText}</ComboboxEmpty>
                <ComboboxList>
                    {(option) => (
                        <ComboboxItem
                            key={option.value}
                            value={option}
                            disabled={option.disabled}
                        >
                            {option.label}
                        </ComboboxItem>
                    )}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    );
}
