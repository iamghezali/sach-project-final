import { usePage } from '@inertiajs/react';
import type { JSX } from 'react';
import { useGetOrder } from '@/features/shop/orders/queries';

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
        <div>
            <h1>Order Details</h1>

            <ul>
                <li>Order ID: {order.id}</li>
                <li>Create at: {order.createdAt}</li>
                <li>Total: {order.total} DZD</li>
                <li>Message: {order.notes}</li>
                <li>
                    <div>
                        {order.items.map((orderItem) => (
                            <div
                                key={orderItem.id}
                                className="border border-black p-4"
                            >
                                <div>{orderItem.productName}</div>
                                <div>{orderItem.variantName}</div>
                                <div>{orderItem.unitPrice} DZD</div>
                                <div>Quantity: {orderItem.quantity}</div>
                            </div>
                        ))}
                    </div>
                </li>

                <li>
                    <ul>
                        <li>{order.shippingAddress.fullName}</li>
                        <li>{order.shippingAddress.addressLine1}</li>
                        {order.shippingAddress.addressLine2 && <li>{order.shippingAddress.addressLine2}</li>}
                        <li>{order.shippingAddress.phone}</li>
                        <li>{order.shippingAddress.willaya}</li>
                        <li>{order.shippingAddress.postalCode}</li>
                        <li>{order.shippingAddress.country}</li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}
