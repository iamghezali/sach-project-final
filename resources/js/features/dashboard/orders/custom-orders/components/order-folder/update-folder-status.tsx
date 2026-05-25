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
import { useUpdateFolderStatus } from '@/features/dashboard/orders/custom-orders/mutations';
import { useCustomOrderFolder } from '@/features/dashboard/orders/custom-orders/queries';
import type { FolderStatus } from '@/features/dashboard/orders/custom-orders/schema';

const STATUS_OPTIONS: { label: string; value: FolderStatus }[] = [
    { label: 'Pending', value: 'pending' },
    { label: 'Negotiating', value: 'negotiating' },
    { label: 'Offered', value: 'offered' },
    { label: 'Accepted', value: 'accepted' },
    { label: 'In Progress', value: 'in_progress' },
    { label: 'Completed', value: 'completed' },
    { label: 'Quality Check', value: 'quality_check' },
    { label: 'On Shipping', value: 'on_shipping' },
    { label: 'Shipped', value: 'shipped' },
    { label: 'Cancelled', value: 'cancelled' },
];

interface UpdateFolderStatusProps {
    orderID: number;
}

export default function UpdateFolderStatus({ orderID }: UpdateFolderStatusProps): JSX.Element {
    const [open, setOpen] = useState(false);
    const { data: response } = useCustomOrderFolder(orderID);
    const { mutateAsync: updateFolderStatus, isPending } = useUpdateFolderStatus(orderID);

    const currentStatus = response?.data.status;
    const currentLabel = response?.data.status_label;

    const handleCheckedChange = async (value: FolderStatus, checked: boolean) => {
        if (checked && value !== currentStatus) {
            await updateFolderStatus({
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
