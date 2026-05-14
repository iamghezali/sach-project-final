import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import type { JSX } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
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
import { useCreateCategory } from '@/features/dashboard/store/categories/mutations';
import { CreateCategoryRequestSchema } from '@/features/dashboard/store/categories/schema';
import type { CreateCategoryRequest } from '@/features/dashboard/store/categories/schema';

export default function NewCategory(): JSX.Element {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { mutateAsync: createCategory } = useCreateCategory();

    const form = useForm<CreateCategoryRequest>({
        defaultValues: {
            name: '',
            slug: '',
        },
        resolver: zodResolver(CreateCategoryRequestSchema),
    });

    const onSubmit: SubmitHandler<CreateCategoryRequest> = async (values) => {
        await createCategory(values, {
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
                <Button>New Category</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Category</DialogTitle>
                    <DialogDescription className="sr-only">Form to add new category</DialogDescription>
                </DialogHeader>

                <Form
                    form={form}
                    onSubmit={onSubmit}
                >
                    <FormField
                        control={form.control}
                        name="name"
                    >
                        <FormField.Label>Name</FormField.Label>
                        <FormInput />
                        <FormField.Error />
                    </FormField>

                    <FormField
                        control={form.control}
                        name="slug"
                    >
                        <FormField.Label>Slug</FormField.Label>
                        <FormInput />
                        <FormField.Error />
                    </FormField>

                    {form.formState.errors.root && <FieldError>{form.formState.errors.root.message}</FieldError>}

                    <FormButton control={form.control}>Create Category</FormButton>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
