<?php

namespace App\Features\CustomOrder\ClothingOrder\Actions\Tailor;

use App\Features\CustomOrder\ClothingOrder\Enums\ClothingOrderItemStatus;
use App\Models\ClothingOrderItem;
use App\Models\User;

class MarkClothingOrderItemAsDoneAction
{
    public function execute(User $tailor, int $orderID, int $itemID): ClothingOrderItem
    {
        $orderItem = ClothingOrderItem::query()
            ->where('tailor_id', $tailor->id)
            ->where('clothing_order_id', $orderID)
            ->findOrFail($itemID);

        $orderItem->update(['status' => ClothingOrderItemStatus::Completed]);

        return $orderItem->fresh();
    }
}
