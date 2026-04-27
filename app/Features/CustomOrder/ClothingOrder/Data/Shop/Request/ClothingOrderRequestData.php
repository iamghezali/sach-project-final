<?php

namespace App\Features\CustomOrder\ClothingOrder\Data\Shop\Request;

use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\DataCollection;
use Spatie\LaravelData\Support\Validation\ValidationContext;

class ClothingOrderRequestData extends Data
{
    public function __construct(
        public readonly string $title,
        #[DataCollectionOf(ClothingOrderItemData::class)]
        public readonly DataCollection $items,
    ) {}

    public static function rules(?ValidationContext $context = null): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'items' => ['required', 'array', 'min:1'],
        ];
    }

    public function toArray(): array
    {
        return [
            'title' => $this->title,
            'items' => $this->items
                ->toCollection()
                ->map(fn (ClothingOrderItemData $item) => $item->toArray())
                ->all(),
        ];
    }
}
