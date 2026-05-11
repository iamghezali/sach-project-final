<?php

namespace App\Features\CustomOrder\ClothingOrder\Data\Dashboard\Request;

use Spatie\LaravelData\Data;

class AttachOfferRequestData extends Data
{
    public function __construct(
        public int $item_id,
        public string $offer_price,
        public string $offer_due_date,
    ) {}

    public static function rules($ctx = null): array
    {
        return [
            'item_id' => ['required', 'integer'],
            'offer_price' => ['required', 'numeric'],
            'offer_due_date' => ['required', 'date'],
        ];
    }
}
