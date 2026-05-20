import type { JSX } from 'react';
import Image from '@/components/image';
import { useGetOrderItem } from '@/features/tailor/orders/queries';

type OrderItemProps = {
    orderID: number;
    orderItemID: number;
};
export default function OrderItem({ orderID, orderItemID }: OrderItemProps): JSX.Element {
    const { data: response, isLoading } = useGetOrderItem(orderID, orderItemID);

    if (isLoading) {
        return <>Loading...</>;
    }

    if (!response?.data) {
        return <>Loading Error</>;
    }

    const orderItem = response.data;
    const { id, information, measurements, offer_due_date } = orderItem;

    return (
        <div>
            <div className="flex flex-col gap-8">
                <div className="flex justify-between">
                    <div className="mr-auto">
                        <span className="text-brand-neutral-alt-700">Order ID: </span>
                        <span>#SASH-{id}</span>
                    </div>

                    <div className="shrink-0">
                        <span className="text-brand-neutral-alt-700">Deadline: </span>
                        <span>{offer_due_date}</span>
                    </div>

                    <div className="ml-auto">
                        <span className="text-brand-neutral-alt-700">Type: </span>
                        <span className="capitalize">{information.item_type}</span>
                    </div>
                </div>

                <h1 className="text-[2rem] leading-12 font-bold">Order details</h1>
            </div>

            <div className="mt-5.5 flex flex-col gap-8">
                <div className="flex flex-col gap-7 text-xl">
                    <h2 className="text-2xl font-medium">Order Type</h2>

                    <div className="flex flex-col gap-4">
                        <div>
                            <span className="text-brand-neutral-alt-600">This order is for </span>
                            <span className="inline-block font-medium first-letter:uppercase">
                                {information.item_is_for}
                            </span>
                        </div>

                        <div>
                            <span className="text-brand-neutral-alt-600">Gender </span>
                            <span className="inline-block font-medium first-letter:uppercase">
                                {information.item_for_gender}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-7 text-xl">
                    <h2 className="text-2xl font-medium">Order Details</h2>

                    <div className="flex flex-col gap-4">
                        <div>
                            <span className="text-brand-neutral-alt-600">Order title </span>
                            <span className="inline-block font-medium first-letter:uppercase">{information.title}</span>
                        </div>

                        <div>
                            <span className="text-brand-neutral-alt-600">What are you looking for?: </span>
                            <span className="inline-block font-medium first-letter:uppercase">
                                {information.looking_for}
                            </span>
                        </div>

                        <div>
                            <span className="text-brand-neutral-alt-600">Short Description </span>
                            <span className="inline-block font-medium first-letter:uppercase">
                                {information.description}
                            </span>
                        </div>

                        <div>
                            <span className="text-brand-neutral-alt-600">Quantity: </span>
                            <span className="inline-block font-medium first-letter:uppercase">
                                {information.quantity}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-7 text-xl">
                    <h2 className="text-2xl font-medium">Measurements</h2>

                    <div className="flex flex-col gap-4">
                        <div>
                            <span className="text-brand-neutral-alt-600">Measurements Provided </span>
                            <span className="inline-block font-medium first-letter:uppercase">
                                {measurements.measurement_type}
                            </span>
                        </div>

                        {measurements.measurement_type === 'standard' && (
                            <div>
                                <span className="text-brand-neutral-alt-600">Size: </span>
                                <span className="inline-block font-medium uppercase">{measurements.size}</span>
                            </div>
                        )}

                        {measurements.measurement_type === 'custom' && (
                            <div className="flex justify-between">
                                <div className="flex flex-1 flex-col gap-6">
                                    <div>
                                        <span className="text-brand-neutral-alt-600">Height: </span>
                                        <span className="inline-block font-medium">{measurements.height}cm</span>
                                    </div>

                                    <div>
                                        <span className="text-brand-neutral-alt-600">Shoulder: </span>
                                        <span className="inline-block font-medium">{measurements.shoulder}cm</span>
                                    </div>
                                </div>

                                <div className="flex flex-1 flex-col gap-6">
                                    <div>
                                        <span className="text-brand-neutral-alt-600">Chest: </span>
                                        <span className="inline-block font-medium">{measurements.chest}cm</span>
                                    </div>

                                    <div>
                                        <span className="text-brand-neutral-alt-600">Waist: </span>
                                        <span className="inline-block font-medium">{measurements.waist}cm</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {orderItem.images.length > 0 && (
                    <div>
                        <h3 className="text-[1.375rem]/tight font-medium">Order Images</h3>

                        <div className="mt-8 grid grid-cols-4 gap-x-9 gap-y-3">
                            {orderItem.images.map((image) => (
                                <div
                                    className="relative overflow-hidden rounded-2xl pt-[150%]"
                                    key={image.uuid}
                                >
                                    <a
                                        href={image.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="absolute inset-0 size-full"
                                    >
                                        <Image
                                            src={image.url}
                                            alt={`${information.title} - reference`}
                                            className="absolute h-full w-full object-cover transition-transform group-hover:scale-105"
                                        />
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
