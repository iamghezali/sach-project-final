import { useProductDetails } from '@/features/dashboard/store/products/queries';
import ProductImageCard from '@/features/dashboard/store/products/components/details/product-image-card';

interface ProductImageGalleryProps {
    productId: number;
}

export default function ProductImageGallery({ productId }: ProductImageGalleryProps) {
    const { data: response, isLoading } = useProductDetails(productId);

    if (isLoading || !response?.data) {
        return (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className="aspect-square animate-pulse rounded-lg bg-muted"
                    />
                ))}
            </div>
        );
    }

    const { images, attributes } = response.data;

    if (images.length === 0) {
        return (
            <div className="flex h-32 flex-col items-center justify-center rounded-lg border border-dashed border-muted-foreground/25">
                <p className="text-sm text-muted-foreground">No images uploaded yet.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {images.map((image) => (
                <ProductImageCard
                    key={image.uuid}
                    productId={productId}
                    image={image}
                    attributes={attributes}
                />
            ))}
        </div>
    );
}
