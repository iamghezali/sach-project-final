<?php

namespace App\Features\User\Customer\Actions\Shop;

use App\Authorization\Enums\Role;
use App\Features\User\Customer\Data\Shop\Request\RegisterCustomerRequestData;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class RegisterCustomerAction
{
    public function execute(RegisterCustomerRequestData $data): User
    {
        $customer = User::create($data->toArray())
            ->assignRole(Role::CUSTOMER->value);

        Auth::login($customer, true);

        return Auth::user();
    }
}
