<?php

namespace App\Features\CustomOrder\ClothingOrder\Actions\Tailor;

use App\Features\CustomOrder\ClothingOrder\Data\Tailor\Response\ClothingOrderData;
use App\Models\ClothingOrder;
use App\Models\User;
use Spatie\LaravelData\PaginatedDataCollection;

class ListClothingOrdersAction
{
    private const PER_PAGE = 12;

    public function execute(User $tailor): PaginatedDataCollection
    {
        return
        ClothingOrderData::collect(
            ClothingOrder::query()
                ->whereHas('items', fn ($query) => $query->where('tailor_id', $tailor->id))
                ->with([
                    'items' => fn ($query) => $query->where('tailor_id', $tailor->id),
                ])
                ->latest()
                ->paginate(self::PER_PAGE),
            PaginatedDataCollection::class
        );
    }
}
