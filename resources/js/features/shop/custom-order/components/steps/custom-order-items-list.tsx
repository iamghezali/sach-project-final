import type { JSX } from 'react';
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
                        className="rounded-lg border p-3"
                    >
                        <h6 className="text-xl">{item.information.title}</h6>

                        <span className="block">Looking for: {item.information.looking_for}</span>
                        <span className="block">Item Type: {item.information.item_type}</span>

                        <span className="block">
                            Measurmeents: {item.measurements.measurement_type === 'standard' && 'standard'}
                            {item.measurements.measurement_type === 'custom' && 'custom'}
                        </span>

                        <div>
                            <Button
                                type="button"
                                variant="destructive"
                                onClick={() => removeOrderItem(i)}
                            >
                                Remove
                            </Button>

                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => editOrderItem(i)}
                            >
                                Edit
                            </Button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
