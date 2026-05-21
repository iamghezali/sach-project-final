import { router, usePage } from '@inertiajs/react';
import { useCallback, useMemo } from 'react';
import type { ShopFilters } from '@/features/shop/listing/api';

function parseMulti(searchParams: URLSearchParams, key: string): string[] | undefined {
    const raw = searchParams.get(key);

    if (!raw) {
        return undefined;
    }

    const values = raw.split(',').filter(Boolean);

    return values.length ? values : undefined;
}

export function useShopFilters() {
    const { url } = usePage();

    const { pathname, searchParams } = useMemo(() => {
        const parsed = new URL(url, window.location.origin);

        return { pathname: parsed.pathname, searchParams: parsed.searchParams };
    }, [url]);

    const filters = useMemo(
        (): ShopFilters => ({
            search: searchParams.get('search') ?? undefined,
            color: parseMulti(searchParams, 'color'),
            size: parseMulti(searchParams, 'size'),
            category: parseMulti(searchParams, 'category'),
        }),
        [searchParams],
    );

    const setFilters = useCallback(
        (partial: Partial<ShopFilters>) => {
            const current = Object.fromEntries(searchParams.entries());

            const serialized: Record<string, string> = {};

            if ('search' in partial) {
                serialized.search = partial.search ?? '';
            }

            if ('color' in partial) {
                serialized.color = partial.color?.join(',') ?? '';
            }

            if ('size' in partial) {
                serialized.size = partial.size?.join(',') ?? '';
            }

            if ('category' in partial) {
                serialized.category = partial.category?.join(',') ?? '';
            }

            const next: Record<string, string> = { ...current, ...serialized };

            const cleaned = Object.fromEntries(Object.entries(next).filter(([, v]) => v !== ''));

            router.get(
                pathname,
                { ...cleaned, page: 1 },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                },
            );
        },
        [pathname, searchParams],
    );

    const clearFilters = useCallback(() => {
        const current = Object.fromEntries(searchParams.entries());
        (['search', 'color', 'size', 'category'] as const).forEach((k) => delete current[k]);

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
