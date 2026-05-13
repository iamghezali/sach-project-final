import type { JSX } from 'react';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import UpdateOrderStatus from '@/features/dashboard/orders/ready-to-wear/components/update-order-status';
import { useOrderDetails } from '@/features/dashboard/orders/ready-to-wear/queries';
import type { Address } from '@/features/dashboard/orders/ready-to-wear/schema';
import { formatPrice } from '@/lib/format-price';

type OrderInformationProps = {
    orderID: number;
};

export default function OrderInformation({ orderID }: OrderInformationProps): JSX.Element {
    const { data: response, isLoading } = useOrderDetails(orderID);

    if (isLoading) {
        return <>Loading...</>;
    }

    if (!response?.data) {
        return <>Loading Error</>;
    }

    const order = response.data;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold">Order #{order.id}</h2>
                    <p className="text-sm text-muted-foreground">{order.createdAt}</p>
                </div>
                <UpdateOrderStatus orderID={order.id} />
            </div>

            {/* Customer */}
            <Section title="Customer">
                <p>{order.customer.name}</p>
                <p className="text-muted-foreground">{order.customer.email}</p>
            </Section>

            {/* Addresses */}
            <div className="grid grid-cols-2 gap-4">
                <Section title="Shipping Address">
                    <AddressBlock address={order.shippingAddress} />
                </Section>
                <Section title="Billing Address">
                    <AddressBlock address={order.billingAddress} />
                </Section>
            </div>

            {/* Items */}
            <Section title="Items">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead>SKU</TableHead>
                            <TableHead>Qty</TableHead>
                            <TableHead>Unit Price</TableHead>
                            <TableHead className="text-right">Subtotal</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {order.items.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>
                                    <p className="font-medium">{item.productName}</p>
                                    <p className="text-xs text-muted-foreground">{item.variantName}</p>
                                </TableCell>
                                <TableCell className="text-muted-foreground">{item.sku}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>{formatPrice(item.unitPrice)}</TableCell>
                                <TableCell className="text-right">{formatPrice(item.subtotal)} DZD</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Separator className="my-3" />
                <p className="text-right text-sm font-semibold">Total: {formatPrice(order.total)} DZD</p>
            </Section>

            {/* Notes */}
            {order.notes && (
                <Section title="Notes">
                    <p className="text-muted-foreground">{order.notes}</p>
                </Section>
            )}
        </div>
    );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="rounded-lg border bg-card text-card-foreground">
            <div className="border-b px-6 py-4 text-sm font-semibold">{title}</div>
            <div className="space-y-1 px-6 py-4 text-sm">{children}</div>
        </div>
    );
}

function AddressBlock({ address }: { address: Address }) {
    return (
        <>
            <p className="font-medium">{address.fullName}</p>
            <p className="text-muted-foreground">{address.addressLine1}</p>
            {address.addressLine2 && <p className="text-muted-foreground">{address.addressLine2}</p>}
            <p className="text-muted-foreground">
                {address.willaya}, {address.postalCode}
            </p>
            <p className="text-muted-foreground">{address.country}</p>
            <p className="text-muted-foreground">{address.phone}</p>
        </>
    );
}
