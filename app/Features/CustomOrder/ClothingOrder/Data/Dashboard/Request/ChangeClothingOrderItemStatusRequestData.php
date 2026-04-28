<?php

namespace App\Features\CustomOrder\ClothingOrder\Data\Dashboard\Request;

use App\Features\CustomOrder\ClothingOrder\Enums\ClothingOrderItemStatus;
use Illuminate\Validation\Rule;
use Spatie\LaravelData\Data;

class ChangeClothingOrderItemStatusRequestData extends Data
{
    public function __construct(
        public readonly ClothingOrderItemStatus $status,
    ) {}

    public static function rules($ctx = null): array
    {
        return [
            'status' => ['required', 'string', Rule::in(ClothingOrderItemStatus::values())],
        ];
    }
}
