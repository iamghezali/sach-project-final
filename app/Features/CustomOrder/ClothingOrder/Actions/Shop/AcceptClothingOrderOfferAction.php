<?php

namespace App\Features\CustomOrder\ClothingOrder\Actions\Shop;

use App\Features\CustomOrder\ClothingOrder\Enums\ClothingOrderItemStatus;
use App\Features\CustomOrder\ClothingOrder\Enums\ClothingOrderStatus;
use App\Models\ClothingOrder;
use App\Models\ClothingOrderItem;
use Illuminate\Support\Facades\DB;

class AcceptClothingOrderOfferAction
{
    public function execute(ClothingOrder $order, bool $accept, ?ClothingOrderItem $item = null): ClothingOrder
    {
        return DB::transaction(function () use ($order, $accept, $item) {
            if ($item !== null) {
                $this->handleItemCancel($order, $item);
            } else {
                $this->handleOrderLevel($order, $accept);
            }

            return $order->fresh('items');
        });
    }

    // item-level: cancel only — clears the offer and sends order back to negotiating
    private function handleItemCancel(ClothingOrder $order, ClothingOrderItem $item): void
    {
        $item->update([
            'status' => ClothingOrderItemStatus::Cancelled,
            'offer_price' => null,
            'offer_due_date' => null,
        ]);

        $order->update(['status' => ClothingOrderStatus::Negotiating]);
    }

    // order-level: accept all offered items, or cancel everything permanently
    private function handleOrderLevel(ClothingOrder $order, bool $accept): void
    {
        if (! $accept) {
            $order->items()->update(['status' => ClothingOrderItemStatus::Cancelled]);
            $order->update(['status' => ClothingOrderStatus::Cancelled]);

            return;
        }

        $order->items()
            ->where('status', ClothingOrderItemStatus::Offered)
            ->update(['status' => ClothingOrderItemStatus::Accepted]);

        $order->update(['status' => ClothingOrderStatus::Accepted]);
    }
}
