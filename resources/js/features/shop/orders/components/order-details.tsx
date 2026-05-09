import { usePage } from '@inertiajs/react';
import type { JSX } from 'react';
import { useGetOrder } from '@/features/shop/orders/queries';

export default function OrderDetails(): JSX.Element {
    const { props } = usePage<{ id: string }>();
    const orderID = props.id;
    const { data: response, isLoading } = useGetOrder(orderID);

    if (isLoading) {
        return <p>Loading order...</p>;
    }

    if (!response) {
        return <></>;
    }

    const { data } = response;

    return (
        <div>
            <h1>Order Details</h1>

            <ul>
                <li>Order ID: {data.id}</li>
                <li>Create at: {data.createdAt}</li>
                <li>Total: {data.total} DZD</li>
                <li>Message: {data.notes}</li>
                <li>
                    <div>
                        {data.items.map((orderItem) => (
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
                        <li>{data.shippingAddress.fullName}</li>
                        <li>{data.shippingAddress.addressLine1}</li>
                        {data.shippingAddress.addressLine2 && <li>{data.shippingAddress.addressLine2}</li>}
                        <li>{data.shippingAddress.phone}</li>
                        <li>{data.shippingAddress.willaya}</li>
                        <li>{data.shippingAddress.postalCode}</li>
                        <li>{data.shippingAddress.country}</li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}
