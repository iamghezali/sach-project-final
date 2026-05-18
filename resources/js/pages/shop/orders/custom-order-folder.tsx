import { usePage } from '@inertiajs/react';
import type { JSX } from 'react';
import FolderItems from '@/features/shop/orders/components/custom-orders/folder-items';
import ShopLayout from '@/layouts/shop-layout';

export default function CustomOrderFolder(): JSX.Element {
    const { id } = usePage<{ id: string }>().props;
    const orderID = Number(id);

    return (
        <ShopLayout>
            <section>
                <div className="mt-6">
                    <FolderItems orderID={orderID} />
                </div>
            </section>
        </ShopLayout>
    );
}
