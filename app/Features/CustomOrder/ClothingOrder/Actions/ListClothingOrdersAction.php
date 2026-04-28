<?php

namespace App\Features\CustomOrder\ClothingOrder\Actions;

use App\Features\CustomOrder\ClothingOrder\Data\Shop\Response\ClothingOrderData;
use App\Models\ClothingOrder;
use App\Models\User;
use Spatie\LaravelData\PaginatedDataCollection;

class ListClothingOrdersAction
{
    private const PER_PAGE = 12;

    public function execute(User $user): PaginatedDataCollection
    {
        return
        ClothingOrderData::collect(
            ClothingOrder::query()
                ->where('user_id', $user->id)
                ->with(['items'])
                ->latest()
                ->paginate(self::PER_PAGE),
            PaginatedDataCollection::class
        );
    }
}
