<?php

namespace App\Policies;

use App\Authorization\Enums\Role;
use App\Features\Catalog\Product\Enums\ProductStatus;
use App\Models\Product;
use App\Models\User;

class ProductPolicy
{
    public function viewMedia(?User $user, Product $product): bool
    {
        if ($user?->hasRole(Role::ADMIN)) {
            return true;
        }

        return $product->status === ProductStatus::Published;
    }
}
