<?php

namespace App\Features\Catalog\Attribute\Controllers\Dashboard;

use App\Features\Catalog\Attribute\Actions\Dashboard\CreateAttributeValueAction;
use App\Features\Catalog\Attribute\Actions\Dashboard\RemoveAttributeValueAction;
use App\Features\Catalog\Attribute\Actions\Dashboard\UpdateAttributeValueAction;
use App\Features\Catalog\Attribute\Data\Dashboard\Request\StoreAttributeValueRequestData;
use App\Features\Catalog\Attribute\Data\Dashboard\Request\UpdateAttributeValueRequestData;
use App\Features\Catalog\Attribute\Data\Dashboard\Response\AttributeValueData;
use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class AttributeValueController extends Controller
{
    public function __construct(
        private readonly CreateAttributeValueAction $createAttributeValueAction,
        private readonly UpdateAttributeValueAction $updateAttributeValueAction,
        private readonly RemoveAttributeValueAction $removeAttributeValueAction,
    ) {}

    public function store(StoreAttributeValueRequestData $data, string $attributeID)
    {
        try {

            $attributeValue = $this->createAttributeValueAction
                ->execute($data, $attributeID);

            return response()->json([
                'data' => AttributeValueData::from($attributeValue),
            ], 201);

        } catch (ModelNotFoundException $e) {

            return response()->json([
                'message' => "Attribute ID {$attributeID} doesn't Exist.",
            ], 404);

        }
    }

    public function update(UpdateAttributeValueRequestData $data, string $attributeID, string $valueID)
    {
        try {

            $attributeValue = $this->updateAttributeValueAction
                ->execute($data, $attributeID, $valueID);

            return AttributeValueData::from($attributeValue);

        } catch (ModelNotFoundException $e) {

            return response()->json([
                'message' => "No Attribute Value ID {$valueID} found for Attribute ID {$attributeID}.",
            ], 404);

        }
    }

    public function destroy(string $attributeID, string $valueID)
    {
        try {

            $this->removeAttributeValueAction->execute($attributeID, $valueID);

            return response()->noContent();

        } catch (ModelNotFoundException $e) {

            return response()->json([
                'message' => "No Attribute Value ID {$valueID} found for Attribute ID {$attributeID}.",
            ], 404);

        }
    }
}
