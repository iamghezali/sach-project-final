import type { JSX } from 'react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { OrderItem } from '@/features/tailor/orders/components/order-item';
import { useOrderFolder } from '@/features/tailor/orders/queries';

type FolderItemsProps = {
    orderID: number;
};
export default function FolderItems({ orderID }: FolderItemsProps): JSX.Element {
    const { data: response, isLoading } = useOrderFolder(orderID);

    if (isLoading) {
        return <>Loading...</>;
    }

    if (!response?.data) {
        return <>Loading Error</>;
    }

    const order = response.data;

    return (
        <>
            <div className="space-y-6">
                <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                        <h1 className="text-xl font-semibold">{order.title}</h1>
                    </div>
                    <Badge>{order.status_label}</Badge>
                </div>

                <Separator />

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead>Updated</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>#{order.id}</TableCell>
                            <TableCell>{order.created_at}</TableCell>
                            <TableCell>{order.updated_at}</TableCell>
                            <TableCell className="text-right font-medium">{order.offer_total}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                <Separator />

                <div className="space-y-4">
                    <h2 className="font-medium">
                        Items <span className="text-muted-foreground">({order.items.length})</span>
                    </h2>

                    {order.items.map((item) => (
                        <OrderItem
                            key={item.id}
                            item={item}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
