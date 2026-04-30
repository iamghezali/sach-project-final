// components/form/form-slider.tsx
import type { JSX } from 'react';
import { useFieldContext } from '@/components/form/form-field';
import { Slider } from '@/components/ui/slider';

export function Root({ ...props }: React.ComponentProps<typeof Slider>) {
    const { field, fieldState, id } = useFieldContext();

    const value = field.value != null ? [field.value] : undefined;

    const handleValueChange = (newValue: number[]) => {
        field.onChange(newValue[0]);
    };

    return (
        <Slider
            id={id}
            aria-invalid={fieldState.invalid}
            value={value}
            onValueChange={handleValueChange}
            onBlur={field.onBlur}
            {...props}
        />
    );
}

function SliderValue({ unit }: { unit?: string }): JSX.Element {
    const { field } = useFieldContext();

    return (
        <span>
            {field.value} {unit && unit}
        </span>
    );
}

export const FormSlider = Object.assign(Root, {
    Value: SliderValue,
});
