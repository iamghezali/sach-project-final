<?php

namespace App\Features\CustomOrder\ClothingOrder\Actions\Shop;

use App\Features\CustomOrder\ClothingOrder\Data\Shop\Request\ClothingOrderItemData;
use App\Features\CustomOrder\ClothingOrder\Data\Shop\Request\ClothingOrderRequestData;
use App\Features\CustomOrder\ClothingOrder\Enums\ClothingOrderStatus;
use App\Models\ClothingOrder;
use App\Models\ClothingOrderItem;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class CreateClothingOrderAction
{
    public function execute(User $user, ClothingOrderRequestData $data): ClothingOrder
    {
        return DB::transaction(function () use ($user, $data) {
            $order = ClothingOrder::create([
                'user_id' => $user->id,
                'title' => $data->title,
                'status' => ClothingOrderStatus::Pending,
            ]);

            $data->items
                ->toCollection()
                ->each(fn (ClothingOrderItemData $item) => $this->createItem($order, $item));

            return $order->load('items', 'items.media');
        });
    }

    private function createItem(ClothingOrder $order, ClothingOrderItemData $data): ClothingOrderItem
    {
        $item = ClothingOrderItem::create([
            'clothing_order_id' => $order->id,
            ...$data->information->toArray(),
            ...$data->measurements->toArray(),
        ]);

        foreach ($data->images as $image) {
            $item->addMedia($image)->toMediaCollection('images');
        }

        return $item;
    }
}
