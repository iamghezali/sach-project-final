<?php

namespace App\Features\Catalog\Product\Data\Dashboard\Request;

use Spatie\LaravelData\Attributes\Validation\In;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Data;

class ListProductsRequestData extends Data
{
    // ListProductsData
    public function __construct(
        #[Max(100)]
        public readonly ?string $search,

        public readonly ?string $color,

        public readonly ?string $size,

        #[In(['newest', 'price_asc', 'price_desc'])]
        public readonly string $sort = 'newest',

        public readonly int $page = 1,
    ) {}
}
