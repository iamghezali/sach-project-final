<?php

namespace App\Features\Catalog\Product\Data\Shop\Request;

use Spatie\LaravelData\Attributes\Validation\In;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Data;

class ListProductsRequestData extends Data
{
    public function __construct(
        #[Max(100)]
        public readonly ?string $search,

        // comma-separated slugs: "red,blue"
        public readonly ?string $color,

        // comma-separated slugs: "S,M,L"
        public readonly ?string $size,

        // comma-separated slugs: "tshirts,pants"
        public readonly ?string $category,

        #[In(['newest', 'price_asc', 'price_desc'])]
        public readonly string $sort = 'newest',

        public readonly int $page = 1,
    ) {}
}
