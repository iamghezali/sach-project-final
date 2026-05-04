import { Link } from '@inertiajs/react';
import type { JSX } from 'react';
import TextReveal from '@/components/text-reveal';
import { Button } from '@/components/ui/button';
import ShopLayout from '@/layouts/shop-layout';

export default function Welcome(): JSX.Element {
    return (
        <ShopLayout>
            <section>
                <div className="hero-gradient mt-14 rounded-4xl px-4 py-19.25 lg:rounded-[4rem] lg:py-53">
                    <div className="flex flex-col items-center">
                        <h1 className="max-w-[14ch] text-center text-[2.375rem] font-bold lg:max-w-4xl lg:text-7xl/tight lg:font-semibold">
                            Tailoring Your Style, Perfecting Your Space
                        </h1>

                        <p className="mt-3 max-w-5xl text-center text-base/tight text-pretty text-brand-neutral-alt-700 lg:text-2xl">
                            From custom clothing to living room salons, SASH brings your ideas to life with a fully
                            managed, hassle-free experience — from request to delivery.
                        </p>
                    </div>

                    <div className="mt-6 flex flex-col items-center justify-center gap-4 lg:flex-row lg:gap-6">
                        <Button
                            className="w-62 text-white uppercase"
                            variant="brand-primary"
                            size="brand-lg"
                            asChild
                        >
                            <Link>Create A Custom Order</Link>
                        </Button>

                        <Button
                            className="w-62 uppercase"
                            variant="brand-outline"
                            size="brand-lg"
                            asChild
                        >
                            <Link>Shop Ready-to-Wear</Link>
                        </Button>
                    </div>
                </div>
            </section>

            <section>
                <div className="mt-20 flex gap-8">
                    <div className="sticky top-20 size-72.5 shrink-0 overflow-hidden rounded-xl bg-neutral-300"></div>

                    <TextReveal className="text-6xl/tight font-medium capitalize">
                        SASH offers a smarter way to create custom clothing and living room salons without the hassle.
                        Upload your ideas, choose your preferences, and let our team take care of the rest — from
                        pricing and production to quality checks and delivery. Designed for individuals, families, and
                        institutions, SASH combines craftsmanship with convenience to deliver results you can trust.
                    </TextReveal>
                </div>
            </section>
        </ShopLayout>
    );
}
