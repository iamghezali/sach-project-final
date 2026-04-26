<?php

namespace App\Features\User\Editor\Data\Dashboard\Request;

use Spatie\LaravelData\Data;

class RegisterEditorRequestData extends Data
{
    public function __construct(
        public string $email,
    ) {}

    public static function rules($ctx = null): array
    {
        return [
            'email' => ['required', 'email', 'max:255', 'exists:users,email'],
        ];
    }

    public static function fromRequest($request): self
    {
        return new self(
            email: $request->string('email')->lower()->trim()->value(),
        );
    }

    public function toArray(): array
    {
        return [
            'email' => $this->email,
        ];
    }
}
