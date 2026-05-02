import { zodResolver } from '@hookform/resolvers/zod';
import type { JSX } from 'react';
import { useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import Form from '@/components/form/form';
import { FormButton } from '@/components/form/form-button';
import { Button } from '@/components/ui/button';
import {
    Combobox,
    ComboboxChip,
    ComboboxChips,
    ComboboxChipsInput,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxItem,
    ComboboxList,
    ComboboxValue,
    useComboboxAnchor,
} from '@/components/ui/combobox';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { FieldError } from '@/components/ui/field';
import { useAttributesList } from '@/features/dashboard/store/attributes/queries';
import { useAssignAttributes } from '@/features/dashboard/store/products/mutations';
import { useProductDetails } from '@/features/dashboard/store/products/queries';
import { AssignAttributesRequestSchema } from '@/features/dashboard/store/products/schema';
import type { AssignAttributesRequest } from '@/features/dashboard/store/products/schema';

type AssignAttributesProps = {
    productID: number;
};
export default function AssignAttributes({ productID }: AssignAttributesProps): JSX.Element {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const anchor = useComboboxAnchor();

    const { data: responseProduct, isLoading: isLoadingProduct } = useProductDetails(productID);
    const { data: responseAttributes, isLoading: isLoadingAttributes } = useAttributesList();
    const { mutateAsync: assignAttributes } = useAssignAttributes(productID);

    const productAttributes = responseProduct?.data.attributes;

    const form = useForm<AssignAttributesRequest>({
        defaultValues: {
            attribute_ids: [],
        },

        resolver: zodResolver(AssignAttributesRequestSchema),
    });

    const onSubmit: SubmitHandler<AssignAttributesRequest> = async (values) => {
        await assignAttributes(
            {
                productId: productID,
                payload: values,
            },
            {
                onError: (error) => {
                    form.reset({ attribute_ids: productAttributes?.map((a) => a.id) });

                    form.setError('root', { message: error.message });
                },

                onSuccess: () => {
                    setIsOpen(false);
                },
            },
        );
    };

    useEffect(() => {
        if (productAttributes) {
            form.reset({ attribute_ids: productAttributes.map((a) => a.id) });
        }
    }, [productAttributes, form]);

    if (isLoadingProduct || isLoadingAttributes) {
        return <>Loading...</>;
    }

    if (!responseProduct?.data || !responseAttributes?.data) {
        return <>Loading Error</>;
    }

    const attributesList = responseAttributes.data;

    const handleDialog = (open: boolean) => {
        if (open) {
            form.reset();
        }

        setIsOpen(open);
    };

    return (
        <div className="mt-4">
            <Dialog
                open={isOpen}
                onOpenChange={handleDialog}
            >
                <DialogTrigger asChild>
                    <Button>Assign Attributes</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Assign attributes</DialogTitle>
                        <DialogDescription className="sr-only">Form to assign attributes</DialogDescription>
                    </DialogHeader>

                    <Form
                        form={form}
                        onSubmit={onSubmit}
                    >
                        <Controller
                            control={form.control}
                            name="attribute_ids"
                            render={({ field, fieldState }) => (
                                <>
                                    <Combobox
                                        multiple
                                        autoHighlight
                                        items={attributesList.map((a) => a.id)}
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <ComboboxChips ref={anchor}>
                                            <ComboboxValue>
                                                {(selectedIds: number[]) => (
                                                    <>
                                                        {selectedIds.map((id) => {
                                                            const attr = attributesList.find((a) => a.id === id);

                                                            return <ComboboxChip key={id}>{attr?.name}</ComboboxChip>;
                                                        })}
                                                        <ComboboxChipsInput />
                                                    </>
                                                )}
                                            </ComboboxValue>
                                        </ComboboxChips>
                                        <ComboboxContent anchor={anchor}>
                                            <ComboboxEmpty>No items found.</ComboboxEmpty>
                                            <ComboboxList>
                                                {(id: number) => {
                                                    const attr = attributesList.find((a) => a.id === id)!;

                                                    return (
                                                        <ComboboxItem
                                                            key={id}
                                                            value={id}
                                                        >
                                                            {attr.name}
                                                        </ComboboxItem>
                                                    );
                                                }}
                                            </ComboboxList>
                                        </ComboboxContent>
                                    </Combobox>
                                    {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
                                </>
                            )}
                        />

                        {form.formState.errors.root && <FieldError>{form.formState.errors.root.message}</FieldError>}

                        <FormButton
                            control={form.control}
                            disabled={!form.formState.isDirty}
                        >
                            Save
                        </FormButton>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
