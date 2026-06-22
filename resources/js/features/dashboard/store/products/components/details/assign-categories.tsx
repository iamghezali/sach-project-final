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
import { useCategoriesList } from '@/features/dashboard/store/categories/queries';
import { useAssignCategories } from '@/features/dashboard/store/products/mutations';
import { useProductDetails } from '@/features/dashboard/store/products/queries';
import { AssignCategoriesRequestSchema } from '@/features/dashboard/store/products/schema';
import type { AssignCategoriesRequest } from '@/features/dashboard/store/products/schema';

type AssignCategoriesProps = {
    productID: number;
};

export default function AssignCategories({ productID }: AssignCategoriesProps): JSX.Element {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const anchor = useComboboxAnchor();

    const { data: responseProduct, isLoading: isLoadingProduct } = useProductDetails(productID);
    const { data: responseCategories, isLoading: isLoadingCategories } = useCategoriesList();
    const { mutateAsync: assignCategories } = useAssignCategories(productID);

    const productCategories = responseProduct?.data.categories;

    const form = useForm<AssignCategoriesRequest>({
        defaultValues: {
            category_ids: [],
        },
        resolver: zodResolver(AssignCategoriesRequestSchema),
    });

    const onSubmit: SubmitHandler<AssignCategoriesRequest> = async (values) => {
        await assignCategories(
            {
                productId: productID,
                payload: values,
            },
            {
                onError: (error) => {
                    form.reset({ category_ids: productCategories?.map((c) => c.id) });
                    form.setError('root', { message: error.message });
                },
                onSuccess: () => {
                    setIsOpen(false);
                    setSearchQuery('');
                },
            },
        );
    };

    useEffect(() => {
        if (productCategories) {
            form.reset({ category_ids: productCategories.map((c) => c.id) });
        }
    }, [productCategories, form]);

    if (isLoadingProduct || isLoadingCategories) {
        return <>Loading...</>;
    }

    if (!responseProduct?.data || !responseCategories?.data) {
        return <>Loading Error</>;
    }

    const categoriesList = responseCategories.data;

    const handleDialog = (open: boolean) => {
        if (open) {
            form.reset({ category_ids: productCategories?.map((c) => c.id) || [] });
        }

        setSearchQuery('');
        setIsOpen(open);
    };

    return (
        <div className="mt-4">
            <Dialog
                open={isOpen}
                onOpenChange={handleDialog}
            >
                <DialogTrigger asChild>
                    <Button variant="outline">Manage Categories</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Product Categories</DialogTitle>
                        <DialogDescription className="sr-only">Form to assign categories</DialogDescription>
                    </DialogHeader>

                    <Form
                        form={form}
                        onSubmit={onSubmit}
                    >
                        <Controller
                            control={form.control}
                            name="category_ids"
                            render={({ field, fieldState }) => (
                                <>
                                    <Combobox
                                        multiple
                                        autoHighlight
                                        items={categoriesList.map((c) => c.id)}
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        inputValue={searchQuery}
                                        onInputValueChange={setSearchQuery}
                                        itemToStringLabel={(id: number) => {
                                            const cat = categoriesList.find((c) => c.id === id);

                                            return cat ? cat.name : '';
                                        }}
                                    >
                                        <ComboboxChips ref={anchor}>
                                            <ComboboxValue>
                                                {(selectedIds: number[]) => (
                                                    <>
                                                        {selectedIds.map((id) => {
                                                            const cat = categoriesList.find((c) => c.id === id);

                                                            return <ComboboxChip key={id}>{cat?.name}</ComboboxChip>;
                                                        })}
                                                        <ComboboxChipsInput placeholder="Search categories..." />
                                                    </>
                                                )}
                                            </ComboboxValue>
                                        </ComboboxChips>
                                        <ComboboxContent anchor={anchor}>
                                            <ComboboxEmpty>No categories found.</ComboboxEmpty>
                                            <ComboboxList>
                                                {(id: number) => {
                                                    const cat = categoriesList.find((c) => c.id === id)!;

                                                    return (
                                                        <ComboboxItem
                                                            key={id}
                                                            value={id}
                                                        >
                                                            {cat.name}
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
                            Update Categories
                        </FormButton>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
