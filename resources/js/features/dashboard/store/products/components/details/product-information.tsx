import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import type { JSX } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import Form from '@/components/form/form';
import { FormButton } from '@/components/form/form-button';
import { FormField } from '@/components/form/form-field';
import { FormInput } from '@/components/form/form-input';
import { FormTextarea } from '@/components/form/form-textarea';
import { Badge } from '@/components/ui/badge';
import { FieldError } from '@/components/ui/field';
import ChangeProductStatus from '@/features/dashboard/store/products/components/details/change-product-status';
import { useUpdateProduct } from '@/features/dashboard/store/products/mutations';
import { useProductDetails } from '@/features/dashboard/store/products/queries';
import { UpdateProductRequestSchema } from '@/features/dashboard/store/products/schema';
import type { UpdateProductRequest } from '@/features/dashboard/store/products/schema';

type ProductInformationProps = {
    productID: number;
};
export default function ProductInformation({ productID }: ProductInformationProps): JSX.Element {
    const { data: response, isLoading } = useProductDetails(productID);
    const { mutateAsync: updateProduct } = useUpdateProduct();

    const form = useForm<UpdateProductRequest>({
        defaultValues: {
            name: '',
            slug: '',
            description: '',
        },
        resolver: zodResolver(UpdateProductRequestSchema),
    });

    const onSubmit: SubmitHandler<UpdateProductRequest> = async (values) => {
        await updateProduct(
            {
                id: productID,
                payload: values,
            },
            {
                onError: (error) => {
                    form.setError('root', { message: error.message });
                },
            },
        );
    };

    useEffect(() => {
        if (isLoading || !response?.data) {
            return;
        }

        const product = response.data;

        form.reset({
            name: product.name,
            slug: product.slug,
            description: product.description ?? '',
        });
    }, [response, isLoading, form]);

    if (isLoading) {
        return <>Loading...</>;
    }

    if (!response?.data) {
        return <>Loading Error</>;
    }

    const product = response.data;

    return (
        <div className="mt-10">
            <ChangeProductStatus productID={product.id} />

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

                <FormField
                    control={form.control}
                    name="description"
                >
                    <FormField.Label>Description</FormField.Label>
                    <FormTextarea className="min-h-24" />
                    <FormField.Error />
                </FormField>

                {form.formState.errors.root && <FieldError>{form.formState.errors.root.message}</FieldError>}

                <FormButton
                    control={form.control}
                    disabled={!form.formState.isDirty}
                >
                    Save
                </FormButton>
            </Form>

            <ul className="mt-4">
                <li>
                    <span>Status </span>
                    <Badge>{product.status_label}</Badge>
                </li>
                <li>
                    <span>Stock </span>
                    <Badge variant={product.is_available ? 'default' : 'destructive'}>
                        {product.is_available ? 'Availible' : 'Out of Stock'}
                    </Badge>
                </li>
            </ul>
        </div>
    );
}
