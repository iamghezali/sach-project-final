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
        <>
            <div className="flex flex-col gap-4">
                <div className="rounded-lg border p-3">
                    <div className="flex justify-between">
                        <h2 className="text-lg">Information</h2>
                        <Button
                            onClick={() => setStep('step-2')}
                            variant="secondary"
                        >
                            Edit
                        </Button>
                    </div>
                    <div>
                        <span className="text-neutral-700">What is this order for?: </span>
                        {orderItem.information.item_is_for}
                    </div>
                    <div>
                        <span className="text-neutral-700">What would you like to create?: </span>
                        {orderItem.information.item_type}
                    </div>
                    <div>
                        <span className="text-neutral-700">Gender?: </span>
                        {orderItem.information.item_for_gender}
                    </div>
                    <div>
                        <span className="text-neutral-700">Order title?: </span>
                        {orderItem.information.title}
                    </div>
                    <div>
                        <span className="text-neutral-700">What are you looking for?: </span>
                        {orderItem.information.looking_for}
                    </div>
                    <div>
                        <span className="text-neutral-700">Will you provide fabric?: </span>
                        {orderItem.information.provide_fabric ? 'yes' : 'no'}
                    </div>
                    <div>
                        <span className="text-neutral-700">Short Description: </span>
                        {orderItem.information.short_description ? orderItem.information.short_description : 'Empty'}
                    </div>
                    <div>
                        <span className="text-neutral-700">Qauntity: </span>
                        {orderItem.information.quantity}
                    </div>
                    <div>
                        <span className="text-neutral-700">Preferred Delivery date: </span>
                        {orderItem.information.preferred_due_date}
                    </div>
                </div>

                <div className="rounded-lg border p-3">
                    <div className="flex justify-between">
                        <h2 className="text-lg">Measurments</h2>
                        <Button
                            onClick={() => setStep('step-3')}
                            variant="secondary"
                        >
                            Edit
                        </Button>
                    </div>
                    <div>
                        <span className="text-neutral-700">How would you like to provide measurements?: </span>
                        {orderItem.measurements.measurement_type} measurements
                    </div>

                    {orderItem.measurements.measurement_type === 'standard' && (
                        <div>
                            <span className="text-neutral-700">Size: </span>
                            <span className="uppercase">{orderItem.measurements.size}</span>
                        </div>
                    )}

                    {orderItem.measurements.measurement_type === 'custom' && (
                        <>
                            <div>
                                <span className="text-neutral-700">Height: </span>
                                {orderItem.measurements.height}cm
                            </div>
                            <div>
                                <span className="text-neutral-700">Chest: </span>
                                {orderItem.measurements.chest}cm
                            </div>
                            <div>
                                <span className="text-neutral-700">Waist: </span>
                                {orderItem.measurements.waist}cm
                            </div>
                            <div>
                                <span className="text-neutral-700">Shoulder Width: </span>
                                {orderItem.measurements.shoulder}cm
                            </div>
                        </>
                    )}

                    <div>
                        <span className="text-neutral-700">Fitting preferrence?: </span>
                        {orderItem.measurements.fitting_preference
                            ? orderItem.measurements.fitting_preference
                            : 'Empty'}
                    </div>
                </div>
            </div>

            <div>
                <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                        if (isEditing) {
                            setStep('step-1');

                            return;
                        }

                        setStep('step-3');
                    }}
                >
                    {isEditing ? 'Cancel' : 'Back'}
                </Button>
                <Button onClick={HandleClick}>{isEditing ? 'Save Item' : 'Create Item'}</Button>
            </div>
        </>
    );
}
