import type { JSX } from 'react';
import Image from '@/components/image';
import { formatPrice } from '@/lib/format-price';

type DeliveryOptionItemProps = {
    price: number | string;
};

export default function DeliveryOptionItem({ price }: DeliveryOptionItemProps): JSX.Element {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="relative h-8 w-22 bg-neutral-200">
                    <Image className="absolute inset-0 size-full object-cover" />
                </div>
                <span className="min-w-[12ch] text-lg font-medium">Yalidine</span>
                <span className="font-normal">Fast Delivery 24H to 48H</span>
            </div>

            <span>{formatPrice(price)} DZD</span>
        </div>
    );
}
