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
        Schema::table('lectures', function (Blueprint $table) {
            $table->dropColumn('date');
            $table->dropColumn('starts');
            $table->dropColumn('ends');

            $table->string('date', 5);
            $table->string('starts', 5);
            $table->string('ends', 5);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('lectures', function (Blueprint $table) {
            $table->dropColumn('date');
            $table->dropColumn('starts');
            $table->dropColumn('ends');

            $table->date('date');
            $table->time('starts');
            $table->time('ends');
        });
    }
};
