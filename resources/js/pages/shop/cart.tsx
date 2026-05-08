import type { JSX } from 'react';
import CartGrid from '@/features/shop/cart/components/cart-grid';
import CartSummary from '@/features/shop/cart/components/cart-summary';
import ShopLayout from '@/layouts/shop-layout';

export default function Cart(): JSX.Element {
    return (
        <ShopLayout>
            <div className="flex gap-5">
                <div className="flex-1">
                    <CartGrid />
                </div>

                <div className="basis-sm">
                    <CartSummary />
                </div>
            </div>
        </ShopLayout>
    );
}
