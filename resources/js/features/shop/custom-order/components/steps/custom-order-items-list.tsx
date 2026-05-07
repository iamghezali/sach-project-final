import { SquarePenIcon, Trash2Icon } from 'lucide-react';
import type { JSX } from 'react';
import Image from '@/components/image';
import { Button } from '@/components/ui/button';
import { useCustomOrder } from '@/features/shop/custom-order/providers/custom-order-provider';
import type { CustomOrderItem } from '@/features/shop/custom-order/schema';

type CustomOrderItemsListProps = {
    items: CustomOrderItem[];
};

export default function CustomOrderItemsList({ items }: CustomOrderItemsListProps): JSX.Element {
    const { removeOrderItem, editOrderItem } = useCustomOrder();

    if (items.length === 0) {
        return <></>;
    }

    return (
        <div>
            <ul className="flex flex-col gap-2">
                {items.map((item, i) => (
                    <li
                        key={i}
                        className="flex items-center gap-4 rounded-2xl border border-brand-neutral-1000 p-3"
                    >
                        <div className="basis-32">
                            <div className="relative overflow-hidden rounded-xl bg-brand-neutral-200 pt-[120%]">
                                <Image className="absolute inset-0 size-full object-cover" />
                            </div>
                        </div>

                        <div className="grow">
                            <span className="text-4xl leading-14.5 font-bold">{item.information.title}</span>

                            <div className="flex gap-1 text-xl">
                                <span className="inline-block text-brand-neutral-alt-700 capitalize">Type:</span>
                                <span className="inline-block capitalize">{item.information.looking_for}</span>
                            </div>

                            <div className="mt-3 flex max-w-xs flex-col gap-1">
                                <div className="flex gap-4">
                                    <span className="inline-block flex-1 capitalize">{item.information.item_type}</span>
                                    <span className="inline-block flex-1 capitalize">
                                        {item.information.item_is_for}
                                    </span>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex flex-1 gap-1">
                                        <span className="inline-block text-brand-neutral-alt-700 capitalize">
                                            Size:
                                        </span>
                                        <span className="inline-block capitalize">
                                            {item.measurements.measurement_type}
                                        </span>
                                    </div>

                                    <div className="flex flex-1 gap-1">
                                        <span className="inline-block text-brand-neutral-alt-700 capitalize">
                                            Quantity:
                                        </span>
                                        <span className="inline-block capitalize">{item.information.quantity}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Button
                                onClick={() => editOrderItem(i)}
                                className="w-35 font-medium"
                                variant="brand-primary"
                                size="brand-md"
                            >
                                Edit
                                <SquarePenIcon />
                            </Button>
                            <Button
                                onClick={() => removeOrderItem(i)}
                                className="w-35 font-medium"
                                variant="destructive"
                                size="brand-md"
                            >
                                Remove
                                <Trash2Icon />
                            </Button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
