<?php

namespace App\Features\CustomOrder\ClothingOrder\Actions\Tailor;

use App\Models\ClothingOrderItem;
use App\Models\User;

class ShowClothingOrderItemAction
{
    public function execute(User $tailor, int $orderID, int $itemID): ClothingOrderItem
    {
        return ClothingOrderItem::query()
            ->where('tailor_id', $tailor->id)
            ->where('clothing_order_id', $orderID)
            ->with(['clothingOrder'])
            ->findOrFail($itemID);
    }
}
