<?php

use App\Authorization\Enums\Role;
use App\Features\User\Enums\Gender;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Hash;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $admins = config('admins.users', []);

        if (empty($admins)) {
            throw new Exception('Cannot run migration: no ADMIN keys found in .env');
        }

        foreach ($admins as $admin) {

            $user = User::firstOrNew(['email' => $admin['email']]);
            $user->forceFill([
                'name' => $admin['name'],
                'password' => Hash::make($admin['password']),
                'gender' => Gender::Female->value,
                'email_verified_at' => now(),
            ])->save();

            $user->assignRole(Role::ADMIN);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $admins = config('admins.users', []);

        foreach ($admins as $admin) {
            User::where('email', $admin['email'])->delete();
        }
    }
};
