<?php

use App\Authorization\AbilityMap;
use App\Authorization\Enums\Role;
use Illuminate\Database\Migrations\Migration;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role as SpatieRole;
use Spatie\Permission\PermissionRegistrar;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // 1. Create every permission that appears anywhere in the map
        foreach (AbilityMap::allPermissions() as $permission) {
            Permission::firstOrCreate(['name' => $permission->value]);
        }

        // 2. Create each role and sync its merged permissions
        foreach (Role::cases() as $role) {
            $spatieRole = SpatieRole::firstOrCreate(['name' => $role->value]);

            $spatieRole->syncPermissions(
                array_map(
                    fn ($p) => $p->value,
                    AbilityMap::permissionsFor($role)
                )
            );
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        foreach (Role::cases() as $role) {
            SpatieRole::findByName($role->value)?->delete();
        }

        foreach (AbilityMap::allPermissions() as $permission) {
            Permission::findByName($permission->value)?->delete();
        }
    }
};
