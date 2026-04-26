<?php

return [
    'users' => array_filter([
        env('ADMIN_1_EMAIL') ? [
            'name' => env('ADMIN_1_NAME'),
            'email' => env('ADMIN_1_EMAIL'),
            'password' => env('ADMIN_1_PASSWORD'),
        ] : null,

        env('ADMIN_2_EMAIL') ? [
            'name' => env('ADMIN_2_NAME'),
            'email' => env('ADMIN_2_EMAIL'),
            'password' => env('ADMIN_2_PASSWORD'),
        ] : null,
    ]),
];
