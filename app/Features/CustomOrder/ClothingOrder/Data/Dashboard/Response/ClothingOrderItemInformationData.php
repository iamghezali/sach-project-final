<?php

namespace App\Features\CustomOrder\ClothingOrder\Data\Dashboard\Response;

use App\Features\CustomOrder\ClothingOrder\Enums\Gender;
use App\Features\CustomOrder\ClothingOrder\Enums\ItemFor;
use App\Features\CustomOrder\ClothingOrder\Enums\ItemType;
use App\Models\ClothingOrderItem;
use Spatie\LaravelData\Data;

class ClothingOrderItemInformationData extends Data
{
    public function __construct(
        public readonly string $title,
        public readonly ItemFor $item_is_for,
        public readonly ItemType $item_type,
        public readonly Gender $item_for_gender,
        public readonly string $looking_for,
        public readonly string $description,
        public readonly bool $provide_fabric,
        public readonly int $quantity,
        public readonly string $preferred_due_date,
    ) {}

    public static function fromModel(ClothingOrderItem $item): self
    {
        return new self(
            title: $item->title,
            item_is_for: $item->item_is_for,
            item_type: $item->item_type,
            item_for_gender: $item->item_for_gender,
            looking_for: $item->looking_for,
            description: $item->description,
            provide_fabric: $item->provide_fabric,
            quantity: $item->quantity,
            preferred_due_date: $item->preferred_due_date->format('Y-m-d'),
        );
    }
}
