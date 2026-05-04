import { zodResolver } from '@hookform/resolvers/zod';
import type { JSX } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import z from 'zod';
import Form from '@/components/form/form';
import { FormButton } from '@/components/form/form-button';
import { FormField } from '@/components/form/form-field';
import { FormInput } from '@/components/form/form-input';

const SubscribeToNewsLetterRequestSchema = z.object({
    email: z.email(),
});

type SubscribeToNewsLetterRequest = z.infer<typeof SubscribeToNewsLetterRequestSchema>;

export default function NewsletterForm(): JSX.Element {
    const form = useForm<SubscribeToNewsLetterRequest>({
        defaultValues: { email: '' },
        resolver: zodResolver(SubscribeToNewsLetterRequestSchema),
    });

    const onSubmit: SubmitHandler<SubscribeToNewsLetterRequest> = () => {
        console.log('Subscribe to newsletter.');
    };

    return (
        <Form
            form={form}
            onSubmit={onSubmit}
        >
            <div className="flex flex-col items-start gap-1.5 lg:flex-row lg:gap-1">
                <FormField
                    name="email"
                    control={form.control}
                    className="max-w-85.5"
                >
                    <FormInput
                        variant="brand-primary"
                        className="h-11.5 border-white placeholder:text-white/50 focus-visible:border-white focus-visible:ring-[3px] focus-visible:ring-white/50"
                        placeholder="Email Address"
                    />
                    <FormField.Error />
                </FormField>

                <FormButton
                    size="brand-lg"
                    variant="brand-neutral"
                    className="uppercase"
                    control={form.control}
                >
                    Submit
                </FormButton>
            </div>
        </Form>
    );
}
