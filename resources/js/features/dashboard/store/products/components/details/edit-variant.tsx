import type { JSX } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useSheetState } from '@/providers/sheet-provider';

type EditVariantProps = {
    variantID: number;
};

export default function EditVariant({ variantID }: EditVariantProps): JSX.Element {
    const { open, onOpenChange, onAnimationEnd } = useSheetState();

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
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
}
