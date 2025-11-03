<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::transaction(function () {
            DB::statement("
                ALTER TABLE users
                DROP CONSTRAINT IF EXISTS users_course_check
                ");

            DB::statement("
                ALTER TABLE users
                ADD CONSTRAINT users_course_check
                CHECK (course IN ('ADS', 'REDES', 'MKT', 'PG', 'PMM', 'OUTRO'))
                ");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::transaction(function () {
            DB::statement("
                ALTER TABLE users
                DROP CONSTRAINT IF EXISTS users_course_check
                ");

            DB::statement("
                ALTER TABLE users
                ADD CONSTRAINT users_course_check
                CHECK (course IN ('ADS', 'REDES', 'MKT', 'PG', 'OUTRO'))
                ");
        });
    }
};
