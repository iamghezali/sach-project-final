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
import { Separator } from '@/components/ui/separator';
import AssignCategories from '@/features/dashboard/store/products/components/details/assign-categories';
import ChangeProductStatus from '@/features/dashboard/store/products/components/details/change-product-status';
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

    const product = response.data;

    return (
        <div className="mt-10">
            <ChangeProductStatus productID={productID} />

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

            <div className="mt-8 rounded-lg border bg-muted/20 p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                        <h4 className="text-sm font-medium">Product Categories</h4>
                        <div className="flex flex-wrap gap-1.5">
                            {product.categories.length > 0 ? (
                                product.categories.map((category) => (
                                    <Badge
                                        key={category.id}
                                        variant="secondary"
                                        className="rounded-md px-2 py-0.5 text-xs font-normal"
                                    >
                                        {category.name}
                                    </Badge>
                                ))
                            ) : (
                                <span className="text-xs text-muted-foreground italic">
                                    No categories assigned to this product.
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="shrink-0">
                        <AssignCategories productID={productID} />
                    </div>
                </div>
            </div>

            <Separator className="my-8" />

            <div className="mt-12 space-y-8">
                <section>
                    <h3 className="mb-4 text-lg font-medium">Product Gallery</h3>
                    <ProductImageGallery productId={productID} />
                </section>

                <section>
                    <h3 className="mb-4 text-lg font-medium">Add New Media</h3>
                    <ProductImagesUpload productId={productID} />
                </section>
            </div>

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
