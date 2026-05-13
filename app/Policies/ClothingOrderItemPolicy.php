<?php

namespace App\Policies;

use App\Authorization\Enums\Role;
use App\Models\ClothingOrderItem;
use App\Models\User;

class ClothingOrderItemPolicy
{
    public function viewMedia(?User $user, ClothingOrderItem $item): bool
    {
        if ($user?->hasRole(Role::ADMIN)) {
            return true;
        }

        return $user && (
            $user->id === $item->clothingOrder->user_id || $user->id === $item->tailor_id
        );
    }
}
