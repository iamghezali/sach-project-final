import { useState } from 'react';
import type { JSX } from 'react';
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
import { cn } from '@/lib/utils';

type AttachOfferToItemProps = {
    orderID: number;
    orderItemID: number;
};

export default function AttachOfferToItem({
    className,
    orderID,
    orderItemID,
    ...props
}: AttachOfferToItemProps & React.ComponentProps<typeof Button>): JSX.Element {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const form = useForm();

    const onSubmit = () => {
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
                    <DialogTitle>Assign Item to tailor</DialogTitle>
                    <DialogDescription className="sr-only">Assign this item to tailor</DialogDescription>
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
                        <FormField.Label>Price</FormField.Label>
                        <FormInput
                            type="date"
                            min={new Date().toISOString().split('T')[0]}
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
