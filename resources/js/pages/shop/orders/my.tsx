import { Link } from '@inertiajs/react';
import { useState } from 'react';
import type { JSX } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CustomOrdersList from '@/features/shop/orders/components/custom-orders/custom-orders-list';
import CustomOrdersPreview from '@/features/shop/orders/components/custom-orders/custom-orders-preview';
import OrderSuccessMessage from '@/features/shop/orders/components/rtw-orders/order-success-message';
import OrdersList from '@/features/shop/orders/components/rtw-orders/orders-list';
import OrdersPreview from '@/features/shop/orders/components/rtw-orders/orders-preview';
import { useViewParam } from '@/features/shop/orders/hooks/use-view-param';
import { useSuccessMessage } from '@/hooks/use-success-message';
import ShopLayout from '@/layouts/shop-layout';

export default function My(): JSX.Element {
    const { getSuccessMessage } = useSuccessMessage();
    const [show] = useState(() => getSuccessMessage());
    const view = useViewParam();

    if (show) {
        return (
            <ShopLayout>
                <OrderSuccessMessage />
            </ShopLayout>
        );
    }

    return (
        <ShopLayout>
            <div className="mt-8">
                <Tabs value={view}>
                    <TabsList>
                        <TabsTrigger
                            value="all"
                            asChild
                        >
                            <Link href="/shop/orders/my">All</Link>
                        </TabsTrigger>
                        <TabsTrigger
                            value="orders"
                            asChild
                        >
                            <Link href="/shop/orders/my?view=orders&page=1">Orders</Link>
                        </TabsTrigger>
                        <TabsTrigger
                            value="custom-orders"
                            asChild
                        >
                            <Link href="/shop/orders/my?view=custom-orders&page=1">Custom Orders</Link>
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="all">
                        <div className="flex flex-col gap-8 pt-6">
                            <CustomOrdersPreview />
                            <OrdersPreview />
                        </div>
                    </TabsContent>

                    <TabsContent value="orders">
                        <div className="pt-6">
                            <OrdersList />
                        </div>
                    </TabsContent>

                    <TabsContent value="custom-orders">
                        <div className="pt-6">
                            <CustomOrdersList />
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </ShopLayout>
    );
}
