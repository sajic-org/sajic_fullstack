<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('lectures', function (Blueprint $table) {
            $table->dropColumn('time');
            $table->date('date');
            $table->time('starts');
            $table->time('ends');
        });
    }

    public function down(): void
    {
        Schema::table('lectures', function (Blueprint $table) {
            $table->string('time');
            $table->dropColumn('date');
            $table->dropColumn('starts');
            $table->dropColumn('ends');
        });
    }
};
