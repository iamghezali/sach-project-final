<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'user_id',
    'full_name',
    'phone',
    'address_line_1',
    'address_line_2',
    'willaya',
    'postal_code',
    'country',
])]
class Address extends Model
{
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
