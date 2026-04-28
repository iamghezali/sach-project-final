<?php

namespace App\Features\CustomOrder\ClothingOrder\Actions\Tailor;

use App\Models\ClothingOrder;
use App\Models\User;

class ListClothingOrdersAction
{
    public function execute(User $tailor)
    {
        return ClothingOrder::query()
            ->whereHas('items', fn ($query) => $query->where('tailor_id', $tailor->id))
            ->with([
                'items' => fn ($query) => $query->where('tailor_id', $tailor->id),
            ])
            ->latest()
            ->paginate(12);
    }
}
