<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @mixin IdeHelperRoom
 */
class Room extends Model
{
    public $incrementing = false;

    protected $fillable = [
        'number',
        'capacity',
        'building'
    ];

    protected $keyType = 'string';

    protected $primaryKey = 'number';

    public function lectures(): HasMany
    {
        return $this->hasMany(Lecture::class);
    }
}
