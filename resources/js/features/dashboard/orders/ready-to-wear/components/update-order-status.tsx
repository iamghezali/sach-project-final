import { ChevronDownIcon, LoaderCircleIcon } from 'lucide-react';
import { useState } from 'react';
import type { JSX } from 'react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUpdateOrderStatus } from '@/features/dashboard/orders/ready-to-wear/mutations';
import { useOrderDetails } from '@/features/dashboard/orders/ready-to-wear/queries';
import type { OrderStatus } from '@/features/dashboard/orders/ready-to-wear/schema';

const STATUS_OPTIONS: { label: string; value: OrderStatus }[] = [
    { label: 'Pending', value: 'pending' },
    { label: 'Confirmed', value: 'confirmed' },
    { label: 'On Shipping', value: 'on_shipping' },
    { label: 'Shipped', value: 'shipped' },
    { label: 'Cancelled', value: 'cancelled' },
];

interface UpdateOrderStatusProps {
    orderID: number;
}

export default function UpdateOrderStatus({ orderID }: UpdateOrderStatusProps): JSX.Element {
    const [open, setOpen] = useState(false);
    const { data: response } = useOrderDetails(orderID);
    const { mutateAsync: updateOrderStatus, isPending } = useUpdateOrderStatus(orderID);

    const currentStatus = response?.data.status;
    const currentLabel = response?.data.status_label;

    const handleCheckedChange = async (value: OrderStatus, checked: boolean) => {
        if (checked && value !== currentStatus) {
            await updateOrderStatus({
                orderID: orderID,
                payload: {
                    status: value,
                },
            });

            setOpen(false);
        }
    };

    return (
        <DropdownMenu
            open={open}
            onOpenChange={setOpen}
        >
            <DropdownMenuTrigger asChild>
                <Button
                    size="sm"
                    variant="outline"
                    disabled={isPending}
                >
                    {isPending && <LoaderCircleIcon className="animate-spin" />}
                    {isPending ? 'Updating...' : currentLabel}
                    <ChevronDownIcon />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                className="w-40"
                align="end"
            >
                <DropdownMenuGroup>
                    {STATUS_OPTIONS.map(({ label, value }) => (
                        <DropdownMenuCheckboxItem
                            key={value}
                            checked={currentStatus === value}
                            onCheckedChange={(checked) => handleCheckedChange(value, checked)}
                        >
                            {label}
                        </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
