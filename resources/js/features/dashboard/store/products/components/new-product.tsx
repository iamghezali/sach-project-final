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
import { useCreateProduct } from '@/features/dashboard/store/products/mutations';
import type { CreateProductRequest } from '@/features/dashboard/store/products/schema';
import { CreateProductRequestSchema } from '@/features/dashboard/store/products/schema';

export default function NewProduct(): JSX.Element {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { mutateAsync: createProduct } = useCreateProduct();

    const form = useForm<CreateProductRequest>({
        defaultValues: {
            name: '',
            slug: '',
        },
        resolver: zodResolver(CreateProductRequestSchema),
    });

    const onSubmit: SubmitHandler<CreateProductRequest> = async (values) => {
        await createProduct(values, {
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
                <Button>New Product</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                    <DialogDescription className="sr-only">Form to add new product</DialogDescription>
                </DialogHeader>

                <Form
                    form={form}
                    onSubmit={onSubmit}
                >
                    <FormField
                        control={form.control}
                        name="name"
                    >
                        <FormField.Label>Product Name</FormField.Label>
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

                    <FormButton control={form.control}>Add new Product</FormButton>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
