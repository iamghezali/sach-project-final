<?php

namespace App\Features\Order\Data\Dashboard\Request;

use App\Features\Order\Enums\OrderStatus;
use Illuminate\Validation\Rule;
use Spatie\LaravelData\Data;

class ChangeOrderStatusRequestData extends Data
{
    public function __construct(
        public OrderStatus $status,
    ) {}

    public static function rules($ctx = null): array
    {
        return [
            'status' => ['required', 'string', Rule::in(OrderStatus::values())],
        ];
    }
}
