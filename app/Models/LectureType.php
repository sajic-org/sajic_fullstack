<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperLectureType
 */
class LectureType extends Model
{
    use HasFactory;

    protected $fillable=['title'];
}
