<?php

namespace App\Features\CustomOrder\ClothingOrder\Actions\Tailor;

use App\Features\CustomOrder\ClothingOrder\Data\Tailor\Response\TailorStatsData;
use App\Features\CustomOrder\ClothingOrder\Enums\ClothingOrderItemStatus;
use App\Models\ClothingOrderItem;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class GetTailorStatsAction
{
    public function execute(User $tailor): TailorStatsData
    {
        $stats = ClothingOrderItem::query()
            ->where('tailor_id', $tailor->id)
            ->select([
                'status',
                DB::raw('count(*) as count'),
                DB::raw('SUM(offer_price * quantity) as total_value'),
            ])
            ->whereIn('status', [
                ClothingOrderItemStatus::InProgress,
                ClothingOrderItemStatus::Completed,
            ])
            ->groupBy('status')
            ->get()
            ->keyBy('status');

        $inProgress = $stats->get(ClothingOrderItemStatus::InProgress->value);
        $completed = $stats->get(ClothingOrderItemStatus::Completed->value);

        // Calculate 80% of completed items total value
        $earnings = ($completed?->total_value ?? 0) * 0.8;

        return new TailorStatsData(
            in_queue: $inProgress?->count ?? 0,
            completed_count: $completed?->count ?? 0,
            potential_earnings: number_format((float) $earnings, 2, '.', ''),
        );
    }
}
