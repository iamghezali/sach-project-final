import { router } from '@inertiajs/react';
import type { JSX } from 'react';
import { AppPagination, useAutoRedirectOutOfRange, usePageParam } from '@/components/app-pagination';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useProductsList } from '@/features/dashboard/store/products/queries';

export default function ProductsTable(): JSX.Element {
    const page = usePageParam();
    const { data: response, isLoading } = useProductsList(page);
    const isOutOfRange = useAutoRedirectOutOfRange({
        meta: !isLoading ? response?.meta : undefined,
        currentPage: page,
    });

    if (isLoading || isOutOfRange) {
        return <>Loading...</>;
    }

    if (!response?.data) {
        return <>Loading Error</>;
    }

    const productsList = response.data;

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Availabilty</TableHead>
                        <TableHead>Starting from</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Category</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {productsList.length !== 0 ? (
                        productsList.map((product) => (
                            <TableRow
                                key={product.id}
                                className="cursor-pointer"
                                onClick={() => router.visit(`/dashboard/store/products/${product.id}`)}
                            >
                                <TableCell>{product.id}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-6">
                                        {product.thumbnail && (
                                            <div className="aspect-65/92 w-20 overflow-hidden rounded-lg">
                                                <img
                                                    className="size-full object-cover"
                                                    src={product.thumbnail}
                                                    alt=""
                                                />
                                            </div>
                                        )}
                                        <span className="text-base font-medium">{product.name}</span>
                                    </div>
                                </TableCell>

                                <TableCell>
                                    <Badge variant={product.is_available ? 'secondary' : 'destructive'}>
                                        {product.is_available ? 'Available' : 'Not Available'}
                                    </Badge>
                                </TableCell>

                                <TableCell>
                                    {parseFloat(product.starting_from) > 0 ? (
                                        <>{product.starting_from} DZD</>
                                    ) : (
                                        <span className="text-muted-foreground">NOT SET</span>
                                    )}
                                </TableCell>

                                <TableCell>
                                    <Badge>{product.status_label}</Badge>
                                </TableCell>

                                <TableCell>
                                    {product?.categories[0]?.name ? product?.categories[0]?.name : 'Not Assigned'}
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={5}
                                className="text-center text-muted-foreground"
                            >
                                No Records are found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <div className="mt-4">
                <AppPagination meta={response.meta} />
            </div>
        </>
    );
}
