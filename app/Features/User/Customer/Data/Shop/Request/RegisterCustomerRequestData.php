<?php

namespace App\Features\User\Customer\Data\Shop\Request;

use App\Features\User\Enums\Gender;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Spatie\LaravelData\Data;

class RegisterCustomerRequestData extends Data
{
    public function __construct(
        public string $first_name,
        public string $last_name,
        public Gender $gender,
        public string $email,
        public string $phone,
        public string $password,
        public bool $user_agreement
    ) {}

    public static function rules($ctx = null): array
    {
        return [
            'first_name' => ['required', 'string', 'max:50'],
            'last_name' => ['required', 'string', 'max:50'],
            'phone' => ['required', 'string', 'size:10'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'gender' => ['required', Rule::enum(Gender::class)],
            'password' => ['required', 'string', Password::defaults()],
            'user_agreement' => ['required', 'boolean', 'in:true,1'],
        ];
    }

    public static function fromRequest(Request $request): self
    {
        return new self(
            first_name: $request->string('first_name')->trim()->value(),
            last_name: $request->string('last_name')->trim()->value(),
            phone: $request->string('phone')->trim()->value(),
            gender: $request->enum('gender', Gender::class),
            email: $request->string('email')->lower()->trim()->value(),
            password: $request->string('password')->value(),
            user_agreement: $request->boolean('user_agreement'),
        );
    }

    public function name(): string
    {
        return "{$this->first_name} {$this->last_name}";
    }

    public function toArray(): array
    {
        return [
            'name' => $this->name(),
            'phone' => $this->phone,
            'gender' => $this->gender,
            'email' => $this->email,
            'password' => $this->password,
            'user_agreement' => now(),
        ];
    }
}
