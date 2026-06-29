import { ChevronRight } from 'lucide-react';
import { Collapsible as CollapsiblePrimitive } from 'radix-ui';
import { useState } from 'react';
import type { JSX } from 'react';
import { AppPagination, useAutoRedirectOutOfRange, usePageParam } from '@/components/app-pagination';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useListCustomOrders } from '@/features/dashboard/orders/custom-orders/queries';
import { cn } from '@/lib/utils';

interface OrderItem {
    id: number;
    information: { title: string };
    status_label: string;
    offer_price?: string | null;
    tailor?: { name: string } | null;
    offer_due_date?: string | null;
}

interface Order {
    id: number;
    title: string;
    user: { name: string };
    status_label: string;
    offer_total: string;
    items: OrderItem[];
}

export default function OrdersTable(): JSX.Element {
    const page = usePageParam();
    const { data: response, isLoading } = useListCustomOrders(page);
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

    const orders = response.data as Order[];

    return (
        <>
            <Table
                className={cn(
                    '[&>tbody:not(:last-of-type)_tr:last-child>*]:border-b!',
                    '[&>tbody:not(:last-of-type)_tr:last-child>td:first-child]:rounded-none!',
                    '[&>tbody:not(:last-of-type)_tr:last-child>td:last-child]:rounded-none!',
                )}
            >
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Current Status</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Tailor</TableHead>
                        <TableHead>Offer Due Date</TableHead>
                    </TableRow>
                </TableHeader>

                {orders.length !== 0 ? (
                    orders.map((order) => (
                        <OrderRow
                            key={order.id}
                            order={order}
                        />
                    ))
                ) : (
                    <TableBody>
                        <TableRow>
                            <TableCell
                                colSpan={8}
                                className="text-center text-muted-foreground"
                            >
                                No Records are found.
                            </TableCell>
                        </TableRow>
                    </TableBody>
                )}
            </Table>

            <div className="mt-4">
                <AppPagination meta={response.meta} />
            </div>
        </>
    );
}

function OrderRow({ order }: { order: Order }): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <CollapsiblePrimitive.Root
            asChild
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            <TableBody>
                <CollapsiblePrimitive.Trigger asChild>
                    <TableRow
                        tabIndex={0}
                        role="button"
                        aria-expanded={isOpen}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                setIsOpen((prev) => !prev);
                            }
                        }}
                        className={cn('cursor-pointer transition-colors', isOpen && 'bg-brand-primary-100/30')}
                    >
                        <TableCell>
                            <span className="flex items-center justify-between gap-2">
                                <span>{order.title}</span>
                                <ChevronRight
                                    className={cn(
                                        'size-4 shrink-0 text-muted-foreground transition-transform duration-200',
                                        isOpen && 'rotate-90',
                                    )}
                                />
                            </span>
                        </TableCell>
                        <TableCell>{order.id}</TableCell>
                        <TableCell>{order.user.name}</TableCell>
                        <TableCell>
                            <Badge>{order.status_label}</Badge>
                        </TableCell>
                        <TableCell>{order.offer_total}</TableCell>
                        <TableCell>-</TableCell>
                        <TableCell>-</TableCell>
                    </TableRow>
                </CollapsiblePrimitive.Trigger>

                {isOpen &&
                    order.items.map((item) => (
                        <TableRow
                            key={item.id}
                            className="bg-muted/20"
                        >
                            <TableCell className="pl-8">{item.information.title}</TableCell>
                            <TableCell>#SACH-{item.id}</TableCell>
                            <TableCell>{order.user.name}</TableCell>
                            <TableCell>
                                <Badge variant="outline">{item.status_label}</Badge>
                            </TableCell>
                            <TableCell>{item.offer_price ?? '-'}</TableCell>
                            <TableCell>{item.tailor?.name ?? '-'}</TableCell>
                            <TableCell>{item.offer_due_date ?? '-'}</TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </CollapsiblePrimitive.Root>
    );
}
