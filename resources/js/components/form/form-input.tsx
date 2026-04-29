import { useFieldContext } from '@/components/form/form-field';
import { Input } from '@/components/ui/input';

export function FormInput({ ...props }: React.ComponentProps<typeof Input>) {
    const { field, fieldState, id } = useFieldContext();

    return (
        <Input
            id={id}
            aria-invalid={fieldState.invalid}
            {...field}
            {...props}
        />
    );
}
