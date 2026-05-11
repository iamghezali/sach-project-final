import { router, usePage } from '@inertiajs/react';
import { useEffect } from 'react';

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

interface AppPaginationProps {
    currentPage: number;
    lastPage: number;
    onPageChange: (page: number) => void;
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

export function AppPagination({ currentPage, lastPage, onPageChange }: AppPaginationProps) {
    const isSinglePage = lastPage <= 1;
    const pages = isSinglePage ? [1] : generatePageRange(currentPage, lastPage);
    const isFirst = isSinglePage || currentPage === 1;
    const isLast = isSinglePage || currentPage === lastPage;

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => !isFirst && onPageChange(currentPage - 1)}
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
                                onClick={() => !isSinglePage && onPageChange(page)}
                                className={isSinglePage ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    ),
                )}

                <PaginationItem>
                    <PaginationNext
                        onClick={() => !isLast && onPageChange(currentPage + 1)}
                        aria-disabled={isLast}
                        className={isLast ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}

export function usePagination(basePath: string) {
    const { url } = usePage();
    const searchParams = new URL(url, window.location.origin).searchParams;
    const page = Number(searchParams.get('page') ?? 1);

    useEffect(() => {
        if (!searchParams.has('page')) {
            router.get(basePath, { page: 1 }, { replace: true });
        }
    }, [basePath, searchParams]);

    function setPage(newPage: number) {
        router.get(
            basePath,
            { page: newPage },
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
            },
        );
    }

    return { page, setPage };
}
