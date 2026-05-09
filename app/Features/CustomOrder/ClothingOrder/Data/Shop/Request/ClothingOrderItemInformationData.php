<?php

namespace App\Features\CustomOrder\ClothingOrder\Data\Shop\Request;

use App\Features\CustomOrder\ClothingOrder\Enums\Gender;
use App\Features\CustomOrder\ClothingOrder\Enums\ItemFor;
use App\Features\CustomOrder\ClothingOrder\Enums\ItemType;
use Illuminate\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Support\Validation\ValidationContext;

class ClothingOrderItemInformationData extends Data
{
    public function __construct(
        public readonly string $title,
        public readonly ItemFor $item_is_for,
        public readonly ItemType $item_type,
        public readonly Gender $item_for_gender,
        public readonly string $looking_for,
        public readonly bool $provide_fabric,
        public readonly string $description,
        public readonly int $quantity,
        public readonly string $preferred_due_date,
    ) {}

    public static function rules(?ValidationContext $context = null): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'item_is_for' => ['required', Rule::in(ItemFor::values())],        // [NEW]
            'item_type' => ['required', Rule::in(ItemType::values())],         // [NEW]
            'item_for_gender' => ['required', Rule::in(Gender::values())],
            'looking_for' => ['required', 'string', 'max:255'],
            'provide_fabric' => ['required', 'boolean'],
            'description' => ['required', 'string', 'max:2000'],
            'quantity' => ['required', 'integer', 'min:1'],
            'preferred_due_date' => ['required', 'date', 'after:'.now()->addDays(5)->toDateString()],
        ];
    }
}
