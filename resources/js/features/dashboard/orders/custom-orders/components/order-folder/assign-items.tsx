import type { JSX } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

export function AssignSingle({ className, ...props }: React.ComponentProps<'button'>): JSX.Element {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className={cn(className)}
                    {...props}
                >
                    Assign ITEM
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Assign Item to tailor</DialogTitle>
                    <DialogDescription className="sr-only">Assign this item to tailor</DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

export function AssignAll({ className, ...props }: React.ComponentProps<'button'>): JSX.Element {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className={cn(className)}
                    {...props}
                >
                    Assign All
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Assign All to tailor</DialogTitle>
                    <DialogDescription className="sr-only">Assign all items to tailor</DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
