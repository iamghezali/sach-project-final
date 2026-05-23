<?php

namespace App\Features\CustomOrder\ClothingOrder\Data\Tailor\Response;

use Spatie\LaravelData\Data;

class TailorStatsData extends Data
{
    public function __construct(
        public readonly int $in_queue,
        public readonly int $completed_count,
        public readonly string $potential_earnings,
    ) {}
}
