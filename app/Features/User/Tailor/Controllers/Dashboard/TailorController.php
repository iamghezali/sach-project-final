<?php

namespace App\Features\User\Tailor\Controllers\Dashboard;

use App\Features\User\Tailor\Actions\Dashboard\ListTailorsAction;
use App\Features\User\Tailor\Actions\Dashboard\RegisterTailorAction;
use App\Features\User\Tailor\Data\Dashboard\Request\RegisterTailorRequestData;
use App\Features\User\Tailor\Data\Dashboard\Response\TailorData;
use App\Http\Controllers\Controller;
use Illuminate\Validation\ValidationException;

class TailorController extends Controller
{
    public function __construct(
        private readonly RegisterTailorAction $registerTailorAction,
        private readonly ListTailorsAction $listTailorsAction,
    ) {}

    public function register(RegisterTailorRequestData $data)
    {
        try {

            $tailor = $this->registerTailorAction->execute($data);

            return response()->json([
                'message' => 'User added as Tailor successfully.',
                'data' => [
                    'user' => TailorData::from($tailor)->include('role'),
                ],
            ]);

        } catch (ValidationException $e) {

            return response()->json([
                'message' => $e->getMessage(),
                'errors' => $e->errors(),
            ], 422);

        }

    }

    public function index()
    {
        return response()->json(
            $this->listTailorsAction->execute()
        );
    }
}
