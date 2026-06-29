import { router } from '@inertiajs/react';
import { ExternalLinkIcon } from 'lucide-react';
import type { JSX } from 'react';
import { AppPagination, useAutoRedirectOutOfRange, usePageParam } from '@/components/app-pagination';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
                        <TableHead className="1/12 text-center">Order ID</TableHead>
                        <TableHead className="1/12 text-center">Customer</TableHead>
                        <TableHead className="1/12 text-center">Items</TableHead>
                        <TableHead className="1/12 text-center">Total</TableHead>
                        <TableHead className="1/12 text-center">Payment</TableHead>
                        <TableHead className="1/12 text-center">Delivery</TableHead>
                        <TableHead className="2/12 text-center">Status</TableHead>
                        <TableHead className="1/12 text-center">Date</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {orders.length !== 0 ? (
                        orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell className="px-2 py-0">
                                    <Button
                                        variant="ghost"
                                        onClick={() => router.visit(`/dashboard/orders/${order.id}`)}
                                        className="h-10 w-full justify-between px-2 text-sm font-normal"
                                    >
                                        <span>#SACH-{order.id}</span>
                                        <ExternalLinkIcon className="size-4" />
                                    </Button>
                                </TableCell>
                                <TableCell className="text-center">{order.customer.name}</TableCell>
                                <TableCell className="text-center">items</TableCell>
                                <TableCell className="text-center">{order.total}</TableCell>
                                <TableCell className="text-center">COD</TableCell>
                                <TableCell className="text-center">Yalidine</TableCell>
                                <TableCell className="text-center">
                                    <Badge variant="brand-pending">{order.status_label}</Badge>
                                </TableCell>
                                <TableCell className="text-center">{order.createdAt}</TableCell>
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
