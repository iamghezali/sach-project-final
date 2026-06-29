import { Link } from '@inertiajs/react';
import { ExternalLinkIcon } from 'lucide-react';
import type { JSX } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import OrderItemInformation from '@/features/dashboard/orders/custom-orders/components/order-item-information';
import { useSheet, useSheetState } from '@/providers/sheet-provider';

type OrderItemQuickviewProps = {
    orderID: number;
    orderItemID: number;
};

export default function OrderItemQuickview({ orderID, orderItemID }: OrderItemQuickviewProps): JSX.Element {
    const { open, onOpenChange, onAnimationEnd } = useSheetState();
    const { closeSheet } = useSheet();

    return (
        <Sheet
            open={open}
            onOpenChange={onOpenChange}
        >
            <SheetContent
                side="right"
                onAnimationEnd={onAnimationEnd}
                className="bg-brand-neutral-100 data-[side=right]:sm:max-w-254"
            >
                <SheetHeader className="sr-only">
                    <SheetTitle>
                        Order Item {orderItemID} from {orderID}
                    </SheetTitle>
                    <SheetDescription>Order Item Description</SheetDescription>
                </SheetHeader>

                <div className="p-4">
                    <div className="flex max-w-lg items-center justify-between">
                        <Button
                            variant="brand-secondary"
                            size="brand-md"
                            className="text-black hover:text-white"
                            asChild
                        >
                            <Link
                                href={`/dashboard/custom-orders/${orderID}`}
                                onSuccess={() => closeSheet()}
                            >
                                Open <ExternalLinkIcon />
                            </Link>
                        </Button>

                        <Badge variant="brand-pending">Under Review</Badge>
                    </div>

                    <div className="mt-7">
                        <span>
                            Order Item {orderItemID} from {orderID}
                        </span>
                        <OrderItemInformation />
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
