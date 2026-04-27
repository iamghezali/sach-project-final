<?php

namespace App\Features\CustomOrder\ClothingOrder\Data\Shop\Request;

use App\Features\CustomOrder\ClothingOrder\Enums\Gender;
use Illuminate\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Support\Validation\ValidationContext;

class ClothingOrderItemInformationData extends Data
{
    public function __construct(
        public readonly string $title,
        public readonly Gender $gender,
        public readonly string $looking_for,
        public readonly string $description,
        public readonly int $quantity,
        public readonly string $preferred_due_date,
    ) {}

    public static function rules(?ValidationContext $context = null): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'gender' => ['required', Rule::in(Gender::values())],
            'looking_for' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:2000'],
            'quantity' => ['required', 'integer', 'min:1'],
            'preferred_due_date' => ['required', 'date', 'after:'.now()->addDays(5)->toDateString()],
        ];
    }
}
