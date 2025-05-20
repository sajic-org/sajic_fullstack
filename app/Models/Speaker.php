<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @mixin IdeHelperSpeaker
 */
class Speaker extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'image'];

    public function lectures(): HasMany
    {
        return $this->hasMany(Lecture::class);
    }
}
