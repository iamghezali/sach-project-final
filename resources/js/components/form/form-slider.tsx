// components/form/form-slider.tsx
import type { JSX } from 'react';
import { useFieldContext } from '@/components/form/form-field';
import { Slider } from '@/components/ui/slider';

type FormSliderProps = React.ComponentProps<typeof Slider> & {
    type?: 'single' | 'range';
};

export function Root({ type = 'single', ...props }: FormSliderProps) {
    const { field, fieldState, id } = useFieldContext();

    const sliderValue = type === 'single' ? (field.value != null ? [field.value] : undefined) : field.value;

    const handleValueChange = (newValue: number[]) => {
        if (type === 'single') {
            field.onChange(newValue[0]);
        } else {
            field.onChange(newValue);
        }
    };

    return (
        <Slider
            id={id}
            aria-invalid={fieldState.invalid}
            value={sliderValue}
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
