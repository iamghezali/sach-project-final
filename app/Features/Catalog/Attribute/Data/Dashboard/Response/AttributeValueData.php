<?php

namespace App\Features\Catalog\Attribute\Data\Dashboard\Response;

use Spatie\LaravelData\Data;

class AttributeValueData extends Data
{
    public function __construct(
        public readonly int $id,
        public readonly string $value,
        public readonly string $slug,
        public readonly int $position,
    ) {}
}
