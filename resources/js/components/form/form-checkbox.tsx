import { useFieldContext } from '@/components/form/form-field';
import { Checkbox } from '@/components/ui/checkbox';

export function FormCheckbox({ ...props }: React.ComponentProps<typeof Checkbox>) {
    const { field, id } = useFieldContext();

    return (
        <Checkbox
            id={id}
            checked={field.value}
            onCheckedChange={field.onChange}
            onBlur={field.onBlur}
            {...props}
        />
    );
}
