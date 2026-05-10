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

    const HandleMarkAsDone = () => {
        markOrderItemAsDone(undefined, {
            onSuccess: () => setIsOpen(false),
        });
    };

    return (
        <>
            <Button
                className={cn(className)}
                onClick={() => setIsOpen(true)}
                {...props}
            >
                Mark as done
            </Button>

            <AlertDialog open={isOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Completion?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure this order is fully completed and ready for review?.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter className="border-0 bg-transparent">
                        <AlertDialogCancel onClick={() => setIsOpen(false)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
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
