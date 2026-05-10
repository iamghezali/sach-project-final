import { usePage } from '@inertiajs/react';
import type { JSX } from 'react';
import ShopLayout from '@/layouts/shop-layout';

export default function Folder(): JSX.Element {
    const { id } = usePage<{ id: number }>().props;

    return <ShopLayout>Order Folder {id}</ShopLayout>;
}
