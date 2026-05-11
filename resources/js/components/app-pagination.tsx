import { router, usePage } from '@inertiajs/react';
import { useCallback, useEffect, useMemo } from 'react';

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

interface PaginationMeta {
    current_page: number;
    last_page: number;
}

interface AppPaginationProps {
    meta: PaginationMeta;
}

interface PaginationOptions {
    key?: string;
    scrollToTop?: boolean;
}

function generatePageRange(currentPage: number, lastPage: number): (number | 'ellipsis')[] {
    if (lastPage <= 5) {
        return Array.from({ length: lastPage }, (_, i) => i + 1);
    }

    const windowStart = Math.max(2, currentPage - 1);
    const windowEnd = Math.min(lastPage - 1, currentPage + 1);

    const items: (number | 'ellipsis')[] = [1];

    if (windowStart > 2) {
        items.push('ellipsis');
    }

    for (let i = windowStart; i <= windowEnd; i++) {
        items.push(i);
    }

    if (windowEnd < lastPage - 1) {
        items.push('ellipsis');
    }

    items.push(lastPage);

    return items;
}

export function usePageParam(key = 'page'): number {
    const { url } = usePage();

    return useMemo(() => {
        const { searchParams } = new URL(url, window.location.origin);
        const val = Number(searchParams.get(key));

        return isNaN(val) || val < 1 ? 1 : val;
    }, [url, key]);
}

function usePagination({ key = 'page', scrollToTop = true }: PaginationOptions = {}) {
    const { url } = usePage();

    const { pathname, searchParams } = useMemo(() => {
        const parsed = new URL(url, window.location.origin);

        return { pathname: parsed.pathname, searchParams: parsed.searchParams };
    }, [url]);

    const page = useMemo(() => {
        const val = Number(searchParams.get(key));

        return isNaN(val) || val < 1 ? 1 : val;
    }, [searchParams, key]);

    useEffect(() => {
        if (!searchParams.has(key)) {
            const currentParams = Object.fromEntries(searchParams.entries());
            router.get(pathname, { ...currentParams, [key]: 1 }, { preserveState: true, replace: true });
        }
    }, [pathname, searchParams, key]);

    const setPage = useCallback(
        (newPage: number) => {
            const currentParams = Object.fromEntries(searchParams.entries());
            router.get(
                pathname,
                { ...currentParams, [key]: newPage },
                {
                    preserveState: true,
                    preserveScroll: true,
                    onSuccess: () => {
                        if (scrollToTop) {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                    },
                },
            );
        },
        [pathname, searchParams, key, scrollToTop],
    );

    return { page, setPage };
}

export function AppPagination({ meta }: AppPaginationProps) {
    const { page: currentPage, setPage } = usePagination();
    const lastPage = meta.last_page;

    const isSinglePage = lastPage <= 1;
    const pages = isSinglePage ? [1] : generatePageRange(currentPage, lastPage);
    const isFirst = isSinglePage || currentPage === 1;
    const isLast = isSinglePage || currentPage === lastPage;

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => !isFirst && setPage(currentPage - 1)}
                        aria-disabled={isFirst}
                        className={isFirst ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                </PaginationItem>

                {pages.map((page, i) =>
                    page === 'ellipsis' ? (
                        <PaginationItem key={`ellipsis-${i}`}>
                            <PaginationEllipsis />
                        </PaginationItem>
                    ) : (
                        <PaginationItem key={page}>
                            <PaginationLink
                                isActive={page === currentPage}
                                onClick={() => !isSinglePage && setPage(page)}
                                className={isSinglePage ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    ),
                )}

                <PaginationItem>
                    <PaginationNext
                        onClick={() => !isLast && setPage(currentPage + 1)}
                        aria-disabled={isLast}
                        className={isLast ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
