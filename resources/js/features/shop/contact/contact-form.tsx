import { ArrowRightIcon } from 'lucide-react';
import type { JSX } from 'react';
import { useForm } from 'react-hook-form';
import Form from '@/components/form/form';
import { FormButton } from '@/components/form/form-button';
import { FormField } from '@/components/form/form-field';
import { FormInput } from '@/components/form/form-input';
import { FormTextarea } from '@/components/form/form-textarea';

export default function ContactForm(): JSX.Element {
    const form = useForm();
    const onSubmit = () => {};

    return (
        <Form
            form={form}
            onSubmit={onSubmit}
        >
            <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                    <FormField
                        control={form.control}
                        name="last_name"
                    >
                        <FormInput
                            placeholder="Last Name"
                            variant="brand-primary"
                        />
                    </FormField>

                    <FormField
                        control={form.control}
                        name="first_name"
                    >
                        <FormInput
                            placeholder="First Name"
                            variant="brand-primary"
                        />
                    </FormField>
                </div>

                <FormField
                    control={form.control}
                    name="email"
                    variant="brand-primary"
                >
                    <FormInput
                        placeholder="Email"
                        variant="brand-primary"
                    />
                </FormField>

                <FormField
                    control={form.control}
                    name="phone"
                >
                    <FormInput
                        placeholder="Phone Number"
                        variant="brand-primary"
                    />
                </FormField>

                <FormField
                    control={form.control}
                    name="message"
                >
                    <FormTextarea
                        className="min-h-28"
                        placeholder="Message"
                        variant="brand-primary"
                    />
                </FormField>

                <FormButton
                    control={form.control}
                    className="w-full"
                    variant="brand-primary"
                    size="brand-lg"
                >
                    Send Message
                    <ArrowRightIcon strokeWidth={3} />
                </FormButton>
            </div>
        </Form>
    );
}
