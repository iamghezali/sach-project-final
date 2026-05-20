import { CheckIcon } from 'lucide-react';
import React, { useState } from 'react';
import type { JSX } from 'react';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useMarkOrderItemAsDone } from '@/features/tailor/orders/mutations';
import { useGetOrderItem } from '@/features/tailor/orders/queries';
import { cn } from '@/lib/utils';

type MarkOrderItemAsDoneProps = {
    orderID: number;
    orderItemID: number;
};

export default function MarkOrderItemAsDone({
    orderID,
    orderItemID,
    className,
    ...props
}: MarkOrderItemAsDoneProps & React.ComponentProps<typeof Button>): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);
    const { mutateAsync: markOrderItemAsDone, isPending } = useMarkOrderItemAsDone(orderID, orderItemID);
    const { data: response, isLoading } = useGetOrderItem(orderID, orderItemID);

    const HandleMarkAsDone = () => {
        markOrderItemAsDone(undefined, {
            onSuccess: () => setIsOpen(false),
        });
    };

    if (isLoading) {
        return <></>;
    }

    if (!response?.data) {
        return <></>;
    }

    const OrderItemStatus = response.data.status;

    return (
        <>
            <div>
                <Button
                    size="brand-md"
                    className={cn('w-full bg-success-200 font-normal text-black', className)}
                    onClick={() => setIsOpen(true)}
                    {...props}
                    disabled={OrderItemStatus === 'completed'}
                >
                    {OrderItemStatus === 'completed' ? 'Done' : 'Mark as done'}
                    <CheckIcon />
                </Button>

                <span className="mt-2.5 inline-block w-full text-center leading-none">
                    Mark this order as completed and send it for quality check.
                </span>
            </div>

            <AlertDialog open={isOpen}>
                <AlertDialogContent className="gap-0 py-7 sm:data-[size=default]:max-w-207">
                    <AlertDialogHeader className="mx-auto max-w-116.5">
                        <AlertDialogTitle className="mx-auto text-lg">Confirm Completion?</AlertDialogTitle>
                        <AlertDialogDescription className="text-center text-black">
                            Are you sure this order is fully completed and ready for review?.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter className="mx-auto mt-9 w-full max-w-116.5 gap-9 border-0 bg-transparent p-0 pb-2">
                        <AlertDialogCancel
                            size="brand-md"
                            className="flex-1 bg-[#F63647]! font-normal! hover:bg-[#F63647]/90!"
                            onClick={() => setIsOpen(false)}
                        >
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            size="brand-md"
                            className="flex-1 bg-success-200 font-normal! text-black! hover:bg-success-200/80"
                            disabled={isPending}
                            onClick={HandleMarkAsDone}
                        >
                            {isPending ? 'Confirming...' : 'Confirm'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
