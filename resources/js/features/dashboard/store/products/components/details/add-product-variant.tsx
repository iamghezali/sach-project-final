import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import type { JSX } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import Form from '@/components/form/form';
import { FormButton } from '@/components/form/form-button';
import { FormField } from '@/components/form/form-field';
import { FormInput } from '@/components/form/form-input';
import { FormSelect } from '@/components/form/form-select';
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
import { useCreateProductVariant } from '@/features/dashboard/store/products/mutations';
import type { Attribute, CreateProductVariantRequest } from '@/features/dashboard/store/products/schema';
import { CreateProductVariantRequestSchema } from '@/features/dashboard/store/products/schema';

interface AddProductVariantProps {
    productId: number;
    attributes: Attribute[];
}

export default function AddProductVariant({ productId, attributes }: AddProductVariantProps): JSX.Element {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { mutateAsync: createProductVariant, isPending } = useCreateProductVariant(productId);

    const form = useForm<CreateProductVariantRequest>({
        defaultValues: {
            sku: '',
            stock_quantity: 0,
            price: 1000,
            attribute_value_ids: attributes.map((attribute) => attribute.values[0]?.id ?? 0),
        },
        resolver: zodResolver(CreateProductVariantRequestSchema(attributes.length)),
    });

    const onSubmit: SubmitHandler<CreateProductVariantRequest> = async (values) => {
        await createProductVariant(
            {
                productId: productId,
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

    const handleDialog = (open: boolean) => {
        if (open) {
            form.reset({
                sku: '',
                stock_quantity: 0,
                price: 1000,
                attribute_value_ids: attributes.map((attribute) => attribute.values[0]?.id ?? 0),
            });
        }

        setIsOpen(open);
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={handleDialog}
        >
            <DialogTrigger asChild>
                <Button>New Variant</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Product Variant</DialogTitle>
                    <DialogDescription className="sr-only">Form to add new product variant</DialogDescription>
                </DialogHeader>

                <Form
                    form={form}
                    onSubmit={onSubmit}
                >
                    <FormField
                        control={form.control}
                        name="sku"
                    >
                        <FormField.Label>SKU</FormField.Label>
                        <FormInput />
                        <FormField.Error />
                    </FormField>

                    <FormField
                        control={form.control}
                        name="price"
                    >
                        <FormField.Label>Price</FormField.Label>
                        <FormInput
                            type="number"
                            step="any"
                            min={0}
                        />
                        <FormField.Error />
                    </FormField>

                    <FormField
                        control={form.control}
                        name="stock_quantity"
                    >
                        <FormField.Label>Stock Quantity</FormField.Label>
                        <FormInput
                            type="number"
                            min={0}
                        />
                        <FormField.Error />
                    </FormField>

                    {attributes.map((attribute, i) => (
                        <FormField
                            control={form.control}
                            name={`attribute_value_ids.${i}`}
                        >
                            {({ field }) => (
                                <>
                                    <FormField.Label>{attribute.name}</FormField.Label>
                                    <FormSelect
                                        placeholder="Select an option"
                                        field={field}
                                    >
                                        {({ Item }) =>
                                            attribute.values.map((val) => (
                                                <Item
                                                    key={val.id}
                                                    value={val.id}
                                                >
                                                    {val.value}
                                                </Item>
                                            ))
                                        }
                                    </FormSelect>
                                </>
                            )}
                        </FormField>
                    ))}

                    {form.formState.errors.root && <FieldError>{form.formState.errors.root.message}</FieldError>}

                    <FormButton control={form.control}>{isPending ? 'Adding variant…' : 'Add Variant'}</FormButton>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
