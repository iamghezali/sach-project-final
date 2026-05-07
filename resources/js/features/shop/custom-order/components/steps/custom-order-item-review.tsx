import { ArrowLeftIcon, ArrowRightIcon, SquarePenIcon } from 'lucide-react';
import type { JSX } from 'react';
import { Button } from '@/components/ui/button';
import { useCustomOrder } from '@/features/shop/custom-order/providers/custom-order-provider';

export default function CustomOrderItemReview(): JSX.Element {
    const { setStep, orderItem, isEditing, addOrUpdateOrderItem } = useCustomOrder();

    const HandleClick = () => {
        addOrUpdateOrderItem(orderItem);

        setStep('step-1');
    };

    return (
        <div className="mt-7.5 flex flex-col gap-10.5">
            <div className="flex flex-col gap-10.5">
                <div className="flex flex-col gap-8 rounded-2xl border border-brand-neutral-1000 px-6 py-7.5">
                    <div className="flex justify-between text-[1.75rem] leading-[1.4] font-semibold">
                        <h2>Item Information</h2>
                        <Button
                            onClick={() => setStep('step-2')}
                            variant="brand-primary"
                            size="brand-md"
                        >
                            Edit
                            <SquarePenIcon />
                        </Button>
                    </div>

                    <div className="flex flex-col gap-7">
                        <h3 className="text-2xl font-medium text-brand-neutral-1000">Order Type</h3>

                        <div className="flex flex-col gap-6 text-xl">
                            <InformationItem
                                property="What is this order for?"
                                value={orderItem.information.item_is_for}
                            />

                            <InformationItem
                                property="What would you like to create?"
                                value={orderItem.information.item_type}
                            />

                            <InformationItem
                                property="Gender?"
                                value={orderItem.information.item_for_gender}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-7">
                        <h3 className="text-2xl font-medium text-brand-neutral-1000">Order Details</h3>

                        <div className="flex flex-col gap-6 text-xl">
                            <div className="flex items-baseline justify-between">
                                <InformationItem
                                    className="flex-1"
                                    property="Order Title"
                                    value={orderItem.information.title}
                                />

                                <InformationItem
                                    className="flex-1"
                                    property="What are you looking for?"
                                    value={orderItem.information.looking_for}
                                />
                            </div>

                            <InformationItem
                                property="Will you provide the fabric?"
                                value={orderItem.information.provide_fabric ? 'Yes' : 'No - I want SASH to provide it'}
                            />

                            <InformationItem
                                property="Short Description"
                                value={
                                    orderItem.information.description
                                        ? orderItem.information.description
                                        : 'Not Specified'
                                }
                            />

                            <div className="flex items-baseline justify-between">
                                <InformationItem
                                    className="flex-1"
                                    property="Quantity:"
                                    value={orderItem.information.quantity}
                                />

                                <InformationItem
                                    className="flex-1"
                                    property="Preferred Delivery Date:"
                                    value={orderItem.information.preferred_due_date}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-7 rounded-2xl border border-brand-neutral-1000 px-6 py-7.5">
                    <div className="flex justify-between text-[1.75rem] leading-[1.4] font-semibold">
                        <h2>Measurements</h2>
                        <Button
                            onClick={() => setStep('step-3')}
                            variant="brand-primary"
                            size="brand-md"
                        >
                            Edit
                            <SquarePenIcon />
                        </Button>
                    </div>

                    <div className="flex flex-col gap-6 text-xl">
                        <InformationItem
                            property="How would you like to provide measurements?"
                            value={orderItem.measurements.measurement_type}
                        />

                        {orderItem.measurements.measurement_type === 'standard' && (
                            <InformationItem
                                property="Size:"
                                className="uppercase"
                                value={orderItem.measurements.size}
                            />
                        )}

                        {orderItem.measurements.measurement_type === 'custom' && (
                            <div className="flex justify-between">
                                <div className="flex flex-1 flex-col gap-6">
                                    <InformationItem
                                        property="Height:"
                                        value={`${orderItem.measurements.height} cm`}
                                    />

                                    <InformationItem
                                        property="Shoulder:"
                                        value={`${orderItem.measurements.shoulder} cm`}
                                    />
                                </div>

                                <div className="flex flex-1 flex-col gap-6">
                                    <InformationItem
                                        property="Chest:"
                                        value={`${orderItem.measurements.chest} cm`}
                                    />

                                    <InformationItem
                                        property="Waist:"
                                        value={`${orderItem.measurements.waist} cm`}
                                    />
                                </div>
                            </div>
                        )}

                        <InformationItem
                            property="Fitting preference"
                            value={
                                orderItem.measurements.fitting_preference
                                    ? orderItem.measurements.fitting_preference
                                    : 'Not Specified'
                            }
                        />
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <Button
                    type="button"
                    variant="brand-neutral"
                    size="brand-md"
                    onClick={() => {
                        if (isEditing) {
                            setStep('step-1');

                            return;
                        }

                        setStep('step-3');
                    }}
                >
                    <ArrowLeftIcon strokeWidth={3} />
                    {isEditing ? 'Cancel' : 'Back'}
                </Button>
                <Button
                    variant="brand-primary"
                    size="brand-md"
                    onClick={HandleClick}
                >
                    {isEditing ? 'Save Item' : 'Create Item'}
                    <ArrowRightIcon strokeWidth={3} />
                </Button>
            </div>
        </div>
    );
}

type InformationItemProps = {
    property: string;
    value: string | number;
} & React.ComponentProps<'div'>;

const InformationItem = ({ property, value, ...props }: InformationItemProps) => (
    <div {...props}>
        <span className="text-brand-neutral-alt-600">{property} </span>
        <span className="inline-block font-medium first-letter:uppercase">{value}</span>
    </div>
);
