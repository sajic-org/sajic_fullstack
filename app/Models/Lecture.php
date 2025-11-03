<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * @mixin IdeHelperLecture
 */
class Lecture extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'date',
        'starts',
        'ends',
        'is_active',
        'type_id',
        'speaker_id',
        'room_number',
        'is_open_for_enrollment',
    ];

    public function type(): BelongsTo {
        return $this->belongsTo(LectureType::class);
    }

    public function speaker(): BelongsTo
    {
        return $this->belongsTo(Speaker::class);
    }

    public function speakers(): BelongsToMany
    {
        return $this->belongsToMany(Speaker::class, 'lecture_speaker');
    }

    public function room(): BelongsTo
    {
        return $this->belongsTo(Room::class, 'room_number', 'number');
    }

    public function attendants(): BelongsToMany
    {
        return $this->belongsToMany(User::class, LectureAttendance::class)
            ->as('lecture_attendances')
            ->withPivot('showed_up');
    }
}
