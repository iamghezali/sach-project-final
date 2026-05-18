import type { JSX } from 'react';
import CartGrid from '@/features/shop/cart/components/cart-grid';
import CartSummary from '@/features/shop/cart/components/cart-summary';
import ShopLayout from '@/layouts/shop-layout';

export default function Cart(): JSX.Element {
    return (
        <ShopLayout>
            <section>
                <div className="mt-7">
                    <div>
                        <h1 className="text-[2rem]/tight font-semibold text-brand-neutral-1000">Cart</h1>
                    </div>

                    <div className="mt-8 flex items-start gap-24">
                        <div className="flex-1">
                            <CartGrid />
                        </div>

                        <CartSummary />
                    </div>
                </div>
            </section>
        </ShopLayout>
    );
}
