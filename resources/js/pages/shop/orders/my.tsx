import { useState } from 'react';
import type { JSX } from 'react';
import OrderSuccessMessage from '@/features/shop/orders/components/rtw-orders/order-success-message';
import OrdersList from '@/features/shop/orders/components/rtw-orders/orders-list';
import { useSuccessMessage } from '@/hooks/use-success-message';
import ShopLayout from '@/layouts/shop-layout';

export default function My(): JSX.Element {
    const { getSuccessMessage } = useSuccessMessage();
    const [show] = useState(() => getSuccessMessage());

    return (
        <ShopLayout>
            {show ? (
                <OrderSuccessMessage />
            ) : (
                <>
                    <OrdersList />
                </>
            )}
        </ShopLayout>
    );
}
