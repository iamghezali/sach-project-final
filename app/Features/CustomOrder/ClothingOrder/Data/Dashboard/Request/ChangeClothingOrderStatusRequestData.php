<?php

namespace App\Features\CustomOrder\ClothingOrder\Data\Dashboard\Request;

use App\Features\CustomOrder\ClothingOrder\Enums\ClothingOrderStatus;
use Illuminate\Validation\Rule;
use Spatie\LaravelData\Data;

class ChangeClothingOrderStatusRequestData extends Data
{
    public function __construct(
        public readonly ClothingOrderStatus $status,
    ) {}

    public static function rules($ctx = null): array
    {
        return [
            'status' => ['required', 'string', Rule::in(ClothingOrderStatus::values())],
        ];
    }
}
