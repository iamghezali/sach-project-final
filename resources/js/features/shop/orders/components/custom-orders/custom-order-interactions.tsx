import { XIcon } from 'lucide-react';
import { useState } from 'react';
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
import { FieldError } from '@/components/ui/field';
import { useResolveCustomOrderOffer } from '@/features/shop/orders/mutations';

type CustomOrderInteractionsProps = {
    orderID: number;
};

export default function CustomOrderInteractions({ orderID }: CustomOrderInteractionsProps): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState<string>();
    const { mutateAsync: resolveCustomOrderOffer, isPending } = useResolveCustomOrderOffer(orderID);

    const HandleAccept = async () =>
        await resolveCustomOrderOffer(
            {
                orderID: orderID,
                payload: {
                    accept: true,
                },
            },
            {
                onError: (error) => {
                    setError(error.message);
                },
            },
        );

    const HandleDecline = async () => {
        await resolveCustomOrderOffer(
            {
                orderID: orderID,
                payload: {
                    accept: false,
                },
            },
            {
                onSuccess: () => setIsOpen(false),
                onError: (error) => {
                    setError(error.message);
                },
            },
        );
    };

    return (
        <div>
            <Button
                onClick={() => setIsOpen(true)}
                disabled={isPending}
            >
                Decline
            </Button>

            <Button
                onClick={HandleAccept}
                disabled={isPending}
            >
                Accept
            </Button>

            <AlertDialog open={isOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to cancel your order?</AlertDialogTitle>
                        <AlertDialogDescription>If so choose one of the following reasons</AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogCancel
                        className="absolute top-2 right-2"
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsOpen(false)}
                    >
                        <XIcon />
                    </AlertDialogCancel>

                    {error && <FieldError>{error}</FieldError>}

                    <AlertDialogFooter className="border-0 bg-transparent">
                        <AlertDialogAction
                            className="w-full"
                            variant="destructive"
                            disabled={isPending}
                            onClick={HandleDecline}
                        >
                            Decline & Cancel Order
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
