import { zodResolver } from '@hookform/resolvers/zod';
import type { JSX } from 'react';
import { useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import Form from '@/components/form/form';
import { FormButton } from '@/components/form/form-button';
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
import { FieldError } from '@/components/ui/field';
import { useCategoriesList } from '@/features/dashboard/store/categories/queries';
import { useAssignCategories } from '@/features/dashboard/store/products/mutations';
import { useProductDetails } from '@/features/dashboard/store/products/queries';
import { AssignCategoriesRequestSchema } from '@/features/dashboard/store/products/schema';
import type { AssignCategoriesRequest } from '@/features/dashboard/store/products/schema';

type Category = {
    id: number;
    name: string;
};

type CategoriesFieldProps = {
    value: number[];
    onChange: (ids: number[]) => void;
    categoriesList: Category[];
};

function CategoriesField({ value, onChange, categoriesList }: CategoriesFieldProps): JSX.Element {
    const anchor = useComboboxAnchor();
    const [searchQuery, setSearchQuery] = useState<string>('');

    return (
        <Combobox
            multiple
            autoHighlight
            variant="brand-primary"
            items={categoriesList.map((c) => c.id)}
            value={value}
            onValueChange={onChange}
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
                            <ComboboxChipsInput placeholder={selectedIds.length === 0 ? 'Search categories...' : ''} />
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
    );
}

type AssignCategoriesProps = {
    productID: number;
};

export default function AssignCategories({ productID }: AssignCategoriesProps): JSX.Element {
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

    return (
        <div>
            <Form
                form={form}
                onSubmit={onSubmit}
            >
                <Controller
                    control={form.control}
                    name="category_ids"
                    render={({ field, fieldState }) => (
                        <>
                            <CategoriesField
                                value={field.value}
                                onChange={field.onChange}
                                categoriesList={categoriesList}
                            />
                            {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
                        </>
                    )}
                />

                {form.formState.errors.root && <FieldError>{form.formState.errors.root.message}</FieldError>}

                <FormButton
                    className="mt-3"
                    control={form.control}
                    disabled={!form.formState.isDirty}
                >
                    Update Categories
                </FormButton>
            </Form>
        </div>
    );
}
