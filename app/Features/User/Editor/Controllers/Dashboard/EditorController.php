<?php

namespace App\Features\User\Editor\Controllers\Dashboard;

use App\Features\User\Editor\Actions\Dashboard\ListEditorsAction;
use App\Features\User\Editor\Actions\Dashboard\RegisterEditorAction;
use App\Features\User\Editor\Data\Dashboard\Request\RegisterEditorRequestData;
use App\Features\User\Editor\Data\Dashboard\Response\EditorData;
use App\Http\Controllers\Controller;
use Illuminate\Validation\ValidationException;

class EditorController extends Controller
{
    public function __construct(
        private readonly RegisterEditorAction $registerEditorAction,
        private readonly ListEditorsAction $listEditorsAction,
    ) {}

    public function register(RegisterEditorRequestData $data)
    {
        try {

            $editor = $this->registerEditorAction->execute($data);

            return response()->json([
                'message' => 'User added as an Editor successfully.',
                'data' => [
                    'user' => EditorData::from($editor)->include('role'),
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
            $this->listEditorsAction->execute()
        );
    }
}
