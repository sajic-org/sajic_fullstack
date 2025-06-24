<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('lecture_user', function (Blueprint $table) {
            $table->boolean('showed_up')->default(false);
        });
    }

    public function down(): void
    {
        Schema::table('lecture_user_pivot', function (Blueprint $table) {
            //
        });
    }
};
