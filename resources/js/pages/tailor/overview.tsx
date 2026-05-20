import type { JSX } from 'react';
import { Separator } from '@/components/ui/separator';
import OrdersList from '@/features/tailor/orders/components/orders-list';
import TailorStats from '@/features/tailor/stats/components/tailor-stats';
import ShopLayout from '@/layouts/shop-layout';

export default function Overview(): JSX.Element {
    return (
        <ShopLayout>
            <section>
                <div className="mt-9">
                    <TailorStats />
                </div>
            </section>

            <Separator className="seperator-gradient my-6" />
            <OrdersList />
        </ShopLayout>
    );
}
