<?php

namespace App\Features\Catalog\Attribute\Controllers\Dashboard;

use App\Features\Catalog\Attribute\Actions\Dashboard\CreateAttributeAction;
use App\Features\Catalog\Attribute\Actions\Dashboard\ListAttributesAction;
use App\Features\Catalog\Attribute\Actions\Dashboard\RemoveAttributeAction;
use App\Features\Catalog\Attribute\Actions\Dashboard\ShowAttributeAction;
use App\Features\Catalog\Attribute\Actions\Dashboard\UpdateAttributeAction;
use App\Features\Catalog\Attribute\Data\Dashboard\Request\StoreAttributeRequestData;
use App\Features\Catalog\Attribute\Data\Dashboard\Request\UpdateAttributeRequestData;
use App\Features\Catalog\Attribute\Data\Dashboard\Response\AttributeData;
use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Spatie\LaravelData\DataCollection;

class AttributeController extends Controller
{
    public function __construct(
        private readonly ListAttributesAction $listAttributesAction,
        private readonly CreateAttributeAction $createAttributeAction,
        private readonly ShowAttributeAction $showAttributeAction,
        private readonly UpdateAttributeAction $updateAttributeAction,
        private readonly RemoveAttributeAction $removeAttributeAction,
    ) {}

    public function index()
    {
        $attributes = $this->listAttributesAction->execute();

        return response()->json([
            'data' => AttributeData::collect($attributes, DataCollection::class),
        ]);
    }

    public function store(StoreAttributeRequestData $data)
    {
        $attribute = $this->createAttributeAction->execute($data);

        return response()->json([
            'data' => AttributeData::fromModel($attribute),
        ], 201);
    }

    public function show(string $attributeID)
    {
        try {

            $attribute = $this->showAttributeAction->execute($attributeID);

            return response()->json([
                'data' => AttributeData::fromModel($attribute)->include('values'),
            ]);

        } catch (ModelNotFoundException $e) {

            return response()->json([
                'message' => "Attribute with ID {$attributeID} not found.",
            ], 404);

        }
    }

    public function update(UpdateAttributeRequestData $data, string $attributeID)
    {
        try {

            $attribute = $this->updateAttributeAction->execute($data, $attributeID);

            return response()->json([
                'data' => AttributeData::fromModel($attribute),
            ]);

        } catch (ModelNotFoundException $e) {

            return response()->json([
                'message' => "Attribute with ID {$attributeID} not found.",
            ], 404);

        }
    }

    public function destroy(string $attributeID)
    {
        try {

            $this->removeAttributeAction->execute($attributeID);

            return response()->noContent();

        } catch (ModelNotFoundException $e) {

            return response()->json([
                'message' => "Attribute with ID {$attributeID} not found.",
            ], 404);

        }
    }
}
