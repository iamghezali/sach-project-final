<?php

namespace App\Features\CustomOrder\ClothingOrder\Actions\Tailor;

use App\Models\ClothingOrder;
use App\Models\User;

class ShowClothingOrderAction
{
    public function execute(int $orderID, User $tailor): ClothingOrder
    {
        return ClothingOrder::query()
            ->whereHas('items', fn ($query) => $query->where('tailor_id', $tailor->id))
            ->with([
                'items' => fn ($query) => $query->where('tailor_id', $tailor->id)
                    ->with('media'),

            ])
            ->findOrFail($orderID);
    }
}
