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
    public function execute(AssignOrderItemsRequestData $data, int $orderID): void
    {
        $clothingOrder = ClothingOrder::with('items')->findOrFail($orderID);

        $targetItems = $data->item_id === null
            ? $clothingOrder->items
            : $this->resolveItem($clothingOrder, $data->item_id);

        if ($data->tailor_email === null) {
            $this->unassign($targetItems);
        } else {
            $this->assign($data, $targetItems);
        }
    }

    private function assign(AssignOrderItemsRequestData $data, Collection $targetItems): void
    {
        $tailor = User::role(Role::TAILOR)->where('email', $data->tailor_email)->first();

        if (! $tailor) {
            throw ValidationException::withMessages([
                'tailor_email' => 'The selected user is not a registered tailor.',
            ]);
        }

        $hasCancelled = $targetItems->contains(
            fn (ClothingOrderItem $item) => $item->status === ClothingOrderItemStatus::Cancelled
        );

        if ($hasCancelled) {
            throw CannotAssignTailorException::hasCancelledItems();
        }

        ClothingOrderItem::whereIn('id', $targetItems->pluck('id'))
            ->update([
                'tailor_id' => $tailor->id,
                'status' => ClothingOrderItemStatus::InProgress,
            ]);
    }

    private function unassign(Collection $targetItems): void
    {
        ClothingOrderItem::whereIn('id', $targetItems->pluck('id'))
            ->update([
                'tailor_id' => null,
                'status' => ClothingOrderItemStatus::Pending,
            ]);
    }

    private function resolveItem(ClothingOrder $clothingOrder, int $itemId): Collection
    {
        $item = $clothingOrder->items->firstWhere('id', $itemId);

        if (! $item) {
            throw CannotAssignTailorException::itemNotInOrder();
        }

        return collect([$item]);
    }
}
