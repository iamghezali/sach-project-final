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
import { useAssignToTailor } from '@/features/dashboard/orders/custom-orders/mutations';
import { AssignToTailorRequestSchema } from '@/features/dashboard/orders/custom-orders/schema';
import type { AssignToTailorRequest } from '@/features/dashboard/orders/custom-orders/schema';
import { cn } from '@/lib/utils';

type AssignSingleProps = {
    orderID: number;
    orderItemID: number;
};

export function AssignSingle({
    className,
    orderID,
    orderItemID,
    ...props
}: AssignSingleProps & React.ComponentProps<typeof Button>): JSX.Element {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const { mutateAsync: assign } = useAssignToTailor(orderID);
    const form = useForm<AssignToTailorRequest>({
        defaultValues: {
            tailor_email: '',
            item_id: orderItemID,
        },

        resolver: zodResolver(AssignToTailorRequestSchema),
    });

    const onSubmit: SubmitHandler<AssignToTailorRequest> = async (values) => {
        await assign(
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
                    Assign Item
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
                        name="tailor_email"
                    >
                        <FormField.Label>Email</FormField.Label>
                        <FormInput placeholder="Enter tailor email" />
                        <FormField.Error />
                    </FormField>

                    {form.formState.errors.root && <FieldError>{form.formState.errors.root.message}</FieldError>}

                    <FormButton control={form.control}>Assign</FormButton>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

type AssignAllProps = {
    orderID: number;
};

export function AssignAll({
    orderID,
    className,
    ...props
}: AssignAllProps & React.ComponentProps<'button'>): JSX.Element {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const { mutateAsync: assign } = useAssignToTailor(orderID);
    const form = useForm<AssignToTailorRequest>({
        defaultValues: {
            tailor_email: '',
            item_id: null,
        },

        resolver: zodResolver(AssignToTailorRequestSchema),
    });

    const onSubmit: SubmitHandler<AssignToTailorRequest> = async (values) => {
        await assign(
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
                    Assign All
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Assign All Items to Tailor</DialogTitle>
                    <DialogDescription className="sr-only">Assign all items to tailor</DialogDescription>
                </DialogHeader>

                <Form
                    form={form}
                    onSubmit={onSubmit}
                >
                    <FormField
                        control={form.control}
                        name="tailor_email"
                    >
                        <FormField.Label>Email</FormField.Label>
                        <FormInput placeholder="Enter tailor email" />
                        <FormField.Error />
                    </FormField>

                    {form.formState.errors.root && <FieldError>{form.formState.errors.root.message}</FieldError>}

                    <FormButton control={form.control}>Assign</FormButton>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
