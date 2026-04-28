<?php

namespace App\Features\CustomOrder\ClothingOrder\Data\Dashboard\Request;

use Spatie\LaravelData\Data;

class AssignOrderItemsRequestData extends Data
{
    public function __construct(
        public readonly int $clothing_order_id,
        public readonly int $tailor_id,
        /** @var int[]|null null = assign all items */
        public readonly ?array $item_ids,
    ) {}

    public static function rules($ctx = null): array
    {
        return [
            'clothing_order_id' => ['required', 'integer', 'exists:clothing_orders,id'],
            'tailor_id' => ['required', 'integer'],
            'item_ids' => ['sometimes', 'nullable', 'array'],
            'item_ids.*' => ['integer', 'exists:clothing_order_items,id'],
        ];
    }
}
