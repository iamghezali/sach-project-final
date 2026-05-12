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
import { useUpdateItemStatus } from '@/features/dashboard/orders/custom-orders/mutations';
import { useCustomOrderFolder } from '@/features/dashboard/orders/custom-orders/queries';
import type { ItemStatus } from '@/features/dashboard/orders/custom-orders/schema';

const STATUS_OPTIONS: { label: string; value: ItemStatus }[] = [
    { label: 'Pending', value: 'pending' },
    { label: 'Offered', value: 'offered' },
    { label: 'Negotiating', value: 'negotiating' },
    { label: 'Accepted', value: 'accepted' },
    { label: 'In Progress', value: 'in_progress' },
    { label: 'Completed', value: 'completed' },
    { label: 'Cancelled', value: 'cancelled' },
];

interface UpdateItemStatusProps {
    orderID: number;
    orderItemID: number;
}

export default function UpdateItemStatus({ orderID, orderItemID }: UpdateItemStatusProps): JSX.Element {
    const [open, setOpen] = useState(false);
    const { data: response } = useCustomOrderFolder(orderID);
    const { mutateAsync: updateItemStatus, isPending } = useUpdateItemStatus(orderID);

    const currentStatus = response?.data.items.find((item) => item.id === orderItemID)?.status as ItemStatus;
    const currentLabel = response?.data.items.find((item) => item.id === orderItemID)?.status_label;

    const handleCheckedChange = async (value: ItemStatus, checked: boolean) => {
        if (checked && value !== currentStatus) {
            await updateItemStatus({
                orderID: orderID,
                itemID: orderItemID,
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
