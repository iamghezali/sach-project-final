import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import type { JSX } from 'react';
import { AppPagination, useAutoRedirectOutOfRange, usePageParam } from '@/components/app-pagination';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useListCustomOrders } from '@/features/dashboard/orders/custom-orders/queries';
import type { CustomOrder } from '@/features/dashboard/orders/custom-orders/schema';
import { cn } from '@/lib/utils';

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

    const orders = response.data;

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
                        <TableHead className="w-2/12">Title</TableHead>
                        <TableHead className="w-1/12 text-center">Order ID</TableHead>
                        <TableHead className="w-1/12 text-center">Customer</TableHead>
                        <TableHead className="w-2/12 text-center">Current Status</TableHead>
                        <TableHead className="w-1/12 text-center">Total</TableHead>
                        <TableHead className="w-1/12 text-center">Tailor</TableHead>
                        <TableHead className="w-1/12 text-center">Offer Due Date</TableHead>
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

function OrderRow({ order }: { order: CustomOrder }): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen((prev) => !prev);

    return (
        <TableBody>
            <TableRow
                tabIndex={0}
                role="button"
                aria-expanded={isOpen}
                onClick={toggleOpen}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleOpen();
                    }
                }}
                className={cn(
                    'cursor-pointer transition-colors hover:bg-brand-primary-100/40',
                    isOpen && 'bg-brand-primary-100/30',
                )}
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
                <TableCell className="text-center"> - </TableCell>
                <TableCell className="text-center">{order.user.name}</TableCell>
                <TableCell className="text-center">
                    <Badge>{order.status_label}</Badge>
                </TableCell>
                <TableCell className="text-center">{order.offer_total}</TableCell>
                <TableCell className="text-center">-</TableCell>
                <TableCell className="text-center">-</TableCell>
            </TableRow>

            {isOpen &&
                order.items.map((item) => (
                    <TableRow
                        key={item.id}
                        className="bg-muted/20"
                    >
                        <TableCell>{item.information.title}</TableCell>
                        <TableCell className="text-center">#SACH-{item.id}</TableCell>
                        <TableCell className="text-center">{order.user.name}</TableCell>
                        <TableCell className="text-center">
                            <Badge variant="outline">{item.status_label}</Badge>
                        </TableCell>
                        <TableCell className="text-center">{item.offer_price ?? '-'}</TableCell>
                        <TableCell className="text-center">{item.tailor?.name ?? '-'}</TableCell>
                        <TableCell className="text-center">{item.offer_due_date ?? '-'}</TableCell>
                    </TableRow>
                ))}
        </TableBody>
    );
}
