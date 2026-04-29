import { useFieldContext } from '@/components/form/form-field';
import { Textarea } from '@/components/ui/textarea';

export function FormTextarea({ ...props }: React.ComponentProps<typeof Textarea>) {
    const { field, fieldState, id } = useFieldContext();

    return (
        <Textarea
            id={id}
            aria-invalid={fieldState.invalid}
            {...field}
            {...props}
        />
    );
}
