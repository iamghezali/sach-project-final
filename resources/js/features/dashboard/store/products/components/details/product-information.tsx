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
import { FieldError, FieldGroup } from '@/components/ui/field';
import ProductImageGallery from '@/features/dashboard/store/products/components/details/product-image-gallery';
import ProductImagesUpload from '@/features/dashboard/store/products/components/details/product-images-upload';
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

    return (
        <div>
            <Form
                form={form}
                onSubmit={onSubmit}
            >
                <FieldGroup className="gap-4">
                    <FormField
                        control={form.control}
                        name="name"
                        variant="brand-primary"
                    >
                        <FormField.Label
                            variant="brand-primary"
                            className="text-base"
                        >
                            Name
                        </FormField.Label>
                        <FormInput variant="brand-primary" />
                        <FormField.Error />
                    </FormField>

                    <FormField
                        control={form.control}
                        name="slug"
                    >
                        <FormField.Label
                            variant="brand-primary"
                            className="text-base"
                        >
                            Slug
                        </FormField.Label>
                        <FormInput variant="brand-primary" />
                        <FormField.Error />
                    </FormField>

                    <FormField
                        control={form.control}
                        name="description"
                    >
                        <FormField.Label
                            variant="brand-primary"
                            className="text-base"
                        >
                            Description
                        </FormField.Label>
                        <FormTextarea
                            className="min-h-24"
                            variant="brand-primary"
                        />
                        <FormField.Error />
                    </FormField>
                </FieldGroup>

                {form.formState.errors.root && <FieldError>{form.formState.errors.root.message}</FieldError>}

                <FormButton
                    variant="brand-neutral"
                    size="brand-md"
                    className="mt-4"
                    control={form.control}
                    disabled={!form.formState.isDirty}
                >
                    Save
                </FormButton>
            </Form>

            <div className="mt-6 space-y-8">
                <section>
                    <h3 className="mb-4 text-lg font-medium">Media</h3>
                    <ProductImagesUpload productId={productID} />
                </section>

                <ProductImageGallery productId={productID} />
            </div>
        </div>
    );
}
