<?php

namespace App\Features\Catalog\Attribute\Data\Dashboard\Response;

use App\Models\Attribute;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\DataCollection;
use Spatie\LaravelData\Lazy;

class AttributeData extends Data
{
    public function __construct(
        public readonly int $id,
        public readonly string $name,
        public readonly string $slug,
        /** @var DataCollection<int, AttributeValueData> */
        public readonly Lazy|DataCollection $values,
    ) {}

    public static function fromModel(Attribute $attribute): self
    {
        return new self(
            id: $attribute->id,
            name: $attribute->name,
            slug: $attribute->slug,
            values: Lazy::create(
                fn () => AttributeValueData::collect($attribute->values)
            ),
        );
    }
}
