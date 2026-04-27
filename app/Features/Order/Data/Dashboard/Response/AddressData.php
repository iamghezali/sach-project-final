<?php

namespace App\Features\Order\Data\Dashboard\Response;

use App\Models\Address;
use Spatie\LaravelData\Data;

class AddressData extends Data
{
    public function __construct(
        public int $id,
        public string $fullName,
        public string $addressLine1,
        public ?string $addressLine2,
        public string $willaya,
        public string $postalCode,
        public string $country,
        public string $phone,
    ) {}

    public static function fromModel(Address $address): self
    {
        return new self(
            id: $address->id,
            fullName: $address->full_name,
            addressLine1: $address->address_line_1,
            addressLine2: $address->address_line_2,
            willaya: $address->willaya,
            postalCode: $address->postal_code,
            country: $address->country,
            phone: $address->phone,
        );
    }
}
