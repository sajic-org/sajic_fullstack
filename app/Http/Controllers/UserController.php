<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function lectures()
    {
        return Inertia::render('my-lectures');
    }
    public function attend_lecture()
    {
        return 'TODO';

    }
}
