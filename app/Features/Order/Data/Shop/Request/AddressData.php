<?php

namespace App\Features\Order\Data\Shop\Request;

use Spatie\LaravelData\Data;

class AddressData extends Data
{
    public function __construct(
        public string $full_name,
        public string $address_line_1,
        public string $willaya,
        public string $postal_code,
        public string $country,
        public string $phone,
        public ?string $address_line_2 = null,
    ) {}

    public static function rules($ctx = null): array
    {
        return [
            'full_name' => ['required', 'string', 'max:255'],
            'address_line_1' => ['required', 'string', 'max:255'],
            'address_line_2' => ['nullable', 'string', 'max:255'],
            'willaya' => ['required', 'string', 'max:100'],
            'postal_code' => ['required', 'string', 'max:20'],
            'country' => ['required', 'string', 'max:50'],
            'phone' => ['required', 'string', 'max:20'],
        ];
    }

    public function toArray(): array
    {
        return [
            'full_name' => $this->full_name,
            'address_line_1' => $this->address_line_1,
            'address_line_2' => $this->address_line_2,
            'willaya' => $this->willaya,
            'postal_code' => $this->postal_code,
            'country' => $this->country,
            'phone' => $this->phone,
        ];
    }
}
