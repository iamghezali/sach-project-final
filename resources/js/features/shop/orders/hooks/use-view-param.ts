import { usePage } from '@inertiajs/react';

const VIEWS = ['all', 'orders', 'custom-orders'] as const;
export type OrdersView = (typeof VIEWS)[number];

function parseView(raw: string | null): OrdersView {
    return VIEWS.includes(raw as OrdersView) ? (raw as OrdersView) : 'all';
}

export function useViewParam(): OrdersView {
    const { url } = usePage();
    const search = url.includes('?') ? url.split('?')[1] : '';

    return parseView(new URLSearchParams(search).get('view'));
}
