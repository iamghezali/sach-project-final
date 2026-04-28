<?php

namespace App\Features\CustomOrder\ClothingOrder\Actions\Dashboard;

use App\Features\CustomOrder\ClothingOrder\Data\Dashboard\Request\ChangeClothingOrderStatusRequestData;
use App\Models\ClothingOrder;

class ChangeClothingOrderStatusAction
{
    public function execute(int $orderID, ChangeClothingOrderStatusRequestData $data): ClothingOrder
    {
        $clothingOrder = ClothingOrder::findOrFail($orderID);

        $clothingOrder->update(['status' => $data->status]);

        return $clothingOrder->fresh();
    }
}
