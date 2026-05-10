<?php

namespace App\Features\Auth\Controllers;

use App\Features\Auth\Actions\LoginAction;
use App\Features\Auth\Actions\LogoutAction;
use App\Features\Auth\Data\Request\LoginRequestData;
use App\Features\Auth\Data\Response\UserData;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function __construct(
        private readonly LoginAction $loginAction,
        private readonly LogoutAction $logoutAction,
    ) {}

    public function login(LoginRequestData $data, Request $request)
    {
        try {

            $user = $this->loginAction->execute($data, $request);

            return response()->json([
                'message' => 'Login successful',
                'data' => [
                    'user' => UserData::from($user),
                ],
                'redirectTo' => session()->pull('url.intended', $user->homeRoute()),
            ]);

        } catch (AuthenticationException) {

            return response()->json([
                'message' => 'Invalid credentials',
            ], 401);

        }
    }

    public function logout(Request $request)
    {
        $this->logoutAction->execute($request);

        return response()->noContent();
    }

    public function me(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'data' => [
                'user' => $user ? UserData::from($user) : null,
            ],
        ]);
    }
}
