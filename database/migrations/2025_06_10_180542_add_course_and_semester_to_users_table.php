<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->enum('course', ['ADS', 'REDES', 'MKT', 'PG', 'OUTRO'])->nullable();
            $table->enum('semester', ['1', '2', '3', '4', '5', '6', '7', '8', '8+'])->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['course', 'semester']);
        });
    }
};
