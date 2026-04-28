<?php

namespace App\Features\CustomOrder\ClothingOrder\Actions\Dashboard;

use App\Features\CustomOrder\ClothingOrder\Data\Dashboard\Request\ChangeClothingOrderItemStatusRequestData;
use App\Models\ClothingOrderItem;

class ChangeClothingOrderItemStatusAction
{
    public function execute(int $itemID, ChangeClothingOrderItemStatusRequestData $data): ClothingOrderItem
    {
        $item = ClothingOrderItem::with('clothingOrder.items')
            ->findOrFail($itemID);

        $item->update(['status' => $data->status]);

        $clothingOrder = $item->clothingOrder;
        $clothingOrder->items->find($item->id)->status = $data->status;

        return $item->fresh();
    }
}
