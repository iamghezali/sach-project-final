import type { JSX } from 'react';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useListCustomOrders } from '@/features/dashboard/orders/custom-orders/queries';

export default function OrdersTable(): JSX.Element {
    const { data: response, isLoading } = useListCustomOrders();

    if (isLoading) {
        return <>Loading...</>;
    }

    if (!response?.data) {
        return <>Loading Error</>;
    }

    const orders = response.data;

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created At</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {orders.length !== 0 ? (
                    orders.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell>{order.id}</TableCell>
                            <TableCell>{order.title}</TableCell>
                            <TableCell>{order.user.name}</TableCell>
                            <TableCell>{order.offer_total}</TableCell>
                            <TableCell>
                                <Badge>{order.status_label}</Badge>
                            </TableCell>
                            <TableCell>{order.created_at}</TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell
                            colSpan={4}
                            className="text-center text-muted-foreground"
                        >
                            No Records are found.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
