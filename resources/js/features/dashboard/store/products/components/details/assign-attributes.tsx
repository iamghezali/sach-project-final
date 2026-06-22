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
import { FieldError, FieldLabel } from '@/components/ui/field';
import { useAttributesList } from '@/features/dashboard/store/attributes/queries';
import { useAssignAttributes } from '@/features/dashboard/store/products/mutations';
import { useProductDetails } from '@/features/dashboard/store/products/queries';
import { AssignAttributesRequestSchema } from '@/features/dashboard/store/products/schema';
import type { AssignAttributesRequest } from '@/features/dashboard/store/products/schema';

type Attribute = {
    id: number;
    name: string;
};

type AttributesFieldProps = {
    value: number[];
    onChange: (ids: number[]) => void;
    attributesList: Attribute[];
};

function AttributesField({ value, onChange, attributesList }: AttributesFieldProps): JSX.Element {
    const anchor = useComboboxAnchor();
    const [searchQuery, setSearchQuery] = useState<string>('');

    return (
        <Combobox
            multiple
            autoHighlight
            variant="brand-primary"
            items={attributesList.map((a) => a.id)}
            value={value}
            onValueChange={onChange}
            inputValue={searchQuery}
            onInputValueChange={setSearchQuery}
            itemToStringLabel={(id: number) => {
                const attr = attributesList.find((a) => a.id === id);

                return attr ? attr.name : '';
            }}
        >
            <ComboboxChips ref={anchor}>
                <ComboboxValue>
                    {(selectedIds: number[]) => (
                        <>
                            {selectedIds.map((id) => {
                                const attr = attributesList.find((a) => a.id === id);

                                return <ComboboxChip key={id}>{attr?.name}</ComboboxChip>;
                            })}
                            <ComboboxChipsInput placeholder={selectedIds.length === 0 ? 'Search attributes...' : ''} />
                        </>
                    )}
                </ComboboxValue>
            </ComboboxChips>
            <ComboboxContent anchor={anchor}>
                <ComboboxEmpty>No attributes found.</ComboboxEmpty>
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
    );
}

type AssignAttributesProps = {
    productID: number;
};

export default function AssignAttributes({ productID }: AssignAttributesProps): JSX.Element {
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

    return (
        <div>
            <Form
                form={form}
                onSubmit={onSubmit}
            >
                <FieldLabel
                    variant="brand-primary"
                    className="text-base"
                >
                    Attributes
                </FieldLabel>

                <div className="mt-2">
                    <Controller
                        control={form.control}
                        name="attribute_ids"
                        render={({ field, fieldState }) => (
                            <>
                                <AttributesField
                                    value={field.value}
                                    onChange={field.onChange}
                                    attributesList={attributesList}
                                />
                                {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
                            </>
                        )}
                    />
                </div>

                {form.formState.errors.root && <FieldError>{form.formState.errors.root.message}</FieldError>}

                <FormButton
                    className="mt-3"
                    control={form.control}
                    disabled={!form.formState.isDirty}
                >
                    Update Attributes
                </FormButton>
            </Form>
        </div>
    );
}
