<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Speaker extends Model
{
    protected $fillable = ['name', 'description', 'image'];

    public function lectures()
    {
        $this->hasMany(Lecture::class, 'speaker_id', 'id');
    }
}
