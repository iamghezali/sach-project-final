<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Authorization\Enums\Role;
use App\Features\User\Enums\Gender;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

#[Fillable(['name', 'email', 'password', 'gender', 'user_agreement'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, HasRoles, Notifiable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',

            'gender' => Gender::class,
            'user_agreement' => 'datetime',
        ];
    }

    public function addresses(): HasMany
    {
        return $this->hasMany(Address::class);
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    /**
     * Get the URL the user should be redirected to after login.
     */
    public function homeRoute(): string
    {
        return match (true) {
            $this->hasAnyRole(Role::ADMIN, Role::EDITOR) => route('dashboard.overview'),
            $this->hasRole(Role::TAILOR) => route('tailor.overview'),
            $this->hasRole(Role::CUSTOMER) => route('shop.orders.my'),
            default => route('welcome'),
        };
    }
}
