import { zodResolver } from '@hookform/resolvers/zod';
import type { JSX } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import Form from '@/components/form/form';
import { FormField } from '@/components/form/form-field';
import { FormInput } from '@/components/form/form-input';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { Separator } from '@/components/ui/separator';
import Container from '@/features/dashboard/store/product-new/components/container';
import type { SetProductPriceRequest } from '@/features/dashboard/store/product-new/schema';
import { SetProductPriceRequestSchema } from '@/features/dashboard/store/product-new/schema';

export default function ProductPrice(): JSX.Element {
    const form = useForm<SetProductPriceRequest>({
        defaultValues: {
            price: 0,
        },

        resolver: zodResolver(SetProductPriceRequestSchema),
    });

    const onSubmit: SubmitHandler<SetProductPriceRequest> = (values) => {
        console.log(values);
    };

    return (
        <Container>
            <Form
                form={form}
                onSubmit={onSubmit}
            >
                <FieldGroup className="gap-4">
                    <FormField
                        control={form.control}
                        name="price"
                        className="max-w-50"
                    >
                        <FormField.Label
                            className="text-base"
                            variant="brand-primary"
                        >
                            Price
                        </FormField.Label>
                        <div>
                            <div className="relative">
                                <FormInput
                                    type="number"
                                    variant="brand-primary"
                                    placeholder={'0.0'}
                                    className="pl-14 text-base font-medium"
                                />

                                <span className="absolute top-1/2 left-0 inline-block -translate-y-1/2 pl-4 text-brand-neutral-500">
                                    DZD
                                </span>
                            </div>
                        </div>
                        <FormField.Error />
                    </FormField>
                </FieldGroup>
            </Form>

            <Separator className="my-4.5" />

            <div className="flex gap-3">
                <Button
                    variant="brand-neutral-light"
                    size="brand-md"
                >
                    Compare at
                </Button>
                <Button
                    variant="brand-neutral-light"
                    size="brand-md"
                >
                    Unit Price
                </Button>
            </div>
        </Container>
    );
}
