<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;

class RedirectAuthenticatedUsers
{
    public function __invoke(Request $request): string
    {
        return $request->user()->homeRoute() ?? '/login';
    }
}
