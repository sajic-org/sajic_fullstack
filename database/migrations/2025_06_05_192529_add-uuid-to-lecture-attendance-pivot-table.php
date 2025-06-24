<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('lecture_attendances', function (Blueprint $table) {
            $table->uuid('id')->primary();
        });
    }

    public function down(): void
    {
        Schema::table('lecture_attendances', function (Blueprint $table) {
            $table->dropPrimary('id');
        });
    }
};
