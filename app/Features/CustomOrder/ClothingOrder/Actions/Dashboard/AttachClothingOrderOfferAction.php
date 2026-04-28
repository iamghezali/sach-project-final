<?php

namespace App\Features\CustomOrder\ClothingOrder\Actions\Dashboard;

use App\Features\CustomOrder\ClothingOrder\Data\Dashboard\Request\OfferItemData;
use App\Features\CustomOrder\ClothingOrder\Enums\ClothingOrderItemStatus;
use App\Features\CustomOrder\ClothingOrder\Enums\ClothingOrderStatus;
use App\Models\ClothingOrder;
use App\Models\ClothingOrderItem;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class AttachClothingOrderOfferAction
{
    public function execute(int $orderID, Collection $offers): Collection
    {
        $allowedStatuses = [
            ClothingOrderItemStatus::Pending,
            ClothingOrderItemStatus::Negotiating,
        ];

        return DB::transaction(function () use ($orderID, $offers, $allowedStatuses) {
            $items = $offers->map(function (OfferItemData $data) use ($orderID, $allowedStatuses) {
                $item = ClothingOrderItem::query()
                    ->where('clothing_order_id', $orderID)
                    ->where('id', $data->id)
                    ->firstOrFail();

                if (! \in_array($item->status, $allowedStatuses, true)) {
                    throw ValidationException::withMessages([
                        'items' => "Item [{$item->id}] cannot receive an offer in its current status [{$item->status->label()}].",
                    ]);
                }

                $item->update([
                    'offer_price' => $data->offer_price,
                    'offer_due_date' => $data->offer_due_date,
                    'status' => ClothingOrderItemStatus::Offered,
                ]);

                return $item;
            });

            ClothingOrder::findOrFail($orderID)->update([
                'status' => ClothingOrderStatus::Offered,
            ]);

            return $items;
        });
    }
}
