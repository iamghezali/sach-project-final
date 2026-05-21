import { router, usePage } from '@inertiajs/react';
import { useCallback, useMemo } from 'react';
import type { ShopFilters } from '@/features/shop/listing/api';

const FILTER_KEYS = ['search', 'color', 'size', 'category'] as const satisfies ReadonlyArray<keyof ShopFilters>;

export function useShopFilters() {
    const { url } = usePage();

    const { pathname, searchParams } = useMemo(() => {
        const parsed = new URL(url, window.location.origin);

        return { pathname: parsed.pathname, searchParams: parsed.searchParams };
    }, [url]);

    const filters = useMemo(
        (): ShopFilters => ({
            search: searchParams.get('search') ?? undefined,
            color: searchParams.get('color') ?? undefined,
            size: searchParams.get('size') ?? undefined,
            category: searchParams.get('category') ?? undefined,
        }),
        [searchParams],
    );

    const setFilters = useCallback(
        (partial: Partial<ShopFilters>) => {
            const next = {
                ...Object.fromEntries(searchParams.entries()),
                ...partial,
                page: 1,
            };

            // Drop keys with empty / undefined values so the URL stays clean
            const cleaned = Object.fromEntries(Object.entries(next).filter(([, v]) => v !== '' && v != null));

            router.get(pathname, cleaned, {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            });
        },
        [pathname, searchParams],
    );

    const clearFilters = useCallback(() => {
        const current = Object.fromEntries(searchParams.entries());

        FILTER_KEYS.forEach((key) => delete current[key]);

        router.get(
            pathname,
            { ...current, page: 1 },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    }, [pathname, searchParams]);

    return { filters, setFilters, clearFilters };
}
