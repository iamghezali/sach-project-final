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
            <ul className="flex flex-col gap-4">
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
    );
}
