import { useFieldContext } from '@/components/form/form-field';
import { Input } from '@/components/ui/input';

export function FormInput({ onChange, ...props }: React.ComponentProps<typeof Input>) {
    const { field, fieldState, id } = useFieldContext();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (props.type === 'number') {
            const parsed = e.target.valueAsNumber;
            field.onChange(isNaN(parsed) ? '' : parsed);
        } else {
            field.onChange(e);
        }

        onChange?.(e);
    };

    return (
        <Input
            id={id}
            aria-invalid={fieldState.invalid}
            {...field}
            {...props}
            onChange={handleChange}
        />
    );
}
