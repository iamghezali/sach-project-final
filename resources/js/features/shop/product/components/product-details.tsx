import { usePage } from '@inertiajs/react';
import type { JSX } from 'react';
import { ProductImageGallery } from '@/features/shop/product/components/product-image-gallery';
import { ProductVariantForm } from '@/features/shop/product/components/product-variant-form';
import { useLightbox } from '@/features/shop/product/hooks/use-lightbox';
import { useVariantSelection } from '@/features/shop/product/hooks/use-variant-selection';
import { useGetProduct } from '@/features/shop/product/queries';
import type { Product, VariantSelection } from '@/features/shop/product/schema';

export default function ProductDetails(): JSX.Element {
    const { props } = usePage<{ slug: string }>();
    const { data: response, isLoading } = useGetProduct(props.slug);

    if (isLoading) {
        return <p>Loading product...</p>;
    }

    if (!response) {
        return <></>;
    }

    return <ProductDetailsInner product={response.data} />;
}

function ProductDetailsInner({ product }: { product: Product }): JSX.Element {
    const lightbox = useLightbox();
    const { form, visibleImages, availableValueIds, selectedVariant } = useVariantSelection(product);

    function handleSubmit(values: VariantSelection) {
        console.log('values:', values);
        console.log('variant:', selectedVariant);
    }

    return (
        <div>
            <div className="flex gap-10">
                <div className="flex-1">
                    <ProductImageGallery
                        images={visibleImages}
                        lightbox={lightbox}
                    />
                </div>

                <div className="flex-1">
                    <h1>{product.name}</h1>
                    <ProductVariantForm
                        product={product}
                        form={form}
                        availableValueIds={availableValueIds}
                        selectedVariant={selectedVariant}
                        onSubmit={handleSubmit}
                    />
                </div>
            </div>
        </div>
    );
}
