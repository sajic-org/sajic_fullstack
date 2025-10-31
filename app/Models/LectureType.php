<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperLectureType
 */
class LectureType extends Model
{
    protected $fillable=['title'];
}
