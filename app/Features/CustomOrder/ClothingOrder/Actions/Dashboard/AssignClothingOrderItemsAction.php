<?php

namespace App\Features\CustomOrder\ClothingOrder\Actions\Dashboard;

use App\Authorization\Enums\Role;
use App\Features\CustomOrder\ClothingOrder\Data\Dashboard\Request\AssignOrderItemsRequestData;
use App\Features\CustomOrder\ClothingOrder\Enums\ClothingOrderItemStatus;
use App\Features\CustomOrder\ClothingOrder\Exceptions\CannotAssignTailorException;
use App\Models\ClothingOrder;
use App\Models\ClothingOrderItem;
use App\Models\User;
use Illuminate\Support\Collection;
use Illuminate\Validation\ValidationException;

class AssignClothingOrderItemsAction
{
    public function execute(AssignOrderItemsRequestData $data): void
    {
        $tailor = User::role(Role::TAILOR)->find($data->tailor_id);

        if (! $tailor) {
            throw ValidationException::withMessages([
                'tailor_id' => 'The selected user is not a registered tailor.',
            ]);
        }

        $clothingOrder = ClothingOrder::with('items')->findOrFail($data->clothing_order_id);

        $targetItems = $data->item_ids === null
            ? $clothingOrder->items
            : $this->resolveItems($clothingOrder, $data->item_ids);

        $hasCancelled = $targetItems->contains(
            fn (ClothingOrderItem $item) => $item->status === ClothingOrderItemStatus::Cancelled
        );

        if ($hasCancelled) {
            throw CannotAssignTailorException::hasCancelledItems();
        }

        ClothingOrderItem::whereIn('id', $targetItems->pluck('id'))
            ->update([
                'tailor_id' => $data->tailor_id,
                'status' => ClothingOrderItemStatus::InProgress,
            ]);
    }

    /** @param int[] $itemIds */
    private function resolveItems(ClothingOrder $clothingOrder, array $itemIds): Collection
    {
        $items = $clothingOrder->items->whereIn('id', $itemIds);

        if ($items->count() !== count(array_unique($itemIds))) {
            throw CannotAssignTailorException::itemsNotInOrder();
        }

        return $items;
    }
}
