import type { JSX } from 'react';
import ProductsGrid from '@/features/shop/listing/components/products-grid';
import ShopBanner from '@/features/shop/listing/components/shop-banner';
import ShopSidebar from '@/features/shop/listing/components/sidabar/shop-sidebar';
import ShopLayout from '@/layouts/shop-layout';

export default function Listing(): JSX.Element {
    return (
        <ShopLayout>
            <section>
                <div className="mt-16">
                    <ShopBanner />
                </div>
            </section>

            <section>
                <div className="mt-8">
                    <div>
                        <h1 className="text-4xl font-semibold text-brand-neutral-1000">Sach Collections</h1>
                        {/* <span className="text-brand-neutral-1000/80">122 Items</span> */}
                    </div>

                    <div className="mt-8 flex gap-5">
                        <div className="w-full shrink-0 basis-79">
                            <ShopSidebar />
                        </div>

                        <div className="min-w-0 grow">
                            <ProductsGrid />
                        </div>
                    </div>
                </div>
            </section>
        </ShopLayout>
    );
}
