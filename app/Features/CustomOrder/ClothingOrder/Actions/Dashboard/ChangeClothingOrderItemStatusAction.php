<?php

namespace App\Features\CustomOrder\ClothingOrder\Actions\Dashboard;

use App\Features\CustomOrder\ClothingOrder\Data\Dashboard\Request\ChangeClothingOrderItemStatusRequestData;
use App\Models\ClothingOrderItem;

class ChangeClothingOrderItemStatusAction
{
    public function execute(int $orderID, int $itemID, ChangeClothingOrderItemStatusRequestData $data): ClothingOrderItem
    {
        $item = ClothingOrderItem::where('clothing_order_id', $orderID)
            ->findOrFail($itemID);

        $item->update(['status' => $data->status]);

        return $item->fresh();

    }
}
