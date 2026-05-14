<?php

namespace App\Features\CustomOrder\ClothingOrder\Actions\Dashboard;

use App\Models\ClothingOrderItem;

class ShowClothingOrderItemAction
{
    public function execute(int $orderID, int $ItemID): ClothingOrderItem
    {
        return ClothingOrderItem::query()
            ->where('id', $ItemID)
            ->where('clothing_order_id', $orderID)
            ->with(['tailor', 'media'])
            ->firstOrFail();
    }
}
