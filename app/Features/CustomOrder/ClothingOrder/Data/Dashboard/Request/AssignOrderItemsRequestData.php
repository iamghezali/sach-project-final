<?php

namespace App\Features\CustomOrder\ClothingOrder\Data\Dashboard\Request;

use Spatie\LaravelData\Data;

class AssignOrderItemsRequestData extends Data
{
    public function __construct(
        public readonly ?string $tailor_email,

        /** @var int|null null = assign all items */
        public readonly ?int $item_id,
    ) {}

    public static function rules($ctx = null): array
    {
        return [
            'tailor_email' => ['nullable', 'string', 'email'],
            'item_id' => ['sometimes', 'nullable', 'integer', 'exists:clothing_order_items,id'],
        ];
    }
}
