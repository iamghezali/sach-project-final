<?php

namespace App\Policies;

use App\Authorization\Enums\Role;
use App\Features\Catalog\Product\Enums\ProductStatus;
use App\Models\ProductVariant;
use App\Models\User;

class ProductVariantPolicy
{
    public function viewMedia(?User $user, ProductVariant $variant): bool
    {
        if ($user?->hasRole(Role::ADMIN)) {
            return true;
        }

        return $variant->is_active && $variant->product->status === ProductStatus::Published;
    }
}
