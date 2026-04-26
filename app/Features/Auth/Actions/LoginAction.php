<?php

namespace App\Features\Auth\Actions;

use App\Features\Auth\Data\Request\LoginRequestData;
use App\Models\User;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class LoginAction
{
    public function execute(LoginRequestData $data, Request $request): User
    {
        if (! Auth::attempt($data->toCredentials(), $data->remember)) {

            Log::warning('Login attempt failed', [
                'email' => $data->email,
                'ip_address' => $request->ip(),
            ]);

            throw new AuthenticationException('Invalid credentials');
        }

        $request->session()->regenerate();

        return Auth::user();
    }
}
