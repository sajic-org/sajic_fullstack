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
        // Verifica se a tabela pivot existe 
        if (Schema::hasTable('lecture_speaker')) {
            // Primeiro, migrar dados existentes para a tabela pivot
            $lectures = \DB::table('lectures')
                ->whereNotNull('speaker_id')
                ->get(['id', 'speaker_id', 'created_at', 'updated_at']);

            foreach ($lectures as $lecture) {
                \DB::table('lecture_speaker')->insertOrIgnore([
                    'lecture_id' => $lecture->id,
                    'speaker_id' => $lecture->speaker_id,
                    'created_at' => $lecture->created_at,
                    'updated_at' => $lecture->updated_at,
                ]);
            }
        }

        // Depois tornar speaker_id nullable
        Schema::table('lectures', function (Blueprint $table) {
            $table->foreignId('speaker_id')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('lectures', function (Blueprint $table) {
            // Restaurar para NOT NULL (mas isso pode falhar se houver palestras sem palestrante)
            $table->foreignId('speaker_id')->nullable(false)->change();
        });
    }
};
