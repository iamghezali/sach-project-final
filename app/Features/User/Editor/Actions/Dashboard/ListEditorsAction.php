<?php

namespace App\Features\User\Editor\Actions\Dashboard;

use App\Authorization\Enums\Role;
use App\Features\User\Editor\Data\Dashboard\Response\EditorData;
use App\Models\User;
use Spatie\LaravelData\PaginatedDataCollection;

class ListEditorsAction
{
    public function execute(): PaginatedDataCollection
    {
        return EditorData::collect(
            User::role(Role::EDITOR->value)
                ->latest()
                ->paginate(12),

            PaginatedDataCollection::class
        );
    }
}
