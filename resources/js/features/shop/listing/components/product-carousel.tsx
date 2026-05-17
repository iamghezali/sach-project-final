import type { JSX } from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselDots,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    CarouselViewport,
} from '@/components/ui/carousel';
import ProductCard from '@/features/shop/listing/components/product-card';
import { useProductsByCategory } from '@/features/shop/listing/queries';

type ProductCarouselProps = {
    categorySlug: string;
    title?: string;
    limit?: number;
};

export default function ProductCarousel({
    title = 'You may also like',
    categorySlug,
    limit = 8,
}: ProductCarouselProps): JSX.Element {
    const { data: response, isLoading } = useProductsByCategory(categorySlug, limit);

    if (isLoading) {
        return <>Loading..</>;
    }

    if (!response) {
        return <></>;
    }

    const products = response.data;

    return (
        <div className="py-8">
            <Carousel opts={{ align: 'start' }}>
                <div className="flex items-center justify-between">
                    <h2 className="text-5xl font-semibold text-brand-neutral-1000">{title}</h2>

                    <div className="flex gap-4">
                        <CarouselPrevious
                            className="size-10"
                            variant="brand-neutral"
                            size="icon"
                        />
                        <CarouselNext
                            className="size-10"
                            variant="brand-neutral"
                            size="icon"
                        />
                    </div>
                </div>

                <CarouselViewport className="mt-8">
                    <CarouselContent>
                        {products.map((product, i) => (
                            <CarouselItem
                                key={i}
                                className="basis-1/4"
                            >
                                <ProductCard
                                    name={product.name}
                                    price={product.starting_from}
                                    thumbnail={product.thumbnail}
                                    slug={product.slug}
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </CarouselViewport>

                <div className="mt-8 flex items-center justify-center gap-2">
                    <CarouselDots />
                </div>
            </Carousel>
        </div>
    );
}
