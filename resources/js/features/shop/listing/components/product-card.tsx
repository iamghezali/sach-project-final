import { Link } from '@inertiajs/react';
import type { JSX } from 'react';
import Image from '@/components/image';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/format-price';

interface Props {
    badge?: string;
    thumbnail: string | null;
    price: string | number;
    name: string;
    slug: string;
}

export default function ProductCard({ badge, name, thumbnail, price, slug }: Props): JSX.Element {
    return (
        <div className="basis-full">
            <div className="rounded-4xl bg-brand-shade-white p-2">
                <div className="relative overflow-hidden rounded-3xl bg-brand-neutral-100 pt-[127.15%]">
                    <Link href={`/shop/product/${slug}`}>
                        <Image
                            src={thumbnail ?? undefined}
                            className="absolute inset-0 z-10 size-full object-cover"
                        />
                    </Link>

                    <div className="absolute inset-0 size-full">
                        {badge && (
                            <span className="inline-block rounded-tl-3xl rounded-br-3xl bg-brand-secondary-300 px-4 py-3 text-xs/tight font-medium text-white capitalize">
                                {badge}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <span className="mt-4 block min-h-14 text-2xl/tight font-semibold text-brand-neutral-1000">{name}</span>

            <Button
                className="mt-4 w-full uppercase"
                variant="brand-neutral"
                size="brand-lg"
                asChild
            >
                <Link href={`/shop/product/${slug}`}>View Product - {formatPrice(price)} DZD</Link>
            </Button>
        </div>
    );
}

export function ProductCardSkeleton(): JSX.Element {
    return (
        <div className="basis-full animate-pulse">
            <div className="rounded-4xl bg-brand-shade-white p-2">
                <div className="relative overflow-hidden rounded-3xl bg-brand-neutral-200 pt-[127.15%]"></div>
            </div>

            <div className="mt-4 flex min-h-14 flex-col justify-start">
                <div className="h-6 w-3/4 rounded bg-brand-neutral-200" />
                <div className="mt-2 h-6 w-1/2 rounded bg-brand-neutral-200" />
            </div>

            <div className="mt-4 h-12 w-full rounded-xl bg-brand-neutral-200" />
        </div>
    );
}
