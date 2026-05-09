import { LoaderCircleIcon } from 'lucide-react';
import type { ComponentProps } from 'react';
import { useFormState } from 'react-hook-form';
import type { Control, FieldValues } from 'react-hook-form';
import { Button } from '@/components/ui/button';

type SubmitButtonProps<T extends FieldValues> = Omit<ComponentProps<typeof Button>, 'type'> & {
    control: Control<T>;
    isLoading?: boolean;
    showSpinner?: boolean;
};

export function FormButton<T extends FieldValues>({
    control,
    isLoading,
    showSpinner = true,
    children,
    disabled,
    ...props
}: SubmitButtonProps<T>) {
    const { isSubmitting, isSubmitted, isValid } = useFormState({ control });

    const isDisabled = disabled || isLoading || isSubmitting || (isSubmitted && !isValid);

    return (
        <Button
            type="submit"
            disabled={isDisabled}
            {...props}
        >
            {(isLoading || isSubmitting) && showSpinner && <LoaderCircleIcon className="animate-spin" />}
            {children}
        </Button>
    );
}
