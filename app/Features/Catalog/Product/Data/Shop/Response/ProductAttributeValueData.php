<?php

namespace App\Features\Catalog\Product\Data\Shop\Response;

use App\Models\AttributeValue;
use Spatie\LaravelData\Data;

class ProductAttributeValueData extends Data
{
    public function __construct(
        public readonly int $id,
        public readonly string $value,
        public readonly string $slug,
    ) {}

    public static function fromModel(AttributeValue $attributeValue): self
    {
        return new self(
            id: $attributeValue->id,
            value: $attributeValue->value,
            slug: $attributeValue->slug,
        );
    }
}
