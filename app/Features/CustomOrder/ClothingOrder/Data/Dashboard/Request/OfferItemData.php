<?php

namespace App\Features\CustomOrder\ClothingOrder\Data\Dashboard\Request;

use Spatie\LaravelData\Data;

class OfferItemData extends Data
{
    public function __construct(
        public int $id,
        public string $offer_price,
        public string $offer_due_date,
    ) {}

    public static function rules($ctx = null): array
    {
        return [
            'id' => ['required', 'integer'],
            'offer_price' => ['required', 'numeric', 'min:0'],
            'offer_due_date' => ['required', 'date', 'after:today'],
        ];
    }
}
