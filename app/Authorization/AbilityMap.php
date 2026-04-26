<?php

namespace App\Authorization;

use App\Authorization\Enums\Permission;
use App\Authorization\Enums\Role;

final class AbilityMap
{
    /**
     * @return array<string, array<string, Permission[]>>
     */
    public static function map(): array
    {
        return [

            'USER MANAGEMENT' => [

                Role::ADMIN->value => [
                    Permission::REGISTER_CUSTOMER,
                    Permission::REGISTER_TAILOR,
                    Permission::REGISTER_EDITOR,
                ],

                Role::EDITOR->value => [
                    Permission::REGISTER_CUSTOMER,
                    Permission::REGISTER_TAILOR,
                ],

            ],
        ];
    }

    /**
     * All permissions assigned to a given role, merged across every group.
     */
    public static function permissionsFor(Role $role): array
    {
        $permissions = [];

        foreach (self::map() as $group) {
            foreach ($group[$role->value] ?? [] as $permission) {
                $permissions[$permission->value] = $permission;
            }
        }

        return array_values($permissions);
    }

    /**
     * Every unique permission declared in the map (to seed the permissions table).
     */
    public static function allPermissions(): array
    {
        $permissions = [];

        foreach (self::map() as $group) {
            foreach ($group as $rolePermissions) {
                foreach ($rolePermissions as $permission) {
                    $permissions[$permission->value] = $permission;
                }
            }
        }

        return array_values($permissions);
    }
}
