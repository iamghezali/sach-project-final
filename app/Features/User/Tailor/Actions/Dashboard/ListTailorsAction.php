<?php

namespace App\Features\User\Tailor\Actions\Dashboard;

use App\Authorization\Enums\Role;
use App\Features\User\Tailor\Data\Dashboard\Response\TailorData;
use App\Models\User;
use Spatie\LaravelData\PaginatedDataCollection;

class ListTailorsAction
{
    public function execute(): PaginatedDataCollection
    {
        return TailorData::collect(
            User::role(Role::TAILOR->value)
                ->latest()
                ->paginate(12),

            PaginatedDataCollection::class
        );
    }
}
