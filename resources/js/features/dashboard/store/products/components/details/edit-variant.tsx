import type { JSX } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useDeleteProductVariant } from '@/features/dashboard/store/products/mutations';
import { useSheet, useSheetState } from '@/providers/sheet-provider';

type EditVariantProps = {
    variantID: number;
    productID: number;
};

export default function EditVariant({ productID, variantID }: EditVariantProps): JSX.Element {
    const { open, onOpenChange, onAnimationEnd } = useSheetState();
    const { closeSheet } = useSheet();

    const { mutateAsync: deleteProductVariant, isPending } = useDeleteProductVariant(productID);

    const handleDelete = async (variantId: number) => {
        await deleteProductVariant(variantId, {
            onSuccess: () => {
                closeSheet();
                toast.success('Variant deleted');
            },
            onError: (err) => toast.error(err.message || 'Failed to delete variant'),
        });
    };

    return (
        <>
            <Sheet
                open={open}
                onOpenChange={onOpenChange}
            >
                <SheetContent
                    side="right"
                    onAnimationEnd={onAnimationEnd}
                    className="bg-brand-neutral-100 data-[side=right]:sm:max-w-lg"
                >
                    <SheetHeader>
                        <SheetTitle>Edit Variant</SheetTitle>
                        <SheetDescription>Variant Details</SheetDescription>
                    </SheetHeader>

                    <div className="p-4">
                        <span>Variant ID {variantID}</span>

                        <div>
                            <Button
                                onClick={() => handleDelete(variantID)}
                                variant="destructive"
                                size="brand-md"
                                disabled={isPending}
                            >
                                Remove Variant
                            </Button>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
}
