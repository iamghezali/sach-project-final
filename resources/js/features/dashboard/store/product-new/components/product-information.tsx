import { zodResolver } from '@hookform/resolvers/zod';
import type { JSX } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import Form from '@/components/form/form';
import { FormField } from '@/components/form/form-field';
import { FormInput } from '@/components/form/form-input';
import { FormTextarea } from '@/components/form/form-textarea';
import { FieldGroup } from '@/components/ui/field';
import Container from '@/features/dashboard/store/product-new/components/container';
import UploadMedia from '@/features/dashboard/store/product-new/components/upload-media';
import { CreateProductInformationRequestSchema } from '@/features/dashboard/store/product-new/schema';
import type { CreateProductInformationRequest } from '@/features/dashboard/store/product-new/schema';

export default function ProductInformation(): JSX.Element {
    const form = useForm<CreateProductInformationRequest>({
        defaultValues: {
            title: '',
            description: '',
        },

        resolver: zodResolver(CreateProductInformationRequestSchema),
    });

    const onSubmit: SubmitHandler<CreateProductInformationRequest> = (values) => {
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
                        name="title"
                    >
                        <FormField.Label
                            className="text-base"
                            variant="brand-primary"
                        >
                            Title
                        </FormField.Label>
                        <FormInput
                            variant="brand-primary"
                            placeholder="Short Sleeve Shirt"
                        />
                        <FormField.Error />
                    </FormField>

                    <FormField
                        control={form.control}
                        name="description"
                    >
                        <FormField.Label
                            className="text-base"
                            variant="brand-primary"
                        >
                            Description
                        </FormField.Label>
                        <FormTextarea
                            className="min-h-41.5"
                            variant="brand-primary"
                            placeholder="Input Text"
                        />
                        <FormField.Error />
                    </FormField>
                </FieldGroup>
            </Form>

            <UploadMedia />
        </Container>
    );
}
