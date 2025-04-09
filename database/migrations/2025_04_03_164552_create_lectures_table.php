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
        Schema::create('lectures', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->enum('type', ['Tecnologia', 'Gestão e Mercado']);
            $table->dateTime('time');
            $table->foreignId('speaker_id')->constrained()->cascadeOnDelete();
            $table->tinyText('room_number');
            $table->foreign('room_number')->references('number')->on('rooms');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lectures');
    }
};
