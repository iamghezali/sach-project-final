import type { JSX } from 'react';
import { formatPrice } from '@/lib/format-price';

type PaymentOptionItemProps = {
    price: number | string;
};

export default function PaymentOptionItem({ price }: PaymentOptionItemProps): JSX.Element {
    return (
        <div className="flex items-center justify-between">
            <span className="text-lg">Cash On Delivery</span>
            <span>{formatPrice(price)} DZD</span>
        </div>
    );
}
