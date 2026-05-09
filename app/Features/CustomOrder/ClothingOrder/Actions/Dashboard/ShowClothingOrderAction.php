<?php

namespace App\Features\CustomOrder\ClothingOrder\Actions\Dashboard;

use App\Models\ClothingOrder;

class ShowClothingOrderAction
{
    public function execute(int $orderId): ClothingOrder
    {
        return ClothingOrder::query()
            ->with(['items', 'user', 'items.tailor'])
            ->findOrFail($orderId);
    }
}
