import { router } from '@inertiajs/react';
import { ExternalLinkIcon } from 'lucide-react';
import type { JSX } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import OrderItemInformation from '@/features/dashboard/orders/custom-orders/components/order-item-information';
import { useGetCustomOrderItem } from '@/features/dashboard/orders/custom-orders/queries';
import type { ItemStatus } from '@/features/dashboard/orders/custom-orders/schema';
import { useSheet, useSheetState } from '@/providers/sheet-provider';

type OrderItemQuickviewProps = {
    orderID: number;
    orderItemID: number;
};

export default function OrderItemQuickview({ orderID, orderItemID }: OrderItemQuickviewProps): JSX.Element {
    const { open, onOpenChange, onAnimationEnd } = useSheetState();
    const { closeSheet } = useSheet();
    const { data: response, isLoading } = useGetCustomOrderItem(orderID, orderItemID);

    const orderItem = response?.data;

    return (
        <Sheet
            open={open}
            onOpenChange={onOpenChange}
        >
            <SheetContent
                side="right"
                onAnimationEnd={onAnimationEnd}
                className="overflow-y-auto bg-brand-neutral-100 data-[side=right]:sm:max-w-254"
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
                            className="font-medium text-black hover:text-white"
                            onClick={() =>
                                router.visit(`/dashboard/custom-orders/${orderID}/item/${orderItemID}`, {
                                    onFinish: () => closeSheet(),
                                })
                            }
                        >
                            Open <ExternalLinkIcon />
                        </Button>

                        {orderItem && (
                            <Badge variant={`brand-${orderItem.status}` as `brand-${ItemStatus}`}>
                                {orderItem.status_label}
                            </Badge>
                        )}
                    </div>

                    <div className="mt-7">
                        {isLoading ? (
                            <>Loading...</>
                        ) : !orderItem ? (
                            <>Loading Error</>
                        ) : (
                            <OrderItemInformation item={orderItem} />
                        )}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
