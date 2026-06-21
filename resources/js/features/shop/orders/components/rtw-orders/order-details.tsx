import { Link, usePage } from '@inertiajs/react';
import { ArrowLeftIcon, HeadsetIcon } from 'lucide-react';
import type { JSX } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useGetOrder } from '@/features/shop/orders/queries';
import { formatPrice } from '@/lib/format-price';

export default function OrderDetails(): JSX.Element {
    const { id } = usePage<{ id: string }>().props;
    const orderID = Number(id);

    const { data: response, isLoading } = useGetOrder(orderID);

    if (isLoading) {
        return <p>Loading order...</p>;
    }

    if (!response) {
        return <></>;
    }

    const order = response.data;

    return (
        <div className="flex flex-col gap-8">
            <div>
                <div className="flex items-baseline justify-between">
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            asChild
                        >
                            <Link href={`/shop/orders/my/?view=orders`}>
                                <ArrowLeftIcon />
                            </Link>
                        </Button>

                        <div>
                            <span className="text-brand-neutral-alt-700">Order ID: </span>
                            <span>#SASH-{order.id}</span>
                        </div>
                    </div>

                    <div>
                        <Badge className="hover:text- h-10 min-w-40 rounded-xl border border-brand-secondary-400 bg-brand-secondary-200 px-6 font-normal text-neutral-900">
                            Ready-to-Wear
                        </Badge>
                    </div>
                </div>

                <h1 className="text-[4.25rem] leading-25.5 font-bold">Order Sach</h1>

                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-brand-neutral-alt-700">Updated On: </span>
                        <span>{order.updated_at}</span>
                    </div>

                    <div>
                        <Badge className="hover:text- h-10 min-w-40 rounded-xl border border-[#D1CC98] bg-[#FFF9D9] px-6 font-normal text-neutral-900">
                            {order.status_label}
                        </Badge>
                    </div>
                </div>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Variant</TableHead>
                        <TableHead>Unit Price</TableHead>
                        <TableHead>Quantity</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {order.items.length !== 0 ? (
                        order.items.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.productName}</TableCell>
                                <TableCell>{item.variantName}</TableCell>
                                <TableCell>{item.unitPrice}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
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

            <div className="flex flex-col gap-4 text-right text-xl leading-none">
                <div>
                    <span className="text-brand-neutral-alt-600">Items Subtotal: </span>
                    <span className="inline-block min-w-40 font-medium">{formatPrice(order.total)} DZD</span>
                </div>

                <div>
                    <span className="text-brand-neutral-alt-600">Delivery Fee: </span>
                    <span className="inline-block min-w-40 font-medium">{formatPrice(800)} DZD</span>
                </div>

                <div>
                    <span className="text-brand-neutral-alt-600">Total Amount: </span>
                    <span className="inline-block min-w-40 font-medium">
                        {formatPrice(parseFloat(order.total) + 800)} DZD
                    </span>
                </div>

                <div>
                    <span className="text-brand-neutral-alt-600">Chosen Payement Method: </span>
                    <span className="inline-block min-w-40 font-medium">Cash On Delivery</span>
                </div>
            </div>

            <div className="flex flex-col gap-4 text-xl leading-none">
                <div>
                    <span className="text-brand-neutral-alt-600">Full Name: </span>
                    <span className="inline-block font-medium">{order.shippingAddress.fullName}</span>
                </div>

                <div>
                    <span className="text-brand-neutral-alt-600">Address: </span>
                    <span className="inline-block font-medium">
                        {order.shippingAddress.addressLine1}, {order.shippingAddress.postalCode},{' '}
                        <span className="capitalize">{order.shippingAddress.willaya}</span>
                    </span>
                </div>

                <div>
                    <span className="text-brand-neutral-alt-600">Willaya: </span>
                    <span className="inline-block font-medium capitalize">{order.shippingAddress.willaya}</span>
                </div>

                <div>
                    <span className="text-brand-neutral-alt-600">Phone: </span>
                    <span className="inline-block font-medium">{order.shippingAddress.phone}</span>
                </div>

                <div>
                    <span className="text-brand-neutral-alt-600">Delivery Methode: </span>
                    <span className="inline-block font-medium">Yalidine Express</span>
                </div>

                <div>
                    <span className="text-brand-neutral-alt-600">Estimated Delivery Time: </span>
                    <span className="inline-block font-medium">in 3 Days</span>
                </div>
            </div>

            <div className="flex justify-end">
                <Button
                    className="font-normal"
                    variant="brand-outline"
                    size="brand-md"
                    asChild
                >
                    <Link href="/contact">
                        Contact Support
                        <HeadsetIcon />
                    </Link>
                </Button>
            </div>
        </div>
    );
}
