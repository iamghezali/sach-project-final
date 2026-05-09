<?php

namespace App\Features\CustomOrder\ClothingOrder\Actions\Dashboard;

use App\Features\CustomOrder\ClothingOrder\Data\Dashboard\Response\ClothingOrderData;
use App\Models\ClothingOrder;
use Spatie\LaravelData\PaginatedDataCollection;

class ListClothingOrdersAction
{
    private const PER_PAGE = 12;

    public function execute()
    {
        return
        ClothingOrderData::collect(
            ClothingOrder::query()
                ->latest()
                ->paginate(self::PER_PAGE),
            PaginatedDataCollection::class
        );
    }
}
