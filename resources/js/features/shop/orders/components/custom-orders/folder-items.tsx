import type { JSX } from 'react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import CustomOrderInteractions from '@/features/shop/orders/components/custom-orders/custom-order-interactions';
import { useGetCustomOrderFolder } from '@/features/shop/orders/queries';
import FolderOrderItem from '@/features/shop/orders/components/custom-orders/folder-order-item';

type FolderItemsProps = {
    orderID: number;
};

export default function FolderItems({ orderID }: FolderItemsProps): JSX.Element {
    const { data: response, isLoading } = useGetCustomOrderFolder(orderID);

    if (isLoading) {
        return <>Loading...</>;
    }

    if (!response?.data) {
        return <>Loading Error</>;
    }

    const order = response.data;

    return (
        <div className="space-y-6">
            <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-xl font-semibold">{order.title}</h1>
                </div>

                <Badge variant="secondary">{order.status_label}</Badge>
            </div>

            <Separator className="bg-neutral-300" />

            {order.status === 'offered' && <CustomOrderInteractions orderID={order.id} />}

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>#sach-{order.id}</TableCell>
                        <TableCell>{order.created_at}</TableCell>
                        <TableCell className="text-right font-medium">{order.offer_total} DZD</TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            <Separator />

            <div className="space-y-4">
                <h2 className="font-medium">
                    Items <span className="text-muted-foreground">({order.items.length})</span>
                </h2>

                {order.items.map((item) => (
                    <FolderOrderItem
                        key={item.id}
                        item={item}
                        orderID={orderID}
                    />
                ))}
            </div>
        </div>
    );
}
