import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import type { JSX } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import Form from '@/components/form/form';
import { FormButton } from '@/components/form/form-button';
import { FormCheckbox } from '@/components/form/form-checkbox';
import { FormField } from '@/components/form/form-field';
import { FormInput } from '@/components/form/form-input';
import { Button } from '@/components/ui/button';
import { FieldError, FieldGroup } from '@/components/ui/field';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useDeleteProductVariant, useUpdateProductVariant } from '@/features/dashboard/store/products/mutations';
import { useProductVariant } from '@/features/dashboard/store/products/queries';
import { UpdateProductVariantRequestSchema } from '@/features/dashboard/store/products/schema';
import type { UpdateProductVariantRequest } from '@/features/dashboard/store/products/schema';
import { useSheet, useSheetState } from '@/providers/sheet-provider';

type EditVariantProps = {
    variantID: number;
    productID: number;
};

export default function EditVariant({ productID, variantID }: EditVariantProps): JSX.Element {
    const { open, onOpenChange, onAnimationEnd } = useSheetState();
    const { closeSheet } = useSheet();

    const { data: variantResponse, isLoading } = useProductVariant(productID, variantID);
    const { mutateAsync: updateProductVariant, isPending: isUpdating } = useUpdateProductVariant(productID);
    const { mutateAsync: deleteProductVariant, isPending: isDeleting } = useDeleteProductVariant(productID);

    const form = useForm<UpdateProductVariantRequest>({
        defaultValues: {
            sku: '',
            stock_quantity: 0,
            price: 0,
            is_active: true,
            is_default: false,
        },
        resolver: zodResolver(UpdateProductVariantRequestSchema),
    });

    const onSubmit: SubmitHandler<UpdateProductVariantRequest> = async (values) => {
        await updateProductVariant(
            { variantId: variantID, payload: values },
            {
                onSuccess: () => {
                    closeSheet();
                    toast.success('Variant updated');
                },
                onError: (error) => {
                    form.setError('root', { message: error.message });
                    toast.error(error.message || 'Failed to update variant');
                },
            },
        );
    };

    useEffect(() => {
        if (isLoading || !variantResponse?.data) {
            return;
        }

        const variant = variantResponse.data;

        form.reset({
            sku: variant.sku,
            stock_quantity: variant.stock_quantity,
            price: Number(variant.price),
            is_active: variant.is_active,
            is_default: variant.is_default,
        });
    }, [variantResponse, isLoading, form]);

    if (isLoading) {
        return (
            <Sheet
                open={open}
                onOpenChange={onOpenChange}
            >
                <SheetContent
                    side="right"
                    onAnimationEnd={onAnimationEnd}
                    className="bg-brand-neutral-100 data-[side=right]:sm:max-w-lg"
                >
                    <SheetHeader>
                        <SheetTitle>Edit Variant</SheetTitle>
                        <SheetDescription>Variant Details</SheetDescription>
                    </SheetHeader>
                    <div className="p-4">Loading...</div>
                </SheetContent>
            </Sheet>
        );
    }

    if (!variantResponse?.data) {
        return (
            <Sheet
                open={open}
                onOpenChange={onOpenChange}
            >
                <SheetContent
                    side="right"
                    onAnimationEnd={onAnimationEnd}
                    className="bg-brand-neutral-100 data-[side=right]:sm:max-w-lg"
                >
                    <SheetHeader>
                        <SheetTitle>Edit Variant</SheetTitle>
                        <SheetDescription>Variant Details</SheetDescription>
                    </SheetHeader>
                    <div className="p-4">Failed to load variant data.</div>
                </SheetContent>
            </Sheet>
        );
    }

    return (
        <Sheet
            open={open}
            onOpenChange={onOpenChange}
        >
            <SheetContent
                side="right"
                onAnimationEnd={onAnimationEnd}
                className="bg-brand-neutral-100 data-[side=right]:sm:max-w-lg"
            >
                <SheetHeader>
                    <SheetTitle>Edit Variant</SheetTitle>
                    <SheetDescription>Variant Details</SheetDescription>
                </SheetHeader>

                <div className="p-4">
                    <Form
                        form={form}
                        onSubmit={onSubmit}
                    >
                        <FieldGroup className="gap-4">
                            <FormField
                                control={form.control}
                                name="sku"
                                variant="brand-primary"
                            >
                                <FormField.Label
                                    variant="brand-primary"
                                    className="text-base"
                                >
                                    SKU
                                </FormField.Label>
                                <FormInput variant="brand-primary" />
                                <FormField.Error />
                            </FormField>

                            <FormField
                                control={form.control}
                                name="price"
                                variant="brand-primary"
                            >
                                <FormField.Label
                                    variant="brand-primary"
                                    className="text-base"
                                >
                                    Price
                                </FormField.Label>
                                <FormInput
                                    type="number"
                                    variant="brand-primary"
                                />
                                <FormField.Error />
                            </FormField>

                            <FormField
                                control={form.control}
                                name="stock_quantity"
                                variant="brand-primary"
                            >
                                <FormField.Label
                                    variant="brand-primary"
                                    className="text-base"
                                >
                                    Stock Quantity
                                </FormField.Label>
                                <FormInput
                                    type="number"
                                    variant="brand-primary"
                                />
                                <FormField.Error />
                            </FormField>

                            <FormField
                                control={form.control}
                                name="is_active"
                            >
                                <div className="flex items-center gap-2">
                                    <FormCheckbox />
                                    <FormField.Label>Active</FormField.Label>
                                </div>
                                <FormField.Error />
                            </FormField>

                            <FormField
                                control={form.control}
                                name="is_default"
                            >
                                <div className="flex items-center gap-2">
                                    <FormCheckbox />
                                    <FormField.Label>Default Variant</FormField.Label>
                                </div>
                                <FormField.Error />
                            </FormField>
                        </FieldGroup>

                        {form.formState.errors.root && <FieldError>{form.formState.errors.root.message}</FieldError>}

                        <FormButton
                            variant="brand-neutral"
                            size="brand-md"
                            className="mt-4 w-full"
                            control={form.control}
                            disabled={!form.formState.isDirty || isUpdating}
                        >
                            Save Changes
                        </FormButton>
                    </Form>

                    <div className="mt-6 border-t pt-6">
                        <Button
                            onClick={() =>
                                deleteProductVariant(variantID, {
                                    onSuccess: () => {
                                        closeSheet();
                                        toast.success('Variant deleted');
                                    },
                                    onError: (err) => toast.error(err.message || 'Failed to delete variant'),
                                })
                            }
                            variant="destructive"
                            size="brand-md"
                            disabled={isDeleting}
                            className="w-full"
                        >
                            {isDeleting ? 'Deleting...' : 'Remove Variant'}
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
