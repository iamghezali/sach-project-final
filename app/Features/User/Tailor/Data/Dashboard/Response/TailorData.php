<?php

namespace App\Features\User\Tailor\Data\Dashboard\Response;

use App\Models\User;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Lazy;

class TailorData extends Data
{
    public function __construct(
        public string $id,
        public string $name,
        public string $email,
        public string $joined,
        public Lazy|string $role,
    ) {}

    public static function fromModel(User $user): self
    {
        return new self(
            id: $user->id,
            name: $user->name,
            email: $user->email,
            joined: $user->created_at->format('Y-m-d'),
            role: Lazy::create(fn () => $user->getRoleNames()->first()),
        );
    }
}
