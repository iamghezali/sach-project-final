<?php

namespace App\Features\Auth\Data\Request;

use Illuminate\Support\Facades\Request;
use Spatie\LaravelData\Data;

class LoginRequestData extends Data
{
    public function __construct(
        public readonly string $email,
        public readonly string $password,
        public readonly bool $remember = false,
    ) {}

    public static function rules($ctx = null): array
    {
        return [
            'email' => ['required', 'email', 'max:50'],
            'password' => ['required', 'string', 'max:50'],
            'remember' => ['sometimes', 'boolean'],
        ];
    }

    public static function fromRequest(Request $request): self
    {
        return new self(
            email: $request->string('email')->lower()->trim()->value(),
            password: $request->string('password')->value(),
            remember: $request->boolean('remember'),
        );
    }

    public function toCredentials(): array
    {
        return [
            'email' => $this->email,
            'password' => $this->password,
        ];
    }
}
