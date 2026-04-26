<?php

namespace App\Features\User\Customer\Controllers\Dashboard;

use App\Features\User\Customer\Actions\Dashboard\ListCustomersAction;
use App\Http\Controllers\Controller;

class CustomerController extends Controller
{
    public function __construct(
        private readonly ListCustomersAction $listCustomersAction,
    ) {}

    public function index()
    {
        return $this->listCustomersAction->execute();
    }
}
