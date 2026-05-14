<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\URL;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class MediaController extends Controller
{
    public function show(Request $request, string $uuid)
    {
        try {
            /** @var Media $media */
            $media = Media::where('uuid', $uuid)->firstOrFail();

            if ($request->hasValidSignature()) {
                abort_if(auth()->id() !== (int) $request->query('uid'), 403);

                return response()->file($media->getPath());
            }

            $owner = $media->model;
            $this->authorize('viewMedia', $owner);

            return response()->file($media->getPath());

        } catch (ModelNotFoundException $e) {
            Log::warning("Media not found for UUID: {$uuid}");

            return response()->json(['error' => 'Media not found'], 404);
        }
    }

    public function signedUrl(Request $request, string $uuid)
    {
        try {
            /** @var Media $media */
            $media = Media::where('uuid', $uuid)->firstOrFail();

            $this->authorize('viewMedia', $media->model);

            $url = URL::temporarySignedRoute(
                'media.show',
                now()->addMinutes(1),
                ['uuid' => $uuid, 'uid' => auth()->id()]
            );

            return response()->json(['url' => $url]);

        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Media not found'], 404);
        }
    }
}
