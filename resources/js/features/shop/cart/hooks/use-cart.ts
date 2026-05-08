import { useMemo } from 'react';
import type { Attribute, Product, ProductVariant } from '@/features/shop/product/schema';
import { useLocalStorage } from '@/hooks/use-local-storage/use-local-storage';

export type CartItem = {
    product: Product;
    variant: ProductVariant | undefined | null;
    quantity: number;
};

export function useCart() {
    const { value: cart, setValue: setCart, isHydrated: isReady } = useLocalStorage<CartItem[]>('cart_items', []);

    function addOrUpdateCartItem(item: CartItem) {
        if (!item.variant) {
            return;
        }

        if (!item.variant.is_in_stock) {
            return;
        }

        setCart((prevCart) => {
            const exists = prevCart.some((ci) => ci.variant?.id === item.variant?.id);
            let next: CartItem[];

            if (!exists) {
                // Only add if quantity > 0
                next = item.quantity > 0 ? [...prevCart, item] : prevCart;
            } else {
                // Update quantity or remove if 0
                next = prevCart
                    .map((ci) =>
                        ci.variant?.id === item.variant?.id && ci.quantity !== item.quantity
                            ? { ...ci, quantity: item.quantity }
                            : ci,
                    )
                    .filter((ci) => ci.quantity > 0); // remove items with quantity 0
            }

            return next;
        });
    }

    // remove item by variant id
    function removeItem(variantId: number) {
        setCart((prev) => prev.filter((ci) => ci.variant?.id !== variantId));
    }

    //   clear entire cart
    function clearCart() {
        setCart([]);
    }

    const subtotal = useMemo(() => {
        return cart.reduce((total, item) => {
            return total + parseFloat(item.variant?.price ?? '0') * item.quantity;
        }, 0);
    }, [cart]);

    function updateQuantity(variantId: number, quantity: number) {
        setCart((prev) =>
            prev
                .map((item) => (item.variant?.id === variantId ? { ...item, quantity } : item))
                .filter((item) => item.quantity > 0),
        );
    }

    return { cart, subtotal, addOrUpdateCartItem, removeItem, clearCart, updateQuantity, isReady };
}

export function getAttributeValue(attributes: Attribute[], valueId: number) {
    for (const attribute of attributes) {
        const found = attribute.values.find((v) => v.id === valueId);

        if (found) {
            return {
                attribute_name: attribute.name,
                attribute_value: found.value,
            };
        }
    }
}
