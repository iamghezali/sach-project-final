<?php

namespace App\Features\CustomOrder\ClothingOrder\Data\Dashboard\Response;

use App\Models\User;
use Spatie\LaravelData\Data;

class TailorData extends Data
{
    public function __construct(
        public readonly int $id,
        public readonly string $name,
        public readonly string $email,
    ) {}

    public static function fromModel(User $user): self
    {
        return new self(
            id: $user->id,
            name: $user->name,
            email: $user->email,
        );
    }
}
