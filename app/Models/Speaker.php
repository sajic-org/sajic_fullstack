<?php

namespace App\Models;

use Backpack\CRUD\app\Models\Traits\CrudTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @mixin IdeHelperSpeaker
 */
class Speaker extends Model
{
    use CrudTrait;
    use HasFactory;

    protected $fillable = ['name', 'description', 'image'];

    public function lectures(): BelongsToMany
    {
        return $this->belongsToMany(Lecture::class, 'lecture_speaker');
    }


    public function lecturesLegacy(): HasMany
    {
        return $this->hasMany(Lecture::class);
    }
}
