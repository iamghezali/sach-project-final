<?php

namespace App\Features\CustomOrder\ClothingOrder\Data\Dashboard\Request;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\DataCollection;

class AttachOfferRequestData extends Data
{
    public function __construct(
        /** @var DataCollection<OfferItemData> */
        public DataCollection $items,
    ) {}

    public static function rules($ctx = null): array
    {
        return [
            'items' => ['required', 'array', 'min:1'],
        ];
    }
}
