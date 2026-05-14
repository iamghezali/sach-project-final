<?php

namespace App\Features\CustomOrder\ClothingOrder\Actions\Shop;

use App\Models\ClothingOrder;
use App\Models\ClothingOrderItem;
use App\Models\User;

class ShowClothingOrderItemAction
{
    public function execute(User $user, int $orderId, int $itemId): ClothingOrderItem
    {
        $order = ClothingOrder::query()
            ->where('user_id', $user->id)
            ->findOrFail($orderId);

        return $order->items()
            ->findOrFail($itemId);
    }
}
