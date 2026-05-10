<?php

namespace App\Features\User\Customer\Controllers\Shop;

use App\Features\User\Customer\Actions\Shop\RegisterCustomerAction;
use App\Features\User\Customer\Data\Shop\Request\RegisterCustomerRequestData;
use App\Features\User\Customer\Data\Shop\Response\CustomerData;
use App\Http\Controllers\Controller;

class CustomerController extends Controller
{
    public function __construct(
        private readonly RegisterCustomerAction $registerCustomerAction,
    ) {}

    public function register(RegisterCustomerRequestData $data)
    {
        $customer = $this->registerCustomerAction->execute($data);

        return response()->json([
            'message' => 'Registration successful',
            'data' => [
                'user' => CustomerData::from($customer),
            ],
            'redirectTo' => session()->pull('url.intended', $customer->homeRoute()),
        ]);
    }
}
