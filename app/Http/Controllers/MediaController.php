<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class MediaController extends Controller
{
    public function show(Request $request, string $uuid)
    {
        try {
            /** @var Media $media */
            $media = Media::where('uuid', $uuid)->firstOrFail();

            $owner = $media->model;

            $this->authorize('viewMedia', $owner);

            return response()->file($media->getPath());

        } catch (ModelNotFoundException $e) {
            Log::warning("Media not found for UUID: {$uuid}");

            return response()->json(['error' => 'Media not found'], 404);
        }
    }
}
