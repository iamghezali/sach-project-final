<?php

namespace App\Features\User\Customer\Data\Shop\Response;

use App\Features\User\Enums\Gender;
use App\Models\User;
use Spatie\LaravelData\Data;

class CustomerData extends Data
{
    public function __construct(
        public string $id,
        public string $name,
        public string $email,
        public Gender $gender,
        public string $joined,
    ) {}

    public static function fromModel(User $user): self
    {
        return new self(
            id: $user->id,
            name: $user->name,
            email: $user->email,
            gender: $user->gender,
            joined: $user->created_at->format('Y-m-d'),
        );
    }
}
