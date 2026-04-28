<?php

namespace App\Features\CustomOrder\ClothingOrder\Actions\Dashboard;

use App\Models\ClothingOrder;

class ListClothingOrdersAction
{
    public function execute()
    {
        return ClothingOrder::query()
            ->with(['items'])
            ->latest()
            ->paginate(15);
    }
}
