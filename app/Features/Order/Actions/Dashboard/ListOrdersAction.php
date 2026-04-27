<?php

namespace App\Features\Order\Actions\Dashboard;

use App\Features\Order\Data\Dashboard\Response\OrderData;
use App\Models\Order;
use Spatie\LaravelData\PaginatedDataCollection;

class ListOrdersAction
{
    private const PER_PAGE = 12;

    public function execute(): PaginatedDataCollection
    {
        return OrderData::collect(
            Order::with('user')
                ->latest()
                ->paginate(self::PER_PAGE),
            PaginatedDataCollection::class
        );
    }
}
