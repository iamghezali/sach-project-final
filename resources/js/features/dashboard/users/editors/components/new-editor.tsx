import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import type { JSX } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import Form from '@/components/form/form';
import { FormButton } from '@/components/form/form-button';
import { FormField } from '@/components/form/form-field';
import { FormInput } from '@/components/form/form-input';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { FieldError } from '@/components/ui/field';
import { useRegisterEditor } from '@/features/dashboard/users/editors/mutations';
import { RegisterEditorRequestSchema } from '@/features/dashboard/users/editors/schema';
import type { RegisterEditorRequest } from '@/features/dashboard/users/editors/schema';

export default function NewEditor(): JSX.Element {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { mutateAsync: register, isPending } = useRegisterEditor();

    const form = useForm<RegisterEditorRequest>({
        defaultValues: {
            email: '',
        },
        resolver: zodResolver(RegisterEditorRequestSchema),
    });

    const onSubmit: SubmitHandler<RegisterEditorRequest> = async (values) => {
        await register(values, {
            onError: (error) => {
                form.setError('root', { message: error.message });
            },
            onSuccess: () => {
                setIsOpen(false);
            },
        });
    };

    const handleDialog = (isOpen: boolean) => {
        form.reset();
        setIsOpen(isOpen);
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={handleDialog}
        >
            <DialogTrigger asChild>
                <Button>New Editor</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Editor</DialogTitle>
                    <DialogDescription className="sr-only">Form to add new editor</DialogDescription>
                </DialogHeader>

                <Form
                    form={form}
                    onSubmit={onSubmit}
                >
                    <FormField
                        control={form.control}
                        name="email"
                    >
                        <FormField.Label>Email</FormField.Label>
                        <FormInput />
                        <FormField.Error />
                    </FormField>

                    {form.formState.errors.root && <FieldError>{form.formState.errors.root.message}</FieldError>}

                    <FormButton control={form.control}>{isPending ? 'Adding new editor..' : 'Add Editor'}</FormButton>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
