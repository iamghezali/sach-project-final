<?php

namespace App\Features\Catalog\Product\Data\Shop\Response;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\DataCollection;

class ProductAttributeData extends Data
{
    public function __construct(
        public readonly int $id,
        public readonly string $name,
        /** @var DataCollection<int, ProductAttributeValueData> */
        public readonly DataCollection $values,
    ) {}
}
