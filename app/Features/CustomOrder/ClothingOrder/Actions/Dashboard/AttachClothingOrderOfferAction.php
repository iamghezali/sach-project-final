<?php

namespace App\Features\CustomOrder\ClothingOrder\Actions\Dashboard;

use App\Features\CustomOrder\ClothingOrder\Data\Dashboard\Request\AttachOfferRequestData;
use App\Features\CustomOrder\ClothingOrder\Enums\ClothingOrderItemStatus;
use App\Models\ClothingOrderItem;
use Illuminate\Validation\ValidationException;

class AttachClothingOrderOfferAction
{
    public function execute(int $orderID, AttachOfferRequestData $data): ClothingOrderItem
    {
        $allowedStatuses = [
            ClothingOrderItemStatus::Pending,
            ClothingOrderItemStatus::Negotiating,
        ];

        $item = ClothingOrderItem::query()
            ->where('clothing_order_id', $orderID)
            ->where('id', $data->item_id)
            ->firstOrFail();

        if (! \in_array($item->status, $allowedStatuses, true)) {
            throw ValidationException::withMessages([
                'item_id' => "Item [{$item->id}] cannot receive an offer in its current status [{$item->status->label()}].",
            ]);
        }

        $item->update([
            'offer_price' => $data->offer_price,
            'offer_due_date' => $data->offer_due_date,
            'status' => ClothingOrderItemStatus::Offered,
        ]);

        return $item;
    }
}
