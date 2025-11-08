<?php

namespace App\Models;

use Backpack\CRUD\app\Models\Traits\CrudTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @mixin IdeHelperRoom
 */
class Room extends Model
{
    use CrudTrait;
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
