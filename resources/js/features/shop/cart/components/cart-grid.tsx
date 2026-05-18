import type { JSX } from 'react';
import CartEmpty from '@/features/shop/cart/components/cart-empty';
import CartItem from '@/features/shop/cart/components/cart-item';
import { useCart } from '@/features/shop/cart/hooks/use-cart';

export default function CartGrid(): JSX.Element {
    const { cart, removeItem, isReady } = useCart();

    if (!isReady) {
        return <>Loading...</>;
    }

    if (cart.length === 0) {
        return <CartEmpty />;
    }

    return (
        <div>
            <div className="min-w-0 grow rounded-2xl bg-brand-shade-white p-6">
                <h2 className="text-[2rem]/tight leading-9.5 font-semibold text-brand-neutral-1000">Your Bag</h2>
                <span className="mt-2 inline-block leading-5.5 text-brand-neutral-1000/80">
                    Items in your bag not reserved check out now to make them yours.
                </span>

                <div className="mt-11">
                    <ul className="flex flex-col gap-10">
                        {cart.map((item) => (
                            <li key={item.variant?.id}>
                                <CartItem
                                    item={item}
                                    removeItem={removeItem}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
