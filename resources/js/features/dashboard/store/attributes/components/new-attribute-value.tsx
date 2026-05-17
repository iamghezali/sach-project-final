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
import { useCreateAttributeValue } from '@/features/dashboard/store/attributes/mutations';
import { CreateAttributeValueRequestSchema } from '@/features/dashboard/store/attributes/schema';
import type { CreateAttributeValueRequest } from '@/features/dashboard/store/attributes/schema';

type NewAttributeValueProps = {
    attributeID: number;
};

export default function NewAttributeValue({ attributeID }: NewAttributeValueProps): JSX.Element {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { mutateAsync: createAttributeValue } = useCreateAttributeValue();

    const form = useForm<CreateAttributeValueRequest>({
        defaultValues: {
            value: '',
            slug: '',
        },
        resolver: zodResolver(CreateAttributeValueRequestSchema),
    });

    const onSubmit: SubmitHandler<CreateAttributeValueRequest> = async (values) => {
        await createAttributeValue(
            {
                id: attributeID,
                payload: values,
            },
            {
                onError: (error) => {
                    form.setError('root', { message: error.message });
                },

                onSuccess: () => {
                    setIsOpen(false);
                },
            },
        );
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
                <Button>New Value</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Attribute Value</DialogTitle>
                    <DialogDescription className="sr-only">Form to add new attribute value</DialogDescription>
                </DialogHeader>

                <Form
                    form={form}
                    onSubmit={onSubmit}
                >
                    <FormField
                        control={form.control}
                        name="value"
                    >
                        <FormField.Label>Value</FormField.Label>
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

                    <FormButton control={form.control}>Create Value</FormButton>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
