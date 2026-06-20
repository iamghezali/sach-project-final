import { router } from '@inertiajs/react';
import type { JSX } from 'react';
import { AppPagination, useAutoRedirectOutOfRange, usePageParam } from '@/components/app-pagination';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useListOrders } from '@/features/dashboard/orders/ready-to-wear/queries';

export default function OrdersTable(): JSX.Element {
    const page = usePageParam();
    const { data: response, isLoading } = useListOrders(page);
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

    const orders = response.data;

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created At</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {orders.length !== 0 ? (
                        orders.map((order) => (
                            <TableRow
                                key={order.id}
                                className="cursor-pointer"
                                onClick={() => router.visit(`/dashboard/orders/${order.id}`)}
                            >
                                <TableCell>{order.id}</TableCell>
                                <TableCell>{order.customer.name}</TableCell>
                                <TableCell>{order.total}</TableCell>
                                <TableCell>
                                    <Badge>{order.status_label}</Badge>
                                </TableCell>
                                <TableCell>{order.createdAt}</TableCell>
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
