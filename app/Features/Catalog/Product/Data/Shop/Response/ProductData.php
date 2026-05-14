<?php

namespace App\Features\Catalog\Product\Data\Shop\Response;

use App\Models\Product;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\DataCollection;
use Spatie\LaravelData\Lazy;

class ProductData extends Data
{
    public function __construct(
        public readonly int $id,
        public readonly string $name,
        public readonly string $slug,
        public readonly ?string $description,
        public readonly bool $is_available,
        public readonly ?string $starting_from,
        public readonly ?string $thumbnail,

        /** @var Lazy|DataCollection<int, ProductAttributeData> */
        public readonly Lazy|DataCollection $attributes,

        /** @var DataCollection<int, ProductVariantData> */
        public readonly Lazy|DataCollection $variants,

        /** @var Lazy|DataCollection<int, ProductMediaData> */
        public readonly Lazy|DataCollection $images,
    ) {}

    public static function fromModel(Product $product): self
    {
        return new self(
            id: $product->id,
            name: $product->name,
            slug: $product->slug,
            description: $product->description,
            is_available: $product->isAvailable(),
            starting_from: $product->activeVariants->min('price') ?? '0.00',
            thumbnail: $product->thumbnail,
            attributes: Lazy::create(fn () => self::deriveAttributes($product)),
            variants: Lazy::create(
                fn () => ProductVariantData::collect(
                    $product->activeVariants
                        ->map(fn ($v) => ProductVariantData::fromModel($v))
                        ->all()
                )
            ),
            images: Lazy::create(
                fn () => new DataCollection(
                    ProductMediaData::class,
                    $product->getMedia('images')
                        ->map(fn ($m) => ProductMediaData::fromModel($m))
                        ->all()
                )
            ),
        );
    }

    private static function deriveAttributes(Product $product): DataCollection
    {
        $grouped = $product->variants
            ->flatMap(fn ($v) => $v->attributeValues)
            ->unique('id')
            ->groupBy('attribute_id');

        return new DataCollection(
            ProductAttributeData::class,
            $grouped
                ->map(fn ($values, $attributeId) => new ProductAttributeData(
                    id: $attributeId,
                    name: $values->first()->attribute->name,
                    values: new DataCollection(
                        ProductAttributeValueData::class,
                        $values
                            ->sortBy('position')
                            ->map(fn ($av) => ProductAttributeValueData::fromModel($av))
                            ->values()
                            ->all()
                    ),
                ))
                ->values()
                ->all()
        );
    }
}
