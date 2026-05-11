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

export default function CustomOrderInteractions(): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);

    const HandleAccept = () => console.log('offer accepted');
    const HandleDecline = () => console.log('offer declined');

    return (
        <div>
            <Button onClick={() => setIsOpen(true)}>Decline</Button>
            <Button onClick={HandleAccept}>Accept</Button>

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

                    <AlertDialogFooter className="border-0 bg-transparent">
                        <AlertDialogAction
                            className="w-full"
                            variant="destructive"
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
