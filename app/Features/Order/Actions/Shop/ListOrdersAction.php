<?php

namespace App\Features\Order\Actions\Shop;

use App\Features\Order\Data\Shop\Response\OrderData;
use App\Models\Order;
use App\Models\User;
use Spatie\LaravelData\PaginatedDataCollection;

class ListOrdersAction
{
    private const PER_PAGE = 12;

    public function execute(User $user): PaginatedDataCollection
    {
        return
        OrderData::collect(
            Order::where('user_id', $user->id)
                ->latest()
                ->paginate(self::PER_PAGE),
            PaginatedDataCollection::class
        );
    }
}
