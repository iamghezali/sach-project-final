<?php

namespace App\Features\Order\Data\Shop\Request;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\DataCollection;

class StoreOrderRequestData extends Data
{
    public function __construct(
        public AddressData $shipping_address,
        public AddressData $billing_address,

        /** @var DataCollection<OrderItemData> */
        public DataCollection $items,
        public ?string $notes = null,
    ) {}

    public static function rules($ctx = null): array
    {
        return [
            'shipping_address' => ['required', 'array'],
            'billing_address' => ['required', 'array'],
            'items' => ['required', 'array', 'min:1'],
            'notes' => ['nullable', 'string', 'max:1000'],
        ];
    }
}
