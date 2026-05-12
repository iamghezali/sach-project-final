import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import type { JSX } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import Form from '@/components/form/form';
import { FormButton } from '@/components/form/form-button';
import { FormField } from '@/components/form/form-field';
import { FormInput } from '@/components/form/form-input';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { FieldError } from '@/components/ui/field';
import { useAttachOfferToItem } from '@/features/dashboard/orders/custom-orders/mutations';
import type { AttachOfferToItemRequest } from '@/features/dashboard/orders/custom-orders/schema';
import { AttachOfferToItemRequestSchema } from '@/features/dashboard/orders/custom-orders/schema';
import { cn } from '@/lib/utils';

type AttachOfferToItemProps = {
    orderID: number;
    orderItemID: number;
};

const today = new Date().toISOString().split('T')[0];

export default function AttachOfferToItem({
    className,
    orderID,
    orderItemID,
    ...props
}: AttachOfferToItemProps & React.ComponentProps<typeof Button>): JSX.Element {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const { mutateAsync: attachOffer } = useAttachOfferToItem(orderID);

    const form = useForm<AttachOfferToItemRequest>({
        defaultValues: {
            item_id: orderItemID,
            offer_price: 2000,
            offer_due_date: today,
        },
        resolver: zodResolver(AttachOfferToItemRequestSchema),
    });

    const onSubmit: SubmitHandler<AttachOfferToItemRequest> = (values) => {
        attachOffer(
            {
                orderID: orderID,
                payload: values,
            },
            {
                onError: (errors) => {
                    form.setError('root', { message: errors.message });
                },

                onSuccess: () => {
                    setIsOpen(false);
                },
            },
        );
        console.log('attach offer to item', orderItemID, 'order', orderID);
    };

    const handleDialog = (isOpen: boolean) => {
        form.reset();
        setIsOpen(isOpen);
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={handleDialog}
        >
            <DialogTrigger asChild>
                <Button
                    className={cn(className)}
                    {...props}
                >
                    Attach Offer
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Attach an Offer</DialogTitle>
                    <DialogDescription className="sr-only">Attach an offer to item</DialogDescription>
                </DialogHeader>

                <Form
                    form={form}
                    onSubmit={onSubmit}
                >
                    <FormField
                        control={form.control}
                        name="offer_price"
                    >
                        <FormField.Label>Price</FormField.Label>
                        <FormInput
                            min={1}
                            type="number"
                            placeholder="Price to offer"
                        />
                        <FormField.Error />
                    </FormField>

                    <FormField
                        control={form.control}
                        name="offer_due_date"
                    >
                        <FormField.Label>Date</FormField.Label>
                        <FormInput
                            type="date"
                            min={today}
                        />
                        <FormField.Error />
                    </FormField>

                    {form.formState.errors.root && <FieldError>{form.formState.errors.root.message}</FieldError>}

                    <FormButton control={form.control}>Save</FormButton>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
