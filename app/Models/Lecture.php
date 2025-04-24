<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Lecture extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'type',
        'date',
        'starts',
        'ends',
        'is_active',
        'speaker_id',
        'room_number',
    ];

    public function speaker(): BelongsTo
    {
        return $this->belongsTo(Speaker::class);
    }

    public function room(): BelongsTo
    {
        return $this->belongsTo(Room::class, 'room_number', 'number');
    }

    public function attendants(): BelongsToMany
    {
        return $this->belongsToMany(User::class)
            ->as("showed_up")
            ->withPivot('showed_up');
    }
}
