<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Room extends Model
{
    protected $fillable = [
        'number',
        'capacity'
    ];

    public function lectures(): HasMany
    {
        return $this->hasMany(Lecture::class);
    }
}
