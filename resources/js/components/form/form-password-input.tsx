import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useFieldContext } from '@/components/form/form-field';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group';
import { usePasswordVisibility } from '@/components/form/providers/password-visibility-provider';

export function FormPasswordInput({ ...props }: React.ComponentProps<typeof InputGroupInput>) {
    const { field, fieldState, id } = useFieldContext();
    const { showPassword, toggle } = usePasswordVisibility();

    return (
        <InputGroup>
            <InputGroupInput
                id={id}
                aria-invalid={fieldState.invalid}
                {...props}
                {...field}
                type={showPassword ? 'text' : 'password'}
            />

            <InputGroupAddon align="inline-end">
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
