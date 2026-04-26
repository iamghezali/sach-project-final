<?php

namespace App\Features\User\Tailor\Actions\Dashboard;

use App\Authorization\Enums\Role;
use App\Features\User\Tailor\Data\Dashboard\Request\RegisterTailorRequestData;
use App\Models\User;
use Illuminate\Validation\ValidationException;

class RegisterTailorAction
{
    public function execute(RegisterTailorRequestData $data)
    {
        $user = User::where('email', $data->email)->firstOrFail();

        if ($user->hasRole(Role::TAILOR->value)) {
            throw ValidationException::withMessages([
                'email' => 'This user is already a Tailor.',
            ]);
        }

        $user->syncRoles([Role::TAILOR]);

        return $user;
    }
}
