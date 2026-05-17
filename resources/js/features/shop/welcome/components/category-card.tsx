import { Link } from '@inertiajs/react';
import { ArrowUpRightIcon } from 'lucide-react';
import type { JSX } from 'react';
import Image from '@/components/image';
import { Button } from '@/components/ui/button';

type CategoryCardProps = {
    title?: string;
    categorySlug: string;
    url?: string;
};

export default function CategoryCard({ title = 'Category title', url, categorySlug }: CategoryCardProps): JSX.Element {
    return (
        <div className="w-full shrink basis-full">
            <div className="rounded-[3.5rem] bg-brand-shade-white p-3">
                <div className="relative z-0 overflow-hidden rounded-3xl">
                    <Link href={`/shop/?category=${categorySlug ?? ''}`}>
                        <div className="relative z-10 w-full overflow-hidden rounded-[3rem] bg-neutral-100 pt-[92.58%]">
                            <Image
                                src={url ?? ''}
                                className="absolute inset-0 size-full object-cover"
                            />
                        </div>
                    </Link>

                    <div className="category-gradient pointer-events-none absolute inset-0 top-0 z-10 flex px-7.5 py-4">
                        <div className="z-20 mt-auto flex w-full items-end">
                            <h3 className="w-64 text-4xl font-semibold text-brand-neutral-1000 capitalize">{title}</h3>

                            <Button
                                className="pointer-events-auto ml-auto size-12"
                                variant="brand-neutral"
                                size="icon"
                                asChild
                            >
                                <Link href={`/shop/?category=${categorySlug ?? ''}`}>
                                    <ArrowUpRightIcon
                                        className="size-8"
                                        strokeWidth={1}
                                    />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
