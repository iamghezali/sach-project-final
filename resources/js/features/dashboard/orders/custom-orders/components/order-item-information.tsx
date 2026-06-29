import type { JSX } from 'react';
import Image from '@/components/image';
import type { ClothingOrderItem } from '@/features/dashboard/orders/custom-orders/schema';
import { useSignedMedia } from '@/hooks/use-signed-media';

type OrderItemInformationProps = {
    item: ClothingOrderItem;
};

export default function OrderItemInformation({ item }: OrderItemInformationProps): JSX.Element {
    const { openMedia, loadingUUID } = useSignedMedia();
    const { id, information, measurements } = item;

    return (
        <div>
            <div className="flex items-center justify-between text-base">
                <div>
                    <span className="text-brand-neutral-alt-700">Order ID: </span>
                    <span>#SASH-{id}</span>
                </div>
                <div className="ml-auto">
                    <span className="text-brand-neutral-alt-700">Type: </span>
                    <span className="capitalize">{information.item_type}</span>
                </div>
            </div>

            <div className="mt-6 flex flex-col gap-8">
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

                {item.images.length > 0 && (
                    <div>
                        <h3 className="text-[1.375rem]/tight font-medium">Order Images</h3>

                        <div className="mt-8 grid grid-cols-3 gap-x-3 gap-y-3">
                            {item.images.map((image) => (
                                <div
                                    key={image.uuid}
                                    className="relative overflow-hidden rounded-2xl pt-[150%]"
                                >
                                    <button
                                        type="button"
                                        disabled={loadingUUID === image.uuid}
                                        onClick={() => openMedia(image.uuid)}
                                        className="absolute inset-0 size-full cursor-pointer"
                                    >
                                        <Image
                                            src={image.url}
                                            alt={`${information.title} - reference`}
                                            className="absolute inset-0 size-full object-cover transition-transform group-hover:scale-105"
                                        />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
