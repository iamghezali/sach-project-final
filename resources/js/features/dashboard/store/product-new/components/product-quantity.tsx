import { zodResolver } from '@hookform/resolvers/zod';
import type { JSX } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import Form from '@/components/form/form';
import { FormField } from '@/components/form/form-field';
import { FormInput } from '@/components/form/form-input';
import { FieldGroup } from '@/components/ui/field';
import Container from '@/features/dashboard/store/product-new/components/container';
import { SetProductQuantityRequestSchema } from '@/features/dashboard/store/product-new/schema';
import type { SetProductQuantityRequest } from '@/features/dashboard/store/product-new/schema';

export default function ProductQuantity(): JSX.Element {
    const form = useForm<SetProductQuantityRequest>({
        defaultValues: {
            quantity: 0,
        },

        resolver: zodResolver(SetProductQuantityRequestSchema),
    });

    const onSubmit: SubmitHandler<SetProductQuantityRequest> = (values) => {
        console.log(values);
    };

    return (
        <Container>
            {' '}
            <Form
                form={form}
                onSubmit={onSubmit}
            >
                <FieldGroup className="gap-4">
                    <FormField
                        control={form.control}
                        name="quantity"
                        className="max-w-50"
                    >
                        <FormField.Label
                            className="text-base"
                            variant="brand-primary"
                        >
                            Quantity
                        </FormField.Label>
                        <FormInput
                            type="number"
                            variant="brand-primary"
                            placeholder={'0.0'}
                            className="text-base font-medium"
                        />
                        <FormField.Error />
                    </FormField>
                </FieldGroup>
            </Form>
        </Container>
    );
}
