import { Link } from '@inertiajs/react';
import type { JSX } from 'react';
import { Button } from '@/components/ui/button';
import { useListProducts } from '@/features/shop/listing/queries';
import { formatPrice } from '@/lib/format-price';

export default function ProductsGrid(): JSX.Element {
    const { data: response, isLoading } = useListProducts();

    if (isLoading) {
        return <p>Loading products...</p>;
    }

    if (!response) {
        return <></>;
    }

    const produdcts = response.data;

    return (
        <div>
            <ul className="grid grid-cols-2 gap-4">
                {produdcts.map((product, i) => (
                    <li key={i}>
                        <div className="w-full rounded-lg border p-6">
                            <img
                                src={product.thumbnail}
                                alt=""
                            />

                            <p>{product.name}</p>

                            <Button
                                className="mt-4 w-full"
                                asChild
                            >
                                <Link href={`/shop/product/${product.slug}`}>
                                    View Product - {formatPrice(product.starting_from)} DZD
                                </Link>
                            </Button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
