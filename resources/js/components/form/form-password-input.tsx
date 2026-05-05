import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useFieldContext } from '@/components/form/form-field';
import { usePasswordVisibility } from '@/components/form/providers/password-visibility-provider';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group';

export function FormPasswordInput({ ...props }: React.ComponentProps<typeof InputGroupInput>) {
    const { field, fieldState, id } = useFieldContext();
    const { showPassword, toggle } = usePasswordVisibility();

    return (
        <InputGroup className="h-12 border-black">
            <InputGroupInput
                className="px-4"
                id={id}
                aria-invalid={fieldState.invalid}
                {...props}
                {...field}
                type={showPassword ? 'text' : 'password'}
            />

            <InputGroupAddon
                align="inline-end"
                className="px-3"
            >
                <InputGroupButton
                    size="icon-sm"
                    className="bg-transparent hover:bg-transparent"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    onClick={toggle}
                >
                    {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                </InputGroupButton>
            </InputGroupAddon>
        </InputGroup>
    );
}
