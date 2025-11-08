<?php

namespace App\Models;

use Backpack\CRUD\app\Models\Traits\CrudTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperLectureType
 */
class LectureType extends Model
{
    use CrudTrait;
    use HasFactory;

    protected $fillable=['title'];
}
