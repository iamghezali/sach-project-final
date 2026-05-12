<?php

namespace App\Features\Order\Data\Dashboard\Response;

use App\Features\Order\Enums\OrderStatus;
use App\Models\Order;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Lazy;

class OrderData extends Data
{
    public function __construct(
        public int $id,
        public string $total,
        public OrderStatus $status,
        public readonly string $status_label,
        public string $createdAt,

        public Lazy|CustomerData $customer,
        public Lazy|AddressData $shippingAddress,
        public Lazy|AddressData $billingAddress,

        public ?string $notes,
        /** @var Lazy|OrderItemData[] */
        public Lazy|array $items,
    ) {}

    public static function fromModel(Order $order): self
    {
        return new self(
            id: $order->id,
            customer: Lazy::create(fn () => CustomerData::fromModel($order->user)),
            total: $order->total,
            notes: $order->notes,
            status: $order->status,
            status_label: $order->status->label(),
            createdAt: $order->created_at->format('Y-m-d'),
            shippingAddress: Lazy::create(fn () => AddressData::fromModel($order->shippingAddress)),
            billingAddress: Lazy::create(fn () => AddressData::fromModel($order->billingAddress)),
            items: Lazy::create(fn () => $order->items->map(fn ($item) => OrderItemData::fromModel($item))->all()),
        );
    }
}
