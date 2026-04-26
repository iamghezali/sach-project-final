<?php

namespace App\Features\User\Customer\Actions\Dashboard;

use App\Authorization\Enums\Role;
use App\Features\User\Customer\Data\Dashboard\Response\CustomerData;
use App\Models\User;
use Spatie\LaravelData\PaginatedDataCollection;

class ListCustomersAction
{
    public function execute(): PaginatedDataCollection
    {
        return CustomerData::collect(
            User::role(Role::CUSTOMER->value)
                ->latest()
                ->paginate(12),

            PaginatedDataCollection::class
        );
    }
}
