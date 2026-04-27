<?php

namespace App\Features\Catalog\Product\Data\Dashboard\Request;

use Spatie\LaravelData\Attributes\Validation\ArrayType;
use Spatie\LaravelData\Data;

class ReorderProductVariantImagesRequestData extends Data
{
    /**
     * @param  string[]  $uuids  Ordered array of media UUIDs
     */
    public function __construct(
        #[ArrayType]
        public readonly array $uuids,
    ) {}
}
