<?php

namespace App\Features\User\Editor\Actions\Dashboard;

use App\Authorization\Enums\Role;
use App\Features\User\Editor\Data\Dashboard\Request\RegisterEditorRequestData;
use App\Models\User;
use Illuminate\Validation\ValidationException;

class RegisterEditorAction
{
    public function execute(RegisterEditorRequestData $data)
    {
        $user = User::where('email', $data->email)->firstOrFail();

        if ($user->hasRole(Role::EDITOR->value)) {
            throw ValidationException::withMessages([
                'email' => 'This user is already an Editor.',
            ]);
        }

        $user->syncRoles([Role::EDITOR]);

        return $user;
    }
}
