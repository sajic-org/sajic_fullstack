<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperLectureAttendance
 */
class LectureAttendance extends Model
{
    use HasUuids;
    public $timestamps = false;

    protected $fillable = ['showed_up', 'lecture_id', 'user_id'];
}
