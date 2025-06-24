<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::rename('lecture_user', 'lecture_attendances');
    }

    public function down(): void
    {
        Schema::rename('lecture_attendances', 'lecture_user');
    }
};
